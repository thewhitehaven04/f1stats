export interface IBaseResultsData {
    driver: string
    driverNumber: string
    countryCode: string
    teamName: string
}

export interface IPracticeData extends IBaseResultsData {
    time: number | null
    gap: number | null
}

export interface IQualifyingData extends IBaseResultsData {
    q1Time: number | null   
    q2Time: number | null   
    q3Time: number | null   
}

export interface IRaceData extends IBaseResultsData {
    gridPosition: number 
    time: number | null
    gap: number | null
    points: number
}

export enum ESessionType {
    RACE_LIKE = 'racelike',
    QUALI_LIKE = 'qualilike',
    PRACTICE = 'practice'
}