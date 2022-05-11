export default interface TrafficImpact {
    IsConfirmed: boolean,
    FromLocation: Array<string>,
    AffectedLocation: Array<string>,
    ToLocation: Array<string>
};