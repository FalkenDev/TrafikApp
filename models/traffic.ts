import config from '../config/config.json';
import Stations from '../interfaces/stations';
import Codes from '../interfaces/codes';
import Messages from '../interfaces/messages';
import Delays from '../interfaces/delays';

const traffic = {
    getDelays: async function getDelays(): Promise<Delays[]>{
        const response = await fetch(`${config.delayed_url}`);
        const result = await response.json();
        return result.data;
    },

    getCodes : async function getCodes(): Promise<Codes[]> {
        const response = await fetch(`${config.codes_url}`);
        const result = await response.json();

        return result.data;
    },

    getMessages: async function getMessages(): Promise<Messages[]> {
        const response = await fetch(`${config.messages_url}`);
        const result = await response.json();

        return result.data;
    },

    getStations : async function getStations(): Promise<Stations[]> {
        const response = await fetch(`${config.stations_url}`);
        const result = await response.json();

        return result.data;
    },

    getTrafficInfo: async function getTrafficInfo() {
        const allDelays = await this.getDelays();
        const allStations = await this.getStations();

        let from = allDelays
            .filter(item => item.FromLocation !== undefined)
            .map(item => ({
                ...allStations.find(({ LocationSignature }) => item.FromLocation[0].LocationName == LocationSignature ),
                ...item,
            }));

        return from;
    },

    getFinalDestination: async function finalDestination(from) {
        const allStations = await this.getStations();

        let to = from
            .filter(item => item.FromLocation !== undefined)
            .map(item =>({
                ...allStations.find(({ LocationSignature }) => item.ToLocation[0].LocationName == LocationSignature ),
            }));

        console.log(from);
        
        return to;
    },

    getCoords: function getCoords(coords: string) {
        let newCoords = coords.replace(/[^0-9\s.]/gm, '')
        newCoords = newCoords.split(" ");
        newCoords.shift();
        return newCoords;
    },

    getTimeArray: function getTimeArray(time: string) {
        let timeArray = time.replace(/[^0-9\s-:+]/gm, " ")
        timeArray = timeArray.split(" ");
        return timeArray;
    },

    ifDelayed: function ifDelayed(time1:string, time2:string) {
        if (time1 === time2) {
            return true;
        }
        return false;
    }
}

export default traffic;