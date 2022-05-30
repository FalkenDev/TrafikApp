import { useEffect } from 'react';
import { ScrollView, Text, Button, StyleSheet } from "react-native";
import { Typography } from '../../styles/index.js';
import traffic from "../../models/traffic"

export default function OrderList({ route, navigation, trafficInfo, setTrafficInfo, finalDestination, setFinalDestination}) {
    console.log("------| Traffic delays list |------")
    let ifTrians = false;
    let trainNumber = [];

    async function reloadTrafficInfo() {
        console.log("Loading");
        setTrafficInfo(await traffic.getTrafficInfo());
        //setFinalDestination(await traffic.getFinalDestination());
        //console.log("finalDestination");
        //console.log(finalDestination);
    }

    useEffect(() => {
        console.log("useEffect")
        navigation.addListener('focus', () => reloadTrafficInfo());
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

    // Get all delay trains, filter out all the same train number
    const listOfDelays = trafficInfo
        .map((item, index) => {
            if(trainNumber.includes(item.AdvertisedTrainIdent)) {
                return;
            };
            //let finalStation = finalDestination[index].AdvertisedLocationName;
            trainNumber.push(item.AdvertisedTrainIdent);
            return(
            <Button
                color='#1a1a1a'
                title={item.AdvertisedLocationName + " Tågnr " + item.AdvertisedTrainIdent}
                key={index}
                onPress={() => {
                    navigation.navigate('Details', {
                        item: item
                    });
                }}
            />)
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
                :<Text></Text>
            }
            {listOfDelays}
            <Text></Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: 'black',
    },
  });