import { ApiClient } from "~/client"
import {
    getSessionSummarySeasonYearEventEventNameSessionSessionIdentifierSummaryGet,
    type SessionIdentifier,
} from "~/client/generated"
import { SessionSummaryCard } from "~/features/session/summary"
import { Suspense } from "react"
import { SummarySkeleton } from "~/features/session/summary/skeleton"
import { Link, Outlet } from "react-router"
import type { Route } from ".react-router/types/app/routes/Session/+types"

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

export function headers() {
    return { "Cache-Control": "s-maxage=86400" }
}

export const handle = {
    breadcrumb: (pathname: string, params: Route.ComponentProps["params"]) => (
        <Link to={pathname}>
            {params.event}, {params.session}
        </Link>
    ),
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
