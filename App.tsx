import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Base } from './styles/index.js'; 
import { useEffect, useState } from 'react';
import FlashMessage from 'react-native-flash-message';
import Home from './components/Home';
import Favorite from './components/favorite/Favorite';
import TrafficInfo from './components/trafficinfo/Traffic';
import Map from './components/map/Map';
import traffic from './models/traffic';
import Auth from './components/auth/Auth';
import authModel from "./models/auth";

const Tab = createBottomTabNavigator();
const routeIcons = {
  "Hem": "home",
  "Stationer":"transfer-within-a-station",
  "Trafikinfo":"train",
  "Karta":"map",
  "Logga in":"login",
};

export default function App() {
  console.log("------| app.tsx |------");
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [trafficInfo, setTrafficInfo] = useState([]);
  const [favorite, setFavorite] = useState([]);
  //const [finalDestination, setFinalDestination] = useState([]);

  useEffect(() => {
    (async () => {
      console.log("Getting login");
      setIsLoggedIn(await authModel.loggedIn());
      setTrafficInfo(await traffic.getTrafficInfo());
      //setFinalDestination(await traffic.getFinalDestination());
    })();
}, []);

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
          <Tab.Screen name="Trafikinfo">
            {() => <TrafficInfo trafficInfo={trafficInfo} setTrafficInfo={setTrafficInfo} /*finalDestination={finalDestination} setFinalDestination={setFinalDestination}*//>}
          </Tab.Screen>
          <Tab.Screen name="Karta">
            {() => <Map trafficInfo={trafficInfo}/>}
          </Tab.Screen>
          {isLoggedIn
            ?<Tab.Screen name="Stationer">
              {() => <Favorite favorite={favorite} setFavorite={setFavorite} setIsLoggedIn={setIsLoggedIn} trafficInfo={trafficInfo} setTrafficInfo={setTrafficInfo}/>}
            </Tab.Screen>
            :<Tab.Screen name="Logga in">
              {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
          }
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
      <FlashMessage position="top"/>
    </SafeAreaView>
  );
}