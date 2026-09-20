import MapView, { Circle, Marker } from 'react-native-maps';

//export const GAME_CENTER = {latitude: 37.231787, longitude: -80.426823};
import { PLAY_AREA } from '../boundary';
 

export default function GameMap({ safeZones = [], deathZones = [], playArea, otherPlayers = [], style })
{
    return (
        <MapView 
            style={[{ flex: 1 }, style]}
            initialRegion={{ ...PLAY_AREA.center, latitudeDelta: 0.004, longitudeDelta: 0.004 }}
            showsUserLocation
        >
            {playArea && (
                <Circle center={playArea.center} radius={playArea.radius} strokeWidth={3} strokeColor="#E87722" />

            )}

            {safeZones.map((z) => {
  const dim = z.flashing && z.blink; // flashing = protection almost over
  return (
    <Circle
      key={z.id}
      center={z.center}
      radius={z.radius ?? 15}
      strokeColor={dim ? "rgba(100,255,112,0.2)" : "#64FF70"}
      lineDashPattern={[6, 6]}
      fillColor={dim ? "rgba(100,255,112,0.03)" : "rgba(100,255,112,0.15)"}
    />
  );
})}
            

            {deathZones.map((z) => (
                <Circle
                    key={z.id}
                    center={z.center}
                    radius={z.radius ?? 20}
                    strokeColor="#FF3B3B"
                    fillColor="rgba(255,59,59,0.2)"
                />
            ))}


            {otherPlayers.map((p) => (
                <Marker
                    key={p.id}
                    coordinate={p.coordinate}
                    title={p.name}
                />
            ))}
        </MapView>
    );
}
    