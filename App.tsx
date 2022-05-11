import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Base } from './styles/index.js'; 
import FlashMessage from 'react-native-flash-message';
import Home from './components/Home';


const Tab = createBottomTabNavigator();
const routeIcons = {
  "Hem": "home",
  "Stationer":"transfer-within-a-station",
  "Trafikinfo":"train",
};

export default function App() {
  console.log("------| app.tsx |------");
  return (
    <SafeAreaView style={Base.container}>
      <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTitleStyle: {
          color: 'white'
        },
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          height: 60,
          borderTopWidth: 0,
          paddingHorizontal: 5,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: -5,
          paddingBottom: 4,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = routeIcons[route.name] || "warning";

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
      })}
    >
          <Tab.Screen name="Hem" component={Home}/>
          <Tab.Screen name="Stationer" component={Home}/>
          <Tab.Screen name="Trafikinfo" component={Home}/>
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
      <FlashMessage position="top"/>
    </SafeAreaView>
  );
}