import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TrafficList from './TrafficList';

const Stack = createNativeStackNavigator();

export default function Pick(props) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={TrafficList} />
        </Stack.Navigator>
    );
}