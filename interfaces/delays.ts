import Location from "./delaysInterface/location"
export default interface Delays {
    ActivityId: string,
    ActivityType: string,
    AdvertisedTimeAtLocation: string,
    AdvertisedTrainIdent: string,
    Canceled: boolean,
    EstimatedTimeAtLocation: string,
    FromLocation: Array<Location>
};