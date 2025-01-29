import { format } from "date-fns"
import { Link } from "react-router"
import type { ScheduledEventCollection, SessionIdentifier } from "~/client/generated"
import { NaLabel } from "~/components/ValueOrNa"
import { buildNavigationRoute } from "~/features/navigation/buildResultRoute"

export function EventsSection(props: { events: ScheduledEventCollection; year: string }) {
    const { events, year } = props
    return (
        <section className="w-full grid grid-cols-[repeat(auto-fill,_minmax(400px,_1fr))] gap-4">
            {events.EventName.map((eventName, index) => (
                <article key={eventName} className="card card-compact border-2 shadow-md">
                    <div className="card-body">
                        <div className="flex flex-row gap-2 card-title">
                            <h1>{eventName}</h1>
                        </div>
                        <div>
                            <span className="text-neutral-500 text-lg">
                                {events.EventDate[index] ? (
                                    format(new Date(events.EventDate[index]), "MMMM dd, yyyy")
                                ) : (
                                    <NaLabel />
                                )}
                            </span>
                            <ul className='menu menu-horizontal'>
                                <li>
                                    <Link
                                        className="link-hover"
                                        to={buildNavigationRoute(
                                            events.Session1[index] as SessionIdentifier,
                                            year,
                                            eventName,
                                        )}
                                    >
                                        {events.Session1[index]}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="link-hover"
                                        to={buildNavigationRoute(
                                            events.Session2[index] as SessionIdentifier,
                                            year,
                                            eventName,
                                        )}
                                    >
                                        {events.Session2[index]}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="link-hover"
                                        to={buildNavigationRoute(
                                            events.Session3[index] as SessionIdentifier,
                                            year,
                                            eventName,
                                        )}
                                    >
                                        {events.Session3[index]}
                                    </Link>
                                </li>
                                {events.Session4[index] && (
                                    <li>
                                        <Link
                                            className="link-hover"
                                            to={buildNavigationRoute(
                                                events.Session4[index] as SessionIdentifier,
                                                year,
                                                eventName,
                                            )}
                                        >
                                            {events.Session4[index]}
                                        </Link>
                                    </li>
                                )}
                                {events.Session5[index] && (
                                    <li>
                                        <Link
                                            className="link-hover"
                                            to={buildNavigationRoute(
                                                events.Session5[index] as SessionIdentifier,
                                                year,
                                                eventName,
                                            )}
                                        >
                                            {events.Session5[index]}
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </article>
            ))}
        </section>
    )
}
