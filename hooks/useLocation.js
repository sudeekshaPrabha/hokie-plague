import { useEffects, useState} from 'react';
import * as Location from 'expo-location'; 

// Any screen can call useLocation() to get the phone's current position
export function useLocation() 
{
    //latest GPS position. 
    const[location, setLocation] = useState(null);
    //holds error message if something goes wrong
    const [error, setError] = useState(null);

    //useEffect with [] at the end runs once 
    useEffect(() => {
        //will hold GPS 
        let sub;
    (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status != 'granted') 
    {
        setError('Location permission denied');
        return;
    }

    //Start watching the GPS. The callback below runs everytime location updates
    sub = await Location.watchPositionAsync(
        {
            //more precise
            accuracy: Location.Accuracy.BestForNavigation,
            distanceInterval: 1, 
        }, 

        (pos) => 
            setLocation({
                latitude: pos.coords.latitude, 
                longitude: pos.coords.longitude, 
                accuracy: pos.coords.accuracy, 
            })
        );
    })();
    
    return () => sub && sub.remove();
}, []);

    return { location, error };

}