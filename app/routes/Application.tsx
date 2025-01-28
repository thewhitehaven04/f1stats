import type { Route } from '.react-router/types/app/routes/+types/App'

export default function DefaultRoute(props: Route.ComponentProps) {
    return <section className="card w-full">Select an event and a session in the sidebar to view results</section>
}