import type { Route } from '.react-router/types/app/routes/sessions/+types/Practice'
import { ApiClient } from '~/client'
import { getPracticeResultsSessionResultsPracticeGet, getSessionSummarySeasonYearEventEventNameSessionSessionIdentifierSummaryGet } from '~/client/generated'
import { getTableDataFromResultsResponse } from '~/features/results/components/helpers'
import { PracticeResults } from '~/features/results/components/PracticeResults'

const client = ApiClient

export async function loader(loaderProps: Route.LoaderArgs) {
    const query = loaderProps.params
    const year = query.year ? Number.parseInt(query.year) : 2024

    const results = getPracticeResultsSessionResultsPracticeGet({
        client,
        query: {
            event_name: query.event,
            practice: `Practice ${query.number}`, 
            year
        }
    })

    const session = getSessionSummarySeasonYearEventEventNameSessionSessionIdentifierSummaryGet({
        client,
        path: {
            event_name: query.event,
            session_identifier: `Practice ${query.number}`,
            year
        }
    })

    return { results: (await results).data, session: (await session).data }
}

export default function Practice ({ loaderData, params }: Route.ComponentProps) {
    const { results, session } = loaderData

    const practiceResults = getTableDataFromResultsResponse(results || [])

    return (
        <section className='card'>
            <h1 className='card-title'>Practice {params.number}</h1>
            <div className='card-body'>
                {results && <PracticeResults data={practiceResults}/>}
            </div>
        </section>
    )
}
