import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Register from './Register';

const Stack = createNativeStackNavigator();

export default function Auth(props) {
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Login' options={{headerStyle: {backgroundColor: '#1a1a1a'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold'}}}>
                {(screenProps) => <Login {...screenProps} setIsLoggedIn={props.setIsLoggedIn}/>}
            </Stack.Screen>
            <Stack.Screen name='Register' component={Register} options={{headerStyle: {backgroundColor: '#1a1a1a'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold'}}}/>
        </Stack.Navigator>
    );
};