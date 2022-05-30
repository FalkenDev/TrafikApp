import { ScrollView, Text, Button, StyleSheet} from "react-native";
import { useState, useEffect } from 'react';
import { Typography } from '../../styles/index';
import authModel from "../../models/auth";
import traffic from '../..//models/traffic';
import userData from '../../models/userData';

export default function StationsList({ route, navigation, favorite, setFavorite, setIsLoggedIn}) {
    const [stations, setStations] = useState([]);
    let listOfFavorite;

    // Reload all the stations
    async function reloadStations() {
        console.log("Loading");
        setStations(await traffic.getStations());
    }

    // Reload the userData ( Users favorite stations )
    async function reloadUserData() {
        console.log("Loading");
        setFavorite(await userData.getData());
    }

    // addListener focus that triggers reloadStations and reloadUserData
    useEffect(() => {
        console.log("useEffect")
        navigation.addListener('focus', () => reloadStations());
        navigation.addListener('focus', () => reloadUserData());
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

    // Logout the user
    async function logOut() {
        authModel.logout();
        setIsLoggedIn(false);
    }

    // If has no favorite return empty array else map in the favorite and retrun a button 
    if(favorite === undefined) {
        listOfFavorite = [];
    } else {
        listOfFavorite = favorite
        .map((item, index) => {
            return(
            <Button
                color='#1a1a1a'
                title={item.artefact + " ★"}
                key={index}
                onPress={() => {
                    navigation.navigate('Details', {
                        item: item
                    });
                }}
            />)
        });

        listOfFavorite.sort( sortAlpha )   
    }

    // Map all the stations, return a button where you can navigate to details
    const listOfStations = stations
        .map((item, index) => {
            return(
            <Button
                color='#1a1a1a'
                title={item.AdvertisedLocationName}
                key={index}
                onPress={() => {
                    navigation.navigate('Details', {
                        item: item
                    });
                }}
            />)
        });

        listOfStations.sort( sortAlpha )

    return (
        <ScrollView style={styles.button}>
            <Text style={Typography.label}>Favoriter</Text>
            {listOfFavorite}
            <Text style={Typography.label}>Alla stationer</Text>
            {listOfStations}
            <Text></Text>
            <Button
                title="Logga ut"
                onPress={async () => {
                    await logOut();
                }}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: 'black',
    },
  });