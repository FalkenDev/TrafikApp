import GeometryCode from "./stations_geo"
export default interface Stations {
    AdvertisedLocationName: string,
    Geometry: Array<GeometryCode>,
    LocationSignature: string,
    PlatformLine: Array<string>
};