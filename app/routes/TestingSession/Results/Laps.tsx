import type { Route } from '.react-router/types/app/routes/TestingSession/Results/+types/Laps'
import { Link } from "react-router"
import { ApiClient } from "~/client"
import { getTestingSessionLaptimesSeasonYearTestingRoundRoundNumberDayDayLapsPost } from "~/client/generated"
import type { IBreadcrumbProps } from "~/components/Breadcrumbs/types"
import { LapComparisonSection } from "~/features/session/laps/LapComparison"

const client = ApiClient

export const handle = {
    breadcrumb: (props: IBreadcrumbProps<Route.ComponentProps['params']>) => (
        <li>
            {props.active ? (
                <Link to={props.base} viewTransition>
                    Laps
                </Link>
            ) : (
                <span>Laps</span>
            )}
        </li>
    ),
}

export function headers() {
    return { "Cache-Control": "public, max-age=604800" }
}

export async function loader(args: Route.LoaderArgs) {
    const { params, request } = args
    const drivers = new URL(request.url).searchParams.getAll("driver")

    if (!drivers) {
        throw new Error("No drivers specified")
    }

    const laps = getTestingSessionLaptimesSeasonYearTestingRoundRoundNumberDayDayLapsPost({
        client,
        throwOnError: true,
        body: { queries: drivers.map((driver) => ({ driver, lap_filter: null })) },
        path: {
            round_number: params.round,
            day: Number.parseInt(params.round),
            year: params.year,
        },
    }).then((response) => response.data)
    return { laps }
}

export default function LapsRoute() {
    return <LapComparisonSection />
}
