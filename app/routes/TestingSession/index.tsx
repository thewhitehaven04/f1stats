import { ApiClient } from "~/client"
import { SessionSummaryCard } from "~/features/session/summary"
import { Suspense } from "react"
import { SummarySkeleton } from "~/features/session/summary/skeleton"
import { Link, Outlet } from "react-router"
import type { IBreadcrumbProps } from "~/components/Breadcrumbs/types"
import { getTestingSessionSummarySeasonYearRoundTestingRoundDayDaySummaryGet } from "~/client/generated"
import type { Route } from ".react-router/types/app/routes/TestingSession/+types"
import { WarningIcon } from '~/components/Icons/warning'
import { queryClient } from '~/config'

const client = ApiClient

export async function loader(loaderArgs: Route.LoaderArgs) {
    const { year, round, day } = loaderArgs.params
    const parsedYear = Number.parseInt(year)

    const summary = (
        await getTestingSessionSummarySeasonYearRoundTestingRoundDayDaySummaryGet({
            client,
            throwOnError: true,
            path: {
                testing_round: round,
                day: Number.parseInt(day),
                year: parsedYear,
            },
        })
    ).data

    return { summary }
}

export function clientLoader(loaderArgs: Route.ClientLoaderArgs) {
    const { serverLoader, params } = loaderArgs
    return queryClient.fetchQuery({
        queryKey: [params.year, params.round, params.year, "summary"],
        queryFn: () => serverLoader(),
        staleTime: Number.POSITIVE_INFINITY,
    })
}

clientLoader.hydrate = true as const

export function ErrorBoundary() {
    return (
        <div className="flex flex-col justify-center items-center h-full">
            <WarningIcon/>
            <span>Timing data is not available yet. Please try again later</span>
        </div>
    )
}

export const handle = {
    breadcrumb: (props: IBreadcrumbProps<Route.ComponentProps["params"]>) =>
        props.active ? (
            <>
                <li>
                    <Link to={`/year/${props.params.year}`} viewTransition>
                        {props.params.year}
                    </Link>
                </li>

                <li>
                    <Link to={`${props.base}?${props.search}`} viewTransition>
                        Testing day {props.params.day}
                    </Link>
                </li>
            </>
        ) : (
            <>
                <li>
                    <span>{props.params.year}</span>
                </li>
                <li>
                    <span>Testing day {props.params.day}</span>
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
