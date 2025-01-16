import type { Route } from ".react-router/types/app/routes/+types/Session"
import { ApiClient } from "~/client"
import {
    getSessionSummarySeasonYearEventEventNameSessionSessionIdentifierSummaryGet,
    type SessionIdentifier,
} from "~/client/generated"
import { SessionSummaryCard } from "~/features/session/summary"
import { Suspense } from "react"
import { SummarySkeleton } from "~/features/session/summary/skeleton"
import { Outlet } from "react-router"

const client = ApiClient
export async function loader(loaderArgs: Route.LoaderArgs) {
    const { year, event, session } = loaderArgs.params as { year: string; event: string; session: SessionIdentifier }
    const parsedYear = Number.parseInt(year)

    const summary = getSessionSummarySeasonYearEventEventNameSessionSessionIdentifierSummaryGet({
        client,
        throwOnError: true,
        path: {
            event_name: event,
            session_identifier: session as SessionIdentifier,
            year: parsedYear,
        },
    }).then((response) => response.data)

    return { summary }
}

export default function SessionRoute(props: Route.ComponentProps) {
    const { loaderData } = props
    return (
        <>
            <Suspense fallback={<SummarySkeleton />}>
                <SessionSummaryCard summary={loaderData.summary} />
            </Suspense>
            <Outlet />
        </>
    )
}
