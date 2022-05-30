import { ScrollView, Text } from "react-native";
import { Base } from '../../styles/index';
import { showMessage } from 'react-native-flash-message';

export default function InfoList({ route, navigation }) {
    console.log("---| Details Trafikinfo |---");
    const { item } = route.params;

    // Time from AdvertisedTimeAtLocation in array
    let timeArray1 = item.AdvertisedTimeAtLocation.replace(/[^0-9\s-:+]/gm, " ")
    timeArray1 = timeArray1.split(" ");

    // Time from EstimatedTimeAtLocation in array
    let timeArray2 = item.EstimatedTimeAtLocation.replace(/[^0-9\s-:+]/gm, " ")
    timeArray2 = timeArray2.split(" ");

    function showWarning() {
        showMessage({
            message: "Försenad tåg från " + item.AdvertisedLocationName,
            description: "Tågnr " + item.AdvertisedTrainIdent + " Är försenat från " + timeArray1[1].slice(0, -3) + " till " + timeArray2[1].slice(0, -3),
            type: "warning"
        });
    }

    return (
        <ScrollView style={Base.details}>
            <Text style={Base.detailsText}>Avgång: {item.AdvertisedLocationName}</Text>
            <Text style={Base.detailsText}>Datum: {timeArray1[0]}</Text>
            <Text style={Base.detailsText}>Tåg: {item.AdvertisedTrainIdent}</Text>
            {item.Canceled
            ?<Text style={Base.detailsTextWarning}>Inställt: Tåget är Inställt</Text>
            :<Text style={Base.detailsText}>Inställt: Ej Inställt</Text>
            }
            <Text style={Base.detailsTextWarning}>Information: Tåg {item.AdvertisedTrainIdent} är försenat från {timeArray1[1].slice(0, -3)} till {timeArray2[1].slice(0, -3)}</Text>
            {showWarning()}
        </ScrollView>
    )
};