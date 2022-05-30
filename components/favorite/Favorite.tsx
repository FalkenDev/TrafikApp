import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StationsList from './StationsList';
import DetailsStation from './DetailsStation';

const Stack = createNativeStackNavigator();

export default function TrafficInfo(props) {
    return (
        <Stack.Navigator initialRouteName="Stationer">
            <Stack.Screen name="Stationer" options={{headerStyle: {backgroundColor: '#1a1a1a'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold'}}}>
                {(screenProps) => <StationsList {...screenProps}
                favorite={props.favorite} setFavorite={props.setFavorite} setIsLoggedIn={props.setIsLoggedIn}/>}
            </Stack.Screen>
            <Stack.Screen name="Details" options={{headerStyle: {backgroundColor: '#1a1a1a'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold'}}}>
                {(screenProps) => <DetailsStation {...screenProps}
                trafficInfo={props.trafficInfo} setTrafficInfo={props.setTrafficInfo}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
}