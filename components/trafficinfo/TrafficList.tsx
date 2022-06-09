import { useCallback, useEffect, useState } from 'react';
import { ImageBackground, ScrollView, Text, Button, StyleSheet, Pressable, View } from "react-native";
import { Typography, Base } from '../../styles/index.js';
import traffic from "../../models/traffic"
import * as SplashScreen from 'expo-splash-screen';
import loading from '../../assets/Loading.png';
import { AntDesign } from '@expo/vector-icons'; 

export default function TrafficList({ route, navigation, trafficInfo, setTrafficInfo, finalDestination, setFinalDestination }) {
    console.log("------| Traffic delays list |------")
    let ifTrians = false;
    let trainNumber = [];
    const [loadingCenter, setLoading] = useState(true)
    const [appIsReady, setAppIsReady] = useState(false);

    async function reloadTrafficInfo() {
        try {
            console.log("Loading");
            setAppIsReady(false);
            await SplashScreen.preventAutoHideAsync();
            setTrafficInfo(await traffic.getTrafficInfo());
            setFinalDestination(await traffic.getFinalDestination(trafficInfo));
            await new Promise(resolve => setTimeout(resolve, 3000));
        } catch(e) {
            console.warn(e);
        } finally {
            setAppIsReady(true);
        }
    }

    useEffect(() => {
        console.log("useEffect")
        navigation.addListener('focus', () => reloadTrafficInfo())
    }, []);


    // Sorts alphabetically from title
    function sortAlpha( a, b ) {
        if ( a.props.title < b.props.title ){
          return -1;
        }
        if ( a.props.title > b.props.title ){
          return 1;
        }
        return 0;
      }
      let station = "";

    const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
        // This tells the splash screen to hide immediately! If we call this after
        // `setAppIsReady`, then we may see a blank screen while the app is
        // loading its initial state and rendering its first pixels. So instead,
        // we hide the splash screen once we know the root view has already
        // performed layout.
        await SplashScreen.hideAsync();
    }
    }, [appIsReady]);

    if (!appIsReady) {
        return (
            <ScrollView style={styles.button}>
                <ImageBackground source={loading} resizeMode="contain" style={Base.image}>
                </ImageBackground>
            </ScrollView>
        )
    } else {
        // Get all delay trains, filter out all the same train number
        const listOfDelays = trafficInfo
        .map((item, index) => {
            if(trainNumber.includes(item.AdvertisedTrainIdent)) {
                return;
            };
            trainNumber.push(item.AdvertisedTrainIdent);
            if(finalDestination !== undefined) {
                station = finalDestination[index].AdvertisedLocationName
            } else {
                station = "Undefined";
            }
            // Time from AdvertisedTimeAtLocation in array
            let timeArray1 = item.AdvertisedTimeAtLocation.replace(/[^0-9\s-:+]/gm, " ")
            timeArray1 = timeArray1.split(" ");

            // Time from EstimatedTimeAtLocation in array
            let timeArray2 = item.EstimatedTimeAtLocation.replace(/[^0-9\s-:+]/gm, " ")
            timeArray2 = timeArray2.split(" ");
            return(
            <Pressable style={styles.buttons} key={index} onPress={() => { navigation.navigate('Details', { item: item, station: station }); }}>
                <View style={styles.trainInfoView}>
                    <Text style={styles.text}>{item.AdvertisedLocationName + " - " + station}</Text>
                    <Text style={styles.text}>
                        Tid: <Text style={{ textDecorationLine: 'line-through', color: "red" }}> {timeArray1[1].slice(0, -3)} </Text>  
                        <Text>  </Text>
                        {timeArray2[1].slice(0, -3)}
                    </Text>
                    <Text style={styles.text}>Tåg: {item.AdvertisedTrainIdent}</Text>
                </View>
                <View style={styles.arrowLogoView}>
                    <AntDesign style={styles.arrowIcon} name="rightcircleo" size={24} color="white" />
                </View>
            </Pressable>)
        });

        // Sort the array of objects
        listOfDelays.sort( sortAlpha )

        if(listOfDelays.length === 0) {
            ifTrians = true;
        }

        return (
            <ScrollView style={styles.button}>
                {ifTrians
                    ?<Text style={Typography.warning}>Det finns inga tåg information just nu.</Text>
                    :[]
                }
                { listOfDelays }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    buttons: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 5,
        backgroundColor: 'black',
        borderColor: "white",
        borderWidth: 1,
        marginBottom: 9,
        marginTop: 9,
        marginRight: 15,
        marginLeft: 15,
        display: 'flex',
        flexDirection: "row",
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        marginLeft: -15,
    },
    button: {
      backgroundColor: 'black',
    },
    arrowIcon: {
        paddingTop: 19,
    },
    trainInfoView: {
        width: '90%',
    },
    arrowLogoView: {

    },
  });