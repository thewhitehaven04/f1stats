import { Link } from "react-router"
import type { SessionIdentifier } from "~/client/generated"
import { buildNavigationRoute } from "~/features/navigation/buildResultRoute"

export interface IEventSectionProps {
    events: { name: string; sessions: Array<SessionIdentifier | null> }[]
    year: string
    activeSession: { event: string | undefined; session: SessionIdentifier | undefined }
}

export function EventSection({ events, year, activeSession }: IEventSectionProps) {
    return (
        <>
            <div className="menu-title">Events</div>
            <ul className="menu flex flex-col gap-2">
                {events.map((event) => (
                    <li key={event.name}>
                        {event.name}
                        <details open={false}>
                            <ul className="menu">
                                {event.sessions.map(
                                    (session) =>
                                        session && (
                                            <li
                                                className={
                                                    event.name === activeSession.event &&
                                                    session === activeSession.session
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                <Link
                                                    key={session}
                                                    className="link-hover"
                                                    to={buildNavigationRoute(session, year, event.name)}
                                                >
                                                    {session}
                                                </Link>
                                            </li>
                                        ),
                                )}
                            </ul>
                        </details>
                    </li>
                ))}
            </ul>
        </>
    )
}
