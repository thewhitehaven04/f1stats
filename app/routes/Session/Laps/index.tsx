import type { Route } from ".react-router/types/app/routes/Session/Laps/+types"
import { Link } from "react-router"
import { ApiClient } from "~/client"
import {
    getSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPost,
    type SessionIdentifier,
} from "~/client/generated"
import type { IBreadcrumbProps } from "~/components/Breadcrumbs/types"
import { LapComparisonSection } from "~/features/session/laps/LapComparison"

const client = ApiClient

export const handle = {
    breadcrumb: (props: IBreadcrumbProps) => (
        <li>
            {props.active ? <Link to={props.base}>Laps</Link> : <span>Laps</span>}
        </li>
    ),
}

export async function loader(args: Route.LoaderArgs) {
    const { params, request } = args
    const drivers = new URL(request.url).searchParams.getAll("driver")

    if (!drivers) {
        throw new Error("No drivers specified")
    }

    const laps = getSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPost({
        client,
        throwOnError: true,
        body: { queries: drivers.map((driver) => ({ driver, lap_filter: null })) },
        path: {
            event: params.event,
            session_identifier: params.session as SessionIdentifier,
            year: params.year,
        },
    }).then((response) => response.data)
    return { laps }
}

export default function LapsRoute(props: Route.ComponentProps) {
    const {
        loaderData: { laps },
    } = props

    return <LapComparisonSection lapSelectionDataPromise={laps} />
}
