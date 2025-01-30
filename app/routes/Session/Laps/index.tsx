import type { Route } from ".react-router/types/app/routes/Session/Laps/+types"
import { Link } from "react-router"
import { ApiClient } from "~/client"
import {
    getSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPost,
    type SessionIdentifier,
} from "~/client/generated"
import type { IBreadcrumbProps } from "~/components/Breadcrumbs/types"
import { LapComparisonSection } from "~/features/session/laps/LapComparisonTable"

const client = ApiClient

export const handle = {
    breadcrumb: (props: IBreadcrumbProps) => (props.active ? <Link to={props.base}>Laps</Link> : <span>Laps</span>),
}

export async function loader(loaderArgs: Route.LoaderArgs) {
    const { params, request } = loaderArgs
    const drivers = new URL(request.url).searchParams.getAll("drivers")

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
    const { loaderData: { laps }} = props

    return <LapComparisonSection lapSelectionDataPromise={laps} />
}
