export interface IXMLMetadata {
    ["@version"]: string;
    ["@encoding"]: string;
}
export interface ISeatData {
    Won: string;
    Likely: string;
    InDoubt: string;
}
export interface IPrimaryVoteData {
    Votes: string;
    Percent: string;
    Swing: string;
}
export interface IPartyGroupBase {
    ["@Hint"]: string;
    PartyGroupCode: string;
    ShortName: string[];
    LongName: string;
    ListOrder: string;
    TVName: string;
    ColourCode: string;
    ColourHTML: string;
    CandidateCount: string;
    PrimaryVotes: string;
    SimplePrimary: IPrimaryVoteData;
    PredictedPrimary: IPrimaryVoteData;
    PredictedSeatsSuppresed: string;
    GainedSeats: string;
    LostSeats: string;
    ChangedSeats: string;
    SeatsExcludingEarlyVotes: ISeatData;
}
export interface IPartyGroup extends IPartyGroupBase {
    PartyGroupCode: string;
}
export interface IPartyGroupAccumulated extends IPartyGroupBase {
    DisplayControlCode: string;
}
export interface IPartyGroupContestants extends IPartyGroupBase {
    ContestantCode: string;
}
export interface IPartyGroupMap<Group> {
    ["@Count"]: number;
    PartyGroup: Group[];
}
export interface ITrend {
    ["@Hint"]: string;
    CategoryCode: string;
    TVName: string;
    ShortName: string;
    CountedPct: string;
    PredictionStringSuppressed: string;
    TotalVotes: string;
    Confidence: string;
    PartyGroups: IPartyGroupMap<IPartyGroup>;
    AccumulatedPartyGroups: IPartyGroupMap<IPartyGroupAccumulated>;
    Contestants: IPartyGroupMap<IPartyGroupContestants>;
}
export interface ITrendMap {
    ["@Count"]: number;
    Trend: ITrend[];
}
export interface IChamber {
    ["@Hint"]: string;
    LongName: string;
    ShortName: string;
    IsFinalFigures: boolean;
    CountedPct: string;
    Trends: ITrendMap;
}
export interface IChamberMap {
    Chamber: IChamber;
}
export interface IElection {
    ["@Hint"]: string;
    ElectionCode: string;
    LongName: string;
    IsFederalElection: boolean;
    Chambers: IChamberMap;
}
export interface IElectionMap {
    Election: IElection;
}
export interface IPartyGroupTrends {
    ["@Hint"]: string;
    CreateTime: string;
    IsLiveResult: boolean;
    Elections: IElectionMap;
}
export interface IElectionData {
    ["?xml"]: IXMLMetadata;
    Erads: IPartyGroupTrends;
}
