// This file is auto-generated by @hey-api/openapi-ts

export type DriverLapDataOut = {
    driver: string
    team: string
    data: Array<LapTimingDataOut>
}

export type DriverQualifyingResultDto = {
    Driver: string
    DriverNumber: string
    CountryCode: string
    TeamId: string
    TeamName: string
    Q1Time: number | null
    Q2Time: number | null
    Q3Time: number | null
}

export type ECompound = "SOFT" | "MEDIUM" | "HARD" | "INTERMEDIATE" | "WET" | "TEST_UNKNOWN"

export type HTTPValidationError = {
    detail?: Array<ValidationError>
}

export type LapTimingDataOut = {
    LapTime: number | null
    Sector1Time: number | null
    Sector2Time: number | null
    Sector3Time: number | null
    ST1: number | null
    ST2: number | null
    ST3: number | null
    LapNumber: number
    Stint: number | null
    TyreLife: number | null
    Position: number | null
    Compound: ECompound
    IsOutlap: boolean
    IsInlap: boolean
}

export type PracticeDriverResultDto = {
    Driver: string
    DriverNumber: string
    CountryCode: string
    TeamId: string
    TeamName: string
    Time: number | null
}

export type RaceDriverResultDto = {
    Driver: string
    DriverNumber: string
    CountryCode: string
    TeamId: string
    TeamName: string
    GridPosition: number
    Status: string
    Points: number
    Time: number | null
    Gap: number | null
}

export type ScheduledEventCollection = {
    RoundNumber: Array<number>
    Country: Array<string>
    EventDate: Array<string | null>
    EventName: Array<string>
    OfficialEventName: Array<string>
    EventFormat: Array<string>
    Session1: Array<SessionIdentifier>
    Session1Date: Array<string | null>
    Session1DateUtc: Array<string | null>
    Session2: Array<SessionIdentifier>
    Session2Date: Array<string | null>
    Session2DateUtc: Array<string | null>
    Session3: Array<SessionIdentifier>
    Session3Date: Array<string | null>
    Session3DateUtc: Array<string | null>
    Session4: Array<SessionIdentifier | null>
    Session4Date: Array<string | null>
    Session4DateUtc: Array<string | null>
    Session5: Array<SessionIdentifier | null>
    Session5Date: Array<string | null>
    Session5DateUtc: Array<string | null>
    F1ApiSupport: Array<boolean>
}

export type SessionIdentifier =
    | "Race"
    | "Qualifying"
    | "Sprint"
    | "Sprint Qualifying"
    | "Sprint Shootout"
    | "Practice 1"
    | "Practice 2"
    | "Practice 3"

export type SessionSummary = {
    weather: SessionWeather
    summary: Summary
}

export type SessionWeather = {
    air_temp_start: number
    air_temp_finish: number
    track_temp_start: number
    track_temp_finish: number
    humidity_start: number
    humidity_finish: number
}

export type Summary = {
    start_time: string | null
    finish_time: string | null
    round_name: string
    official_name: string
    session_type: string
}

export type ValidationError = {
    loc: Array<string | number>
    msg: string
    type: string
}

export type GetSessionLaptimesSessionLapsAllGetData = {
    query: {
        event_name: string
        session_identifier: SessionIdentifier
        year: number
    }
}

export type GetSessionLaptimesSessionLapsAllGetResponse = Array<DriverLapDataOut>

export type GetSessionLaptimesSessionLapsAllGetError = HTTPValidationError

export type GetPracticeResultsSessionResultsPracticeGetData = {
    query: {
        event_name: string
        practice: "Practice 1" | "Practice 2" | "Practice 3"
        year: number
    }
}

export type GetPracticeResultsSessionResultsPracticeGetResponse = Array<PracticeDriverResultDto>

export type GetPracticeResultsSessionResultsPracticeGetError = HTTPValidationError

export type GetRaceResultsSessionResultsRaceGetData = {
    query: {
        event_name: string
        year: number
    }
}

export type GetRaceResultsSessionResultsRaceGetResponse = Array<RaceDriverResultDto>

export type GetRaceResultsSessionResultsRaceGetError = HTTPValidationError

export type GetQualifyingResultsSessionResultsQualifyingGetData = {
    query: {
        event_name: string
        year: number
    }
}

export type GetQualifyingResultsSessionResultsQualifyingGetResponse = Array<DriverQualifyingResultDto>

export type GetQualifyingResultsSessionResultsQualifyingGetError = HTTPValidationError

export type GetSprintResultsSessionResultsSprintGetData = {
    query: {
        event_name: string
        year: number
    }
}

export type GetSprintResultsSessionResultsSprintGetResponse = Array<PracticeDriverResultDto>

export type GetSprintResultsSessionResultsSprintGetError = HTTPValidationError

export type YearEventsSeasonYearGetData = {
    path: {
        year: number
    }
}

export type YearEventsSeasonYearGetResponse = ScheduledEventCollection

export type YearEventsSeasonYearGetError = HTTPValidationError

export type YearTelemetryEventsSeasonYearTelemetryGetData = {
    path: {
        year: number
    }
}

export type YearTelemetryEventsSeasonYearTelemetryGetResponse = ScheduledEventCollection

export type YearTelemetryEventsSeasonYearTelemetryGetError = HTTPValidationError

export type GetSessionSummarySeasonYearEventEventNameSessionSessionIdentifierSummaryGetData = {
    path: {
        event_name: string
        session_identifier: SessionIdentifier
        year: number
    }
}

export type GetSessionSummarySeasonYearEventEventNameSessionSessionIdentifierSummaryGetResponse = SessionSummary

export type GetSessionSummarySeasonYearEventEventNameSessionSessionIdentifierSummaryGetError = HTTPValidationError