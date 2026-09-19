import {View, Button} from 'react-native';
import {useKeepAwake} from 'expo-keep-awake';
import GameMap, {DRILLFIELD} from '../components/GameMap';
import {useLocation} from '../hooks/useLocation';

const MOCK_Zones = [
    {id: 'z1', center: {latitude: DRILLFIELD.latitude + 0.0004, longitude: DRILLFIELD.longitude }, radius: 30 }, 
    {id: 'z2', center: {latitude: DRILLFIELD.latitude - 0.0004, longitude: DRILLFIELD.longitude + 0.0005}, radius: 30 },
];

export default function MapScreen({navigation}) 
{
    useKeepAwake();
    const {location} = useLocation();

    return (
        <View style ={{ flex: 1, backgroundColor: '#292929'}}> 
            <GameMap safeZones={MOCK_Zones} />
            <Button title="Next (temp)" onPress={() => navigation.navigate('Infected')} />

        </View>
    );
}

