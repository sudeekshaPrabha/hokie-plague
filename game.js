import { ref, set, update, push, onValue } from 'firebase/database';
import { db } from './firebase';

// Join Game button: creates the player and returns their unique id
export async function joinGame(code, name) {
  const playerRef = push(ref(db, `games/${code}/players`));
  await set(playerRef, {
    name, team: 'noninfected', eliminated: false,
    lat: null, lng: null, updatedAt: Date.now(),
  });
  return playerRef.key;
}

// Send GPS position (call every ~3 seconds)
export function updateLocation(code, id, lat, lng) {
  return update(ref(db, `games/${code}/players/${id}`), { lat, lng, updatedAt: Date.now() });
}

// Live player list. Returns an unsubscribe function.
export function listenPlayers(code, cb) {
  return onValue(ref(db, `games/${code}/players`), (snap) => {
    const v = snap.val() || {};
    cb(Object.entries(v).map(([id, p]) => ({ id, ...p })));
  });
}

// Live zone list
export function listenZones(code, cb) {
  return onValue(ref(db, `games/${code}/zones`), (snap) => {
    const v = snap.val() || {};
    cb(Object.entries(v).map(([id, z]) => ({ id, ...z })));
  });
}

// Infect: mark victim eliminated and drop a red zone where they died
export function eliminate(code, victimId, lat, lng) {
  const zoneId = push(ref(db, `games/${code}/zones`)).key;
  return update(ref(db), {
    [`games/${code}/players/${victimId}/eliminated`]: true,
    [`games/${code}/zones/${zoneId}`]: {
      type: 'death', lat, lng, radius: 20, expiresAt: Date.now() + 5 * 60 * 1000,
    },
  });
}

// Host only: drop a green safe zone
export function spawnSafeZone(code, lat, lng) {
  const zoneRef = push(ref(db, `games/${code}/zones`));
  return set(zoneRef, { type: 'safe', lat, lng, radius: 30, expiresAt: Date.now() + 15 * 60 * 1000 });
}