import MapView, { Circle, Marker } from 'react-native-maps';

export const DRILLFIELD = {latitude: 37.2284, longitude: -80.4234}; 

export default function GameMap({ safeZones = [], playArea, otherPlayers = [], style })
{
    return (
        <MapView 
            style={[{ flex: 1 }, style]}
            initialRegion={{ ...DRILLFIELD, latitudeDelta: 0.004, longitudeDelta: 0.004 }}
            showsUserLocation
        >
            {playArea && (
                <Circle center={playArea.center} radius={playArea.radius} strokeWidth={2} strokeColor="#E87722" />

            )}

            {safeZones.map((z) => (
                <Circle
                    key={z.id}
                    center={z.center}
                    radius={z.radius ?? 30}
                    strokeColor = "#64FF70"
                    lineDashPattern={[6, 6]}
                    fillColor = "rgba(100,255,112,0.15)"
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
    