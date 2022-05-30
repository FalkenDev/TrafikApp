import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Base } from "../../styles";

import MapView, { Callout } from 'react-native-maps';
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';

import traffic from '../../models/traffic'

import getCoordinates from "../../models/nominatim";

export default function ShipOrder({ route, trafficInfo }) {
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    let trainNumber = [];

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

    function getTimeToArray(time) {
        let timeArray = time.replace(/[^0-9\s-:+]/gm, " ")
        timeArray = timeArray.split(" ");
        return timeArray;
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
        })();
    }, []);

    const markers = trafficInfo
        .map((item, index) =>{
            let coordinates = traffic.getCoords(item.Geometry.WGS84)
            // Time from AdvertisedTimeAtLocation in array
            let timeArray1 = getTimeToArray(item.AdvertisedTimeAtLocation);

            // Time from EstimatedTimeAtLocation in array
            let timeArray2 = getTimeToArray(item.EstimatedTimeAtLocation);

            var result = minsToStr( strToMins(timeArray2[1]) - strToMins(timeArray1[1]) );
            if(trainNumber.includes(item.AdvertisedTrainIdent)) {
                return;
            }
            trainNumber.push(item.AdvertisedTrainIdent);
            return <Marker 
                        key={index} 
                        coordinate={{
                            latitude: parseFloat(coordinates[1]),
                            longitude: parseFloat(coordinates[0])
                        }}
                        title={item.AdvertisedLocationName}
                        pinColor="red"
                        >
                        <Callout tooltip>
                            <View style={Base.callOutView}>
                                <Text style={Base.callOutText}>Stad: {item.AdvertisedLocationName}</Text>
                                <Text style={Base.callOutText}>Tågnr: {item.AdvertisedTrainIdent}</Text>
                                <Text style={Base.callOutText}>Skulle komma: {timeArray1[1].slice(0, -3)}</Text>
                                <Text style={Base.callOutText}>Försenat till: {timeArray2[1].slice(0, -3)}</Text>
                                <Text style={Base.callOutText}>Försenat: {result}</Text>
                            </View>
                        </Callout>
                    </Marker>

        });

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 56.1612,
                    longitude: 15.5869,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}>
                {locationMarker}
                {markers}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});