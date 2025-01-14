// This file is auto-generated by @hey-api/openapi-ts

import { createClient, createConfig, type OptionsLegacyParser } from "@hey-api/client-fetch"
import type {
    GetSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPostData,
    GetSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPostError,
    GetSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPostResponse,
    GetSessionTelemetrySeasonYearEventEventSessionSessionIdentifierTelemetryPostData,
    GetSessionTelemetrySeasonYearEventEventSessionSessionIdentifierTelemetryPostError,
    GetSessionTelemetrySeasonYearEventEventSessionSessionIdentifierTelemetryPostResponse,
    GetSessionTelemetryInterpolatedSeasonYearEventEventSessionSessionIdentifierTelemetryInterpolatedPostData,
    GetSessionTelemetryInterpolatedSeasonYearEventEventSessionSessionIdentifierTelemetryInterpolatedPostError,
    GetSessionTelemetryInterpolatedSeasonYearEventEventSessionSessionIdentifierTelemetryInterpolatedPostResponse,
    GetSessionLapDriverTelemetrySeasonYearEventEventSessionSessionIdentifierLapLapDriverDriverTelemetryGetData,
    GetSessionLapDriverTelemetrySeasonYearEventEventSessionSessionIdentifierLapLapDriverDriverTelemetryGetError,
    GetSessionLapDriverTelemetrySeasonYearEventEventSessionSessionIdentifierLapLapDriverDriverTelemetryGetResponse,
    GetPracticeResultsSessionResultsPracticeGetData,
    GetPracticeResultsSessionResultsPracticeGetError,
    GetPracticeResultsSessionResultsPracticeGetResponse,
    GetRaceResultsSessionResultsRaceGetData,
    GetRaceResultsSessionResultsRaceGetError,
    GetRaceResultsSessionResultsRaceGetResponse,
    GetQualifyingResultsSessionResultsQualifyingGetData,
    GetQualifyingResultsSessionResultsQualifyingGetError,
    GetQualifyingResultsSessionResultsQualifyingGetResponse,
    GetSprintResultsSessionResultsSprintGetData,
    GetSprintResultsSessionResultsSprintGetError,
    GetSprintResultsSessionResultsSprintGetResponse,
    YearEventsSeasonYearGetData,
    YearEventsSeasonYearGetError,
    YearEventsSeasonYearGetResponse,
    YearTelemetryEventsSeasonYearTelemetryGetData,
    YearTelemetryEventsSeasonYearTelemetryGetError,
    YearTelemetryEventsSeasonYearTelemetryGetResponse,
    GetSessionSummarySeasonYearEventEventNameSessionSessionIdentifierSummaryGetData,
    GetSessionSummarySeasonYearEventEventNameSessionSessionIdentifierSummaryGetError,
    GetSessionSummarySeasonYearEventEventNameSessionSessionIdentifierSummaryGetResponse,
} from "./types.gen"

export const client = createClient(createConfig())

/**
 * Get Session Laptimes
 * Retrieve laptime data for given session
 */
export const getSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPost = <
    ThrowOnError extends boolean = false,
>(
    options: OptionsLegacyParser<
        GetSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPostData,
        ThrowOnError
    >,
) => {
    return (options?.client ?? client).post<
        GetSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPostResponse,
        GetSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPostError,
        ThrowOnError
    >({
        ...options,
        url: "/season/{year}/event/{event}/session/{session_identifier}/laps",
    })
}

/**
 * Get Session Telemetry
 */
export const getSessionTelemetrySeasonYearEventEventSessionSessionIdentifierTelemetryPost = <
    ThrowOnError extends boolean = false,
>(
    options: OptionsLegacyParser<
        GetSessionTelemetrySeasonYearEventEventSessionSessionIdentifierTelemetryPostData,
        ThrowOnError
    >,
) => {
    return (options?.client ?? client).post<
        GetSessionTelemetrySeasonYearEventEventSessionSessionIdentifierTelemetryPostResponse,
        GetSessionTelemetrySeasonYearEventEventSessionSessionIdentifierTelemetryPostError,
        ThrowOnError
    >({
        ...options,
        url: "/season/{year}/event/{event}/session/{session_identifier}/telemetry",
    })
}

/**
 * Get Session Telemetry Interpolated
 */
export const getSessionTelemetryInterpolatedSeasonYearEventEventSessionSessionIdentifierTelemetryInterpolatedPost = <
    ThrowOnError extends boolean = false,
>(
    options: OptionsLegacyParser<
        GetSessionTelemetryInterpolatedSeasonYearEventEventSessionSessionIdentifierTelemetryInterpolatedPostData,
        ThrowOnError
    >,
) => {
    return (options?.client ?? client).post<
        GetSessionTelemetryInterpolatedSeasonYearEventEventSessionSessionIdentifierTelemetryInterpolatedPostResponse,
        GetSessionTelemetryInterpolatedSeasonYearEventEventSessionSessionIdentifierTelemetryInterpolatedPostError,
        ThrowOnError
    >({
        ...options,
        url: "/season/{year}/event/{event}/session/{session_identifier}/telemetry/interpolated",
    })
}

/**
 * Get Session Lap Driver Telemetry
 */
export const getSessionLapDriverTelemetrySeasonYearEventEventSessionSessionIdentifierLapLapDriverDriverTelemetryGet = <
    ThrowOnError extends boolean = false,
>(
    options: OptionsLegacyParser<
        GetSessionLapDriverTelemetrySeasonYearEventEventSessionSessionIdentifierLapLapDriverDriverTelemetryGetData,
        ThrowOnError
    >,
) => {
    return (options?.client ?? client).get<
        GetSessionLapDriverTelemetrySeasonYearEventEventSessionSessionIdentifierLapLapDriverDriverTelemetryGetResponse,
        GetSessionLapDriverTelemetrySeasonYearEventEventSessionSessionIdentifierLapLapDriverDriverTelemetryGetError,
        ThrowOnError
    >({
        ...options,
        url: "/season/{year}/event/{event}/session/{session_identifier}/lap/{lap}/driver/{driver}/telemetry",
    })
}

/**
 * Get Practice Results
 */
export const getPracticeResultsSessionResultsPracticeGet = <ThrowOnError extends boolean = false>(
    options: OptionsLegacyParser<GetPracticeResultsSessionResultsPracticeGetData, ThrowOnError>,
) => {
    return (options?.client ?? client).get<
        GetPracticeResultsSessionResultsPracticeGetResponse,
        GetPracticeResultsSessionResultsPracticeGetError,
        ThrowOnError
    >({
        ...options,
        url: "/session/results/practice",
    })
}

/**
 * Get Race Results
 */
export const getRaceResultsSessionResultsRaceGet = <ThrowOnError extends boolean = false>(
    options: OptionsLegacyParser<GetRaceResultsSessionResultsRaceGetData, ThrowOnError>,
) => {
    return (options?.client ?? client).get<
        GetRaceResultsSessionResultsRaceGetResponse,
        GetRaceResultsSessionResultsRaceGetError,
        ThrowOnError
    >({
        ...options,
        url: "/session/results/race",
    })
}

/**
 * Get Qualifying Results
 */
export const getQualifyingResultsSessionResultsQualifyingGet = <ThrowOnError extends boolean = false>(
    options: OptionsLegacyParser<GetQualifyingResultsSessionResultsQualifyingGetData, ThrowOnError>,
) => {
    return (options?.client ?? client).get<
        GetQualifyingResultsSessionResultsQualifyingGetResponse,
        GetQualifyingResultsSessionResultsQualifyingGetError,
        ThrowOnError
    >({
        ...options,
        url: "/session/results/qualifying",
    })
}

/**
 * Get Sprint Results
 */
export const getSprintResultsSessionResultsSprintGet = <ThrowOnError extends boolean = false>(
    options: OptionsLegacyParser<GetSprintResultsSessionResultsSprintGetData, ThrowOnError>,
) => {
    return (options?.client ?? client).get<
        GetSprintResultsSessionResultsSprintGetResponse,
        GetSprintResultsSessionResultsSprintGetError,
        ThrowOnError
    >({
        ...options,
        url: "/session/results/sprint",
    })
}

/**
 * Year Events
 */
export const yearEventsSeasonYearGet = <ThrowOnError extends boolean = false>(
    options: OptionsLegacyParser<YearEventsSeasonYearGetData, ThrowOnError>,
) => {
    return (options?.client ?? client).get<YearEventsSeasonYearGetResponse, YearEventsSeasonYearGetError, ThrowOnError>(
        {
            ...options,
            url: "/season/{year}",
        },
    )
}

/**
 * Year Telemetry Events
 */
export const yearTelemetryEventsSeasonYearTelemetryGet = <ThrowOnError extends boolean = false>(
    options: OptionsLegacyParser<YearTelemetryEventsSeasonYearTelemetryGetData, ThrowOnError>,
) => {
    return (options?.client ?? client).get<
        YearTelemetryEventsSeasonYearTelemetryGetResponse,
        YearTelemetryEventsSeasonYearTelemetryGetError,
        ThrowOnError
    >({
        ...options,
        url: "/season/{year}/telemetry",
    })
}

/**
 * Get Session Summary
 */
export const getSessionSummarySeasonYearEventEventNameSessionSessionIdentifierSummaryGet = <
    ThrowOnError extends boolean = false,
>(
    options: OptionsLegacyParser<
        GetSessionSummarySeasonYearEventEventNameSessionSessionIdentifierSummaryGetData,
        ThrowOnError
    >,
) => {
    return (options?.client ?? client).get<
        GetSessionSummarySeasonYearEventEventNameSessionSessionIdentifierSummaryGetResponse,
        GetSessionSummarySeasonYearEventEventNameSessionSessionIdentifierSummaryGetError,
        ThrowOnError
    >({
        ...options,
        url: "/season/{year}/event/{event_name}/session/{session_identifier}/summary",
    })
}
