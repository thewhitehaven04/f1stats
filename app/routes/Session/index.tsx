import { ApiClient } from "~/client"
import { SessionSummaryCard } from "~/features/session/summary"
import { Suspense } from "react"
import { SummarySkeleton } from "~/features/session/summary/skeleton"
import { Link, Outlet } from "react-router"
import type { Route } from ".react-router/types/app/routes/Session/+types"
import type { IUniqueSession } from "~/features/session/types"
import type { IBreadcrumbProps } from "~/components/Breadcrumbs/types"
import { getSessionSummarySeasonYearRoundRoundNumberSessionSessionIdentifierSummaryGet } from "~/client/generated"
import { WarningIcon } from "~/components/Icons/warning"

const client = ApiClient

export async function loader(loaderArgs: Route.LoaderArgs) {
    const { year, round, session } = loaderArgs.params as IUniqueSession
    const parsedYear = Number.parseInt(year)

    const summary = (
        await getSessionSummarySeasonYearRoundRoundNumberSessionSessionIdentifierSummaryGet({
            client,
            throwOnError: true,
            path: {
                round_number: round,
                session_identifier: session,
                year: parsedYear,
            },
        })
    ).data

    return { summary }
}

export function headers() {
    return { "Cache-Control": "public, max-age=604800" }
}

export function meta(metaArgs: Route.MetaArgs) {
    return [
        {
            title: `${metaArgs.data.summary.summary.round_name} ${metaArgs.params.session} ${metaArgs.params.year} results`,
        },
    ]
}

export function ErrorBoundary() {
    return (
        <div className="flex flex-col justify-center items-center">
            <WarningIcon />
            <span>Timing data is not available yet. Please try again later</span>
        </div>
    )
}

export const handle = {
    breadcrumb: (props: IBreadcrumbProps<IUniqueSession>) =>
        props.active ? (
            <>
                <li>
                    <Link to={`/year/${props.params.year}`} viewTransition>
                        {props.params.year}
                    </Link>
                </li>

                <li>
                    <Link to={`${props.base}?${props.search}`} viewTransition>
                        Round {props.params.round}, {props?.params.session}
                    </Link>
                </li>
            </>
        ) : (
            <>
                <li>
                    <span>{props.params.year}</span>
                </li>
                <li>
                    <span>
                        Round {props.params.round}, {props?.params.session}
                    </span>
                </li>
            </>
        ),
}

export default function SessionRoute(props: Route.ComponentProps) {
    const { loaderData } = props

    return (
        <>
            <Suspense fallback={<SummarySkeleton />}>
                <SessionSummaryCard session={loaderData.summary} />
            </Suspense>
            <Outlet />
        </>
    )
}
