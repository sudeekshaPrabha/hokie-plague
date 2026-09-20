import { useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';

import GameMap from '../components/GameMap';
import InfoSheet from '../components/InfoSheet';
import SideNav from '../components/SideNav';
import { useLocation } from '../hooks/useLocation';
import { listenPlayers, listenZones, updateLocation, eliminate } from '../game';
import { PLAY_AREA, fitZone, fuzzPoint } from '../boundary';
import { nearestTarget } from '../person3/roundRules';
import { distanceMeters } from '../person3/geo';
import config from '../person3/config';

// 100000 = everyone visible (indoor testing). Set to 15 for real games.
const VISIBLE_METERS = 100000;

export default function MapScreen({ gameCode, playerId, meta = {}, onNavigate, onLeave }) {
  useKeepAwake();
  const { location } = useLocation();
  const [players, setPlayers] = useState([]);
  const [zones, setZones] = useState([]);
  const [tick, setTick] = useState(0);

  useEffect(() => listenPlayers(gameCode, setPlayers), [gameCode]);
  useEffect(() => listenZones(gameCode, setZones), [gameCode]);

  // re-render twice a second: drives timers, zone expiry, and flashing
  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 500);
    return () => clearInterval(t);
  }, []);

  // send my position every 3 seconds (ref avoids resetting the timer on each GPS tick)
  const locRef = useRef(null);
  locRef.current = location;
  useEffect(() => {
    if (!playerId) return;
    const t = setInterval(() => {
      const l = locRef.current;
      if (l) updateLocation(gameCode, playerId, l.latitude, l.longitude);
    }, 3000);
    return () => clearInterval(t);
  }, [gameCode, playerId]);

  const now = Date.now();
  const blink = tick % 2 === 0;
  const timeLeft = Math.max(0, Math.round(((meta.endsAt || 0) - now) / 1000));
  const huntLeft = Math.max(0, Math.round(((meta.huntStartsAt || 0) - now) / 1000));

  // zones (both types are visible to everyone)
  const active = zones.filter((z) => z.expiresAt > now);
  const safeRaw = active.filter((z) => z.type === 'safe');
  const safeZones = safeRaw.map((z) => ({
    id: z.id,
    center: { latitude: z.lat, longitude: z.lng },
    radius: z.radius,
    flashing: z.expiresAt - now < config.SAFE_ZONE_WARNING_SECONDS * 1000,
    blink,
  }));
  const deathZones = active
    .filter((z) => z.type === 'death')
    .map((z) => ({
      id: z.id,
      center: { latitude: z.lat, longitude: z.lng },
      radius: z.radius,
    }));

  const meP = players.find((p) => p.id === playerId);
  const me = location ? { lat: location.latitude, lng: location.longitude } : null;
  const inSafe = (p) => safeRaw.some((z) => distanceMeters(p, z) <= z.radius);

  // dots: opposite team only (spectators see everyone); survivors in a safe zone stay hidden
  const others = players
    .filter((p) => p.id !== playerId && p.lat != null && !p.eliminated)
    .filter((p) => meP?.eliminated || (meP && p.team !== meP.team))
    .filter((p) => !(meP?.team === 'infected' && p.team === 'noninfected' && inSafe(p)))
    .filter((p) => me && distanceMeters(me, p) <= VISIBLE_METERS)
    .map((p) => ({
      id: p.id,
      name: p.name,
      coordinate: { latitude: p.lat, longitude: p.lng },
    }));

  // who the plaguer can infect right now (nobody during the spread-out phase)
  const hunting = meta.status === 'playing' && huntLeft === 0;
  const target =
    hunting && meP && me
      ? nearestTarget({ ...meP, ...me, updatedAt: Date.now() }, players, safeRaw)
      : null;

  // "Nearest survivor: X m" hint for plaguers (ignores survivors sheltering in safe zones)
  let nearestM = null;
  if (meP?.team === 'infected' && !meP.eliminated && me) {
    const ds = players
      .filter((p) => p.team === 'noninfected' && !p.eliminated && p.lat != null && !inSafe(p))
      .map((p) => distanceMeters(me, p));
    if (ds.length) nearestM = Math.round(Math.min(...ds));
  }

  const infect = () => {
    // blur the death spot so only the general area is revealed
    const spot = fuzzPoint(
      { latitude: target.lat, longitude: target.lng },
      config.DEATH_ZONE_FUZZ_METERS
    );
    const z = fitZone(spot, config.DEATH_ZONE_RADIUS_METERS);
    eliminate(gameCode, target.id, z.center.latitude, z.center.longitude, z.radius, playerId);
  };

  const survivors = players.filter((p) => p.team === 'noninfected');
  const alive = survivors.filter((p) => !p.eliminated).length;
  const sheetRole = meP?.eliminated ? 'spectator' : meP?.team;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#303030' }}>
      {/* header, same as the other screens */}
      <View
        style={{
          height: 85,
          backgroundColor: '#861F41',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: 3,
          borderBottomColor: '#65152F',
          zIndex: 10,
        }}
      >
        <Text style={{ color: '#E87722', fontSize: 34, fontWeight: '900' }}>Hokie Plague</Text>
      </View>

      <GameMap
        playArea={PLAY_AREA}
        safeZones={safeZones}
        deathZones={deathZones}
        otherPlayers={others}
      />

      <SideNav onNavigate={onNavigate} onLeave={onLeave} />

      <InfoSheet
        role={sheetRole}
        timeLeft={timeLeft}
        huntLeft={huntLeft}
        alive={alive}
        total={survivors.length}
        nearestM={nearestM}
        target={target}
        onInfect={infect}
      />
    </SafeAreaView>
  );
}