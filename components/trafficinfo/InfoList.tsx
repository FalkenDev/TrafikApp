import { ScrollView, Text, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Base } from '../../styles/index';
import { showMessage } from 'react-native-flash-message';
import traffic from '../../models/traffic'
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

export default function InfoList({ route, navigation }) {
    console.log("---| Details Trafikinfo |---");
    const { item } = route.params;
    const { station } = route.params;
    const [locationMarker, setLocationMarker] = useState(null);
    const [stationMarker, setstationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    // Time from AdvertisedTimeAtLocation in array
    let timeArray1 = item.AdvertisedTimeAtLocation.replace(/[^0-9\s-:+]/gm, " ")
    timeArray1 = timeArray1.split(" ");

    // Time from EstimatedTimeAtLocation in array
    let timeArray2 = item.EstimatedTimeAtLocation.replace(/[^0-9\s-:+]/gm, " ")
    timeArray2 = timeArray2.split(" ");

    let coordinates = traffic.getCoords(item.Geometry.WGS84)
    var result = minsToStr( strToMins(timeArray2[1]) - strToMins(timeArray1[1]) );

    function showWarning() {
        showMessage({
            message: "Försenad tåg från " + item.AdvertisedLocationName,
            description: "Tågnr " + item.AdvertisedTrainIdent + " Är försenat från " + timeArray1[1].slice(0, -3) + " till " + timeArray2[1].slice(0, -3),
            type: "warning"
        });
    }

    function strToMins(t) {
        var s = t.split(":");
        return Number(s[0]) * 60 + Number(s[1]);
    }
      
    function minsToStr(t) {
        if(Math.trunc(t / 60) === 0)
        {
            return (t % 60) +' min ';
        }
        return Math.trunc(t / 60)+' tim och '+('00' + t % 60).slice(-2) +' min ';
    }

    useEffect(() => {
        (async () => {
            const {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMessage("Permission to access location was denied");
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});
            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="green"
                />);

            setstationMarker (<Marker 
                coordinate={{
                    latitude: parseFloat(coordinates[1]),
                    longitude: parseFloat(coordinates[0])
                }}
                title={item.AdvertisedLocationName}
                pinColor="red"
                >
                <Callout tooltip>
                    <View style={Base.callOutView}>
                        <Text style={Base.callOutText}>Station: {item.AdvertisedLocationName}</Text>
                        <Text style={Base.callOutText}>Tågnr: {item.AdvertisedTrainIdent}</Text>
                        <Text style={Base.callOutText}>Skulle komma: {timeArray1[1].slice(0, -3)}</Text>
                        <Text style={Base.callOutText}>Försenat till: {timeArray2[1].slice(0, -3)}</Text>
                        <Text style={Base.callOutText}>Försenat: {result}</Text>
                    </View>
                </Callout>
            </Marker>
            );
        })();
    }, []);

    return (
        <ScrollView style={Base.details}>
            <Text style={styles.textInfo}>Avgång: {item.AdvertisedLocationName} - {station}</Text>
            <Text style={styles.textInfo}>Datum: {timeArray1[0]}</Text>
            <Text style={styles.textInfo}>Tåg: {item.AdvertisedTrainIdent}</Text>
            {item.Canceled
            ?<Text style={styles.textInfo}>Inställt: <Text style={{ color: "red" }}>Tåget är Inställt</Text> </Text>
            :<Text style={styles.textInfo}>Inställt: Ej Inställt</Text>
            }
            <Text style={styles.textInfo}>
                        Tid: <Text style={{ textDecorationLine: 'line-through', color: "red" }}> {timeArray1[1].slice(0, -3)} </Text>  
                        <Text>  </Text>
                        {timeArray2[1].slice(0, -3)}
            </Text>
            <Text style={styles.textInfo}>Försenat: <Text style={{ color: "red" }}> {result}</Text> </Text>
            <View style={styles.container}>
            <MapView
                style={styles.map}
                    initialRegion={{
                        latitude: parseFloat(coordinates[1]),
                        longitude: parseFloat(coordinates[0]),
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}>
                    {locationMarker}
                    {stationMarker}
                </MapView>
            </View>
            {showWarning()}
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 20,
    },
    map: {
        width: "90%",
        height: 400,
    },
    textInfo: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        marginLeft: 20,
        marginTop: 10,
    },
});