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
import type { IUniqueSession } from "~/features/session/types"
import type { IBreadcrumbProps } from "~/components/Breadcrumbs/types"

const client = ApiClient

export async function loader(loaderArgs: Route.LoaderArgs) {
    const { year, event, session } = loaderArgs.params as IUniqueSession
    const parsedYear = Number.parseInt(year)

    const summary = getSessionSummarySeasonYearEventEventNameSessionSessionIdentifierSummaryGet({
        client,
        throwOnError: true,
        path: {
            event_name: event,
            session_identifier: session,
            year: parsedYear,
        },
    }).then((response) => response.data)

    return { summary }
}

export function headers() {
    return { "Cache-Control": "s-maxage=86400" }
}

export const handle = {
    breadcrumb: (props: IBreadcrumbProps<IUniqueSession>) =>
        props.active ? (
            <Link to={`${props.base}?${props.search}`}>
                {props.params.event}, {props?.params.session}
            </Link>
        ) : (
            <span>
                {props.params.event}, {props?.params.session}
            </span>
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
