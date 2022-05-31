import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TrafficList from './TrafficList';
import InfoList from './InfoList';

const Stack = createNativeStackNavigator();

export default function TrafficInfo(props) {
    return (
        <Stack.Navigator initialRouteName="Förseningar">
            <Stack.Screen name="Förseningar" options={{headerStyle: {backgroundColor: '#1a1a1a'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold'}}}>
                {(screenProps) => <TrafficList {...screenProps}
                trafficInfo={props.trafficInfo} setTrafficInfo={props.setTrafficInfo} /*finalDestination={props.finalDestination} setFinalDestination={props.setFinalDestination}*/ />}
            </Stack.Screen>
            <Stack.Screen name="Details" component={InfoList} options={{headerStyle: {backgroundColor: '#1a1a1a'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold'}}}/>
        </Stack.Navigator>
    );
}