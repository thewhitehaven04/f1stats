import type { Route } from ".react-router/types/app/routes/+types/eventSession"
import { ApiClient } from "~/client"
import {
    getPracticeResultsSessionResultsPracticeGet,
    getQualifyingResultsSessionResultsQualifyingGet,
    getRaceResultsSessionResultsRaceGet,
    getSessionSummarySeasonYearEventEventNameSessionSessionIdentifierSummaryGet,
    type SessionIdentifier,
} from "~/client/generated"

const client = ApiClient

export async function loader(loaderProps: Route.LoaderArgs) {
    if (loaderProps.params.eventName && loaderProps.params.sessionType && loaderProps.params.year) {
        const year = Number.parseInt(loaderProps.params.year)
        const identifier = loaderProps.params.sessionType as SessionIdentifier
        let results

        if (loaderProps.params.sessionType.includes("Practice")) {
            results = await getPracticeResultsSessionResultsPracticeGet({
                client,
                query: {
                    year,
                    event_name: loaderProps.params.eventName,
                    practice: identifier as "Practice 1" | "Practice 2" | "Practice 3",
                },
            })
        } else if (
            loaderProps.params.sessionType === "Qualifying" ||
            loaderProps.params.sessionType === "Sprint Qualifying"
        ) {
            results = await getQualifyingResultsSessionResultsQualifyingGet({
                client,
                query: {
                    year,
                    event_name: loaderProps.params.eventName,
                },
            })
        }
        results = await getRaceResultsSessionResultsRaceGet({
            client,
            query: {
                year,
                event_name: loaderProps.params.eventName,
            },
        })

        const session = await getSessionSummarySeasonYearEventEventNameSessionSessionIdentifierSummaryGet({
            client,
            path: {
                year,
                event_name: loaderProps.params.eventName,
                session_identifier: identifier,
            },
        })

        if (results.error || session.error) {
            throw new Error("Unable to fetch results")
        }

        return {
            type: loaderProps.params.sessionType as SessionIdentifier,
            results: results.data,
            session: session.data,
        }
    }

    return null
}

export default function EventSession(props: Route.ComponentProps) {
    const { loaderData } = props

    if (!loaderData) {
        return (
            <div className="card">
                <div className="card-title">Select an event and a session in the sidebar to view results</div>
            </div>
        )
    }

    const { session, results, type } = loaderData

    const isRaceType = type === "Race" || type === "Sprint"
    const isQualifyingType = type === "Qualifying" || type === "Sprint Qualifying"
    const isPracticeType = type === "Practice 1" || type === "Practice 2" || type === "Practice 3"

    return (
        <section className="card">
            <h1 className="card-title">{session.summary.official_name}</h1>
            <div className='card-body'>
                <div className='card'> </div>
            </div>
        </section>
    )
}
