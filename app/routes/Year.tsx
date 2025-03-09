import { Outlet, redirect } from "react-router"
import { WarningIcon } from '~/components/Icons/warning'
import { yearEventsSeasonYearGet } from "~/client/generated"
import { ApiClient } from "~/client"
import type { Route } from '.react-router/types/app/routes/+types/Year'

export async function loader(props: Route.LoaderArgs) {
    return (
        await yearEventsSeasonYearGet({
            throwOnError: true,
            client: ApiClient,
            path: { year: Number.parseInt(props.params.year) },
        })
    ).data
}

export function headers() {
    return {
        "Cache-Control": "public, max-age=4233600",
    }
}

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData()
    return redirect(`/year/${formData.get("year")}`)
}


// for caching purposes on page navigation
export async function clientLoader(props: Route.LoaderArgs) {
    return (
        await yearEventsSeasonYearGet({
            throwOnError: true,
            client: ApiClient,
            path: { year: Number.parseInt(props.params.year) },
        })
    ).data
}

export function ErrorBoundary() {
    return (
        <div className="flex flex-col items-center justify-center">
            <WarningIcon />
            <h1 className="text-xl">There is no data available for this season yet, or something went wrong</h1>
        </div>
    )
}

export default function Year() {
    return <Outlet />
}
