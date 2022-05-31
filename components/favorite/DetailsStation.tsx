import { useEffect } from 'react';
import { ScrollView, Text, Button, StyleSheet, Alert } from "react-native";
import { DataTable } from 'react-native-paper';
import traffic from "../../models/traffic"
import userData from '../../models/userData';
import { Typography } from '../../styles/index.js';
import { showMessage } from 'react-native-flash-message';

export default function DetailsStation({ route, navigation, trafficInfo, setTrafficInfo}) {
    console.log("------| Traffic delays list |------")
    const { item } = route.params;
    let haveTrains = true;
    let trainNumber = [];
    let isFavorite = false;

    // Reload traffic info
    async function reloadTrafficInfo() {
        console.log("Loading");
        setTrafficInfo(await traffic.getTrafficInfo());
    }

    // addListener focus that triggers reloadTrafficInfo
    useEffect(() => {
        console.log("useEffect")
        navigation.addListener('focus', () => reloadTrafficInfo());
    }, []);

    // Add userData, pass in the station name in createData function.
    async function addFavorite() {
        await userData.createData(item.AdvertisedLocationName)
        navigation.navigate("Stationer", { reload: true });
    }

    // Delete userData, pass in the id of the object in deleteData function.
    async function deleteFavorite() {
        await userData.deleteData(item.id)
        navigation.navigate("Stationer", { reload: true });
    }

    function showWarning(location) {
        console.log(location);
        showMessage({
            message: "Ingen tåginformation i " + location,
            description: "För nuvarande finns det inga tåg förseningar i " + location,
            type: "warning"
        });
    }


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

    // Map all the trafficInfo, filter by if same name by AdvertisedLocationName or artefact.
    const listOfTrains = trafficInfo
        .filter(train => train.AdvertisedLocationName === item.AdvertisedLocationName || train.AdvertisedLocationName === item.artefact)
        .map((train, index) => {
            if(trainNumber.includes(train.AdvertisedTrainIdent)) {
                return;
            }
            trainNumber.push(train.AdvertisedTrainIdent);
            console.log(train);
            let timeArray1 = train.AdvertisedTimeAtLocation.replace(/[^0-9\s-:+]/gm, " ")
            timeArray1 = timeArray1.split(" ");

            let timeArray2 = train.EstimatedTimeAtLocation.replace(/[^0-9\s-:+]/gm, " ")
            timeArray2 = timeArray2.split(" ");
            return (
                <DataTable.Row key={index}>
                    <DataTable.Cell>
                        <Text style={{ color: "#fff" }}>{train.AdvertisedTrainIdent}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell>
                        <Text style={{ color: "#fff" }}>{timeArray1[1]}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell>
                        <Text style={{ color: "#fff" }}>{timeArray2[1]}</Text>
                    </DataTable.Cell>
                </DataTable.Row>
            );
        });

        listOfTrains.sort( sortAlpha )

        if(item.AdvertisedLocationName === undefined) {
            isFavorite = true;
        }

        if(listOfTrains.length === 0) {
            haveTrains = false;
            {isFavorite
                ?showWarning(item.artefact)
                :showWarning(item.AdvertisedLocationName)
            }
        }

    return (
        <ScrollView style={styles.button}>
            {isFavorite
                ?<Text style={Typography.label}>{item.artefact}</Text>
                :<Text style={Typography.label}>{item.AdvertisedLocationName}</Text>
            }
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>
                        <Text style={{ color: "#fff" }}>Tåg</Text>
                    </DataTable.Title>
                    <DataTable.Title>
                        <Text style={{ color: "#fff" }}>Skulle komma</Text>
                    </DataTable.Title>
                    <DataTable.Title>
                        <Text style={{ color: "#fff" }}>Försenad till</Text>
                    </DataTable.Title>
                </DataTable.Header>
                {listOfTrains}
            </DataTable>
            { haveTrains
            ?<Text></Text>
            :<Text style={Typography.warning}>Det finns ingen tåg information just nu.</Text>
            }
            {isFavorite
                ?<Button
                    title="Ta bort stationen som favorit"
                    color='#FF0000'
                    onPress={deleteFavorite}
                />
                :<Button
                    title="Lägg till stationen i favoriter"
                    color='#00FF00'
                    onPress={addFavorite}
                />
            }
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: '#1a1a1a',
    },
  });