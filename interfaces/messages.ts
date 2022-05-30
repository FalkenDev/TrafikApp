import GeometryCode from "./delaysInterface/stations_geo"
import ReasonCode from "./messagesInterface/reasonCode"
import TrafficImpact from "./messagesInterface/trafficImpact"

export default interface Messages {
    ExternalDescription: string,
    Geometry: Array<GeometryCode>,
    EventId: string,
    Header: string,
    ReasonCode: Array<ReasonCode>,
    TrafficImpact: Array<TrafficImpact>,
    StartDateTime: string,
    LastUpdateDateTime: string
};