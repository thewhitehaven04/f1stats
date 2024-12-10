import type { Route } from ".react-router/types/app/routes/+types/Session"
import { useParams } from 'react-router'
import { ApiClient } from "~/client"
import {
    getPracticeResultsSessionResultsPracticeGet,
    getSessionSummarySeasonYearEventEventNameSessionSessionIdentifierSummaryGet,
} from "~/client/generated"
import { getTableDataFromResultsResponse } from '~/features/results/components/helpers'
import { PracticeResults } from '~/features/results/components/PracticeResults'
import { getSessionFromParams } from "~/routes/helpers/getSessionFromParams"

const client = ApiClient

export async function loader(loaderArgs: Route.LoaderArgs) {
    const session = getSessionFromParams(loaderArgs.params)
    const year = Number.parseInt(session.year)

    const summary = await getSessionSummarySeasonYearEventEventNameSessionSessionIdentifierSummaryGet({
        client,
        path: {
            event_name: session.event,
            session_identifier: session.session,
            year,
        },
    })

    const results = await getPracticeResultsSessionResultsPracticeGet({
            client,
            query: {
                event_name: session.event,
                // remove as after implementing the other sessions
                practice: session.session as 'Practice 1' | 'Practice 2' | 'Practice 3',
                year,
            },
        })

    if (summary.error || results.error) {
        throw new Error("Unable to load session")
    }

    return { summary: summary.data, results: results.data } 
}

export default function SessionRoute(props: Route.ComponentProps) {
    const { summary, results } = props.loaderData

    const practiceResults = getTableDataFromResultsResponse(results || [])
    const session = getSessionFromParams(props.params)

    const isPractice = session.session === "Practice 1" || session.session === "Practice 2" || session.session === "Practice 3"

    return (
        <section className='w-full card'>
            <h1 className='card-title'>{summary.summary.official_name}</h1>
            <div className='card-body'>
                {isPractice && results && <PracticeResults data={practiceResults}/>}
            </div>
        </section>
    )
}
