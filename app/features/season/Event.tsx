import { format } from "date-fns/format"
import { Link } from "react-router"
import type { ScheduledEvent, SessionIdentifier } from "~/client/generated"
import { NaLabel } from "~/components/ValueOrNa"
import { buildNavigationRoute } from "~/features/navigation/buildResultRoute"
import getUnicodeFlagIcon from "country-flag-icons/unicode"

export function EventCard(props: ScheduledEvent & { year: string }) {
    const {
        EventFormat,
        EventName,
        EventDate,
        Session1,
        Session2,
        Session3,
        Session4,
        Session5,
        year,
        Country,
        RoundNumber,
    } = props

    return (
        <article
            key={EventName}
            className="card bg-base-100 border-2 border-neutral-100 border-solid card-compact shadow-md"
        >
            <div className="card-body">
                <div className="flex flex-row gap-2 card-title items-center">
                    <span className="text-2xl">{getUnicodeFlagIcon(Country)}</span>
                    <h1 className="text-lg">{EventName}</h1>
                </div>
                <span className="text-neutral-500 text-lg">
                    {EventDate ? format(new Date(EventDate), "MMMM dd, yyyy") : <NaLabel />}
                </span>
                {EventFormat === "conventional" ? (
                    <div className="flex flex-row gap-1 justify-start">
                        <ul className="menu menu-vertical">
                            <li>
                                <Link
                                    className="link-hover"
                                    to={buildNavigationRoute(Session1 as SessionIdentifier, year, RoundNumber)}
                                    viewTransition
                                >
                                    {Session1}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="link-hover"
                                    to={buildNavigationRoute(Session2 as SessionIdentifier, year, RoundNumber)}
                                    viewTransition
                                >
                                    {Session2}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="link-hover"
                                    to={buildNavigationRoute(Session3 as SessionIdentifier, year, RoundNumber)}
                                    viewTransition
                                >
                                    {Session3}
                                </Link>
                            </li>
                        </ul>
                        <ul className="menu menu-vertical">
                            {Session4 && (
                                <li>
                                    <Link
                                        className="link-hover"
                                        to={buildNavigationRoute(Session4 as SessionIdentifier, year, RoundNumber)}
                                        viewTransition
                                    >
                                        {Session4}
                                    </Link>
                                </li>
                            )}
                            {Session5 && (
                                <li>
                                    <Link
                                        className="link-hover"
                                        to={buildNavigationRoute(Session5 as SessionIdentifier, year, RoundNumber)}
                                        viewTransition
                                    >
                                        {Session5}
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                ) : EventFormat === "testing" ? (
                    <ul className="menu menu-vertical">
                        <li>
                            <Link
                                className="link-hover"
                                to={buildNavigationRoute(Session1 as SessionIdentifier, year, RoundNumber)}
                                viewTransition
                            >
                                {Session1}
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="link-hover"
                                to={buildNavigationRoute(Session2 as SessionIdentifier, year, RoundNumber)}
                                viewTransition
                            >
                                {Session2}
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="link-hover"
                                to={buildNavigationRoute(Session3 as SessionIdentifier, year, RoundNumber)}
                                viewTransition
                            >
                                {Session3}
                            </Link>
                        </li>
                    </ul>
                ) : EventFormat === "sprint_shootout" ? (
                    <div className="flex flex-row gap-4">
                        <ul className="menu menu-vertical">
                            <li>
                                <Link
                                    className="link-hover"
                                    to={buildNavigationRoute(Session1 as SessionIdentifier, year, RoundNumber)}
                                    viewTransition
                                >
                                    {Session1}
                                </Link>
                            </li>
                        </ul>
                        <ul className="menu menu-vertical">
                            <li>
                                <Link
                                    className="link-hover"
                                    to={buildNavigationRoute(Session3 as SessionIdentifier, year, RoundNumber)}
                                    viewTransition
                                >
                                    {Session3}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="link-hover"
                                    to={buildNavigationRoute(Session4 as SessionIdentifier, year, RoundNumber)}
                                    viewTransition
                                >
                                    {Session4}
                                </Link>
                            </li>
                        </ul>
                        <ul className="menu menu-vertical">
                            <li>
                                <Link
                                    className="link-hover"
                                    to={buildNavigationRoute(Session2 as SessionIdentifier, year, RoundNumber)}
                                    viewTransition
                                >
                                    {Session2}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="link-hover"
                                    to={buildNavigationRoute(Session5 as SessionIdentifier, year, RoundNumber)}
                                    viewTransition
                                >
                                    {Session5}
                                </Link>
                            </li>
                        </ul>
                    </div>
                ) : EventFormat === "sprint_qualifying" ? (
                    <div className="flex flex-row gap-4">
                        <ul className="menu menu-vertical">
                            <li>
                                <Link
                                    className="link-hover"
                                    to={buildNavigationRoute(Session1 as SessionIdentifier, year, RoundNumber)}
                                    viewTransition
                                >
                                    {Session1}
                                </Link>
                            </li>
                        </ul>
                        <ul className="menu menu-vertical">
                            <li>
                                <Link
                                    className="link-hover"
                                    to={buildNavigationRoute(Session2 as SessionIdentifier, year, RoundNumber)}
                                    viewTransition
                                >
                                    {Session2}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="link-hover"
                                    to={buildNavigationRoute(Session3 as SessionIdentifier, year, RoundNumber)}
                                    viewTransition
                                >
                                    {Session3}
                                </Link>
                            </li>
                        </ul>
                        <ul className="menu menu-vertical">
                            <li>
                                <Link
                                    className="link-hover"
                                    to={buildNavigationRoute(Session4 as SessionIdentifier, year, RoundNumber)}
                                    viewTransition
                                >
                                    {Session4}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="link-hover"
                                    to={buildNavigationRoute(Session5 as SessionIdentifier, year, RoundNumber)}
                                    viewTransition
                                >
                                    {Session5}
                                </Link>
                            </li>
                        </ul>
                    </div>
                ) : EventFormat === "sprint" ? (
                    <div className="flex flex-row gap-4">
                        <ul className="menu menu-vertical">
                            <li>
                                <Link
                                    className="link-hover"
                                    to={buildNavigationRoute(Session1 as SessionIdentifier, year, RoundNumber)}
                                    viewTransition
                                >
                                    {Session1}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="link-hover"
                                    to={buildNavigationRoute(Session3 as SessionIdentifier, year, RoundNumber)}
                                    viewTransition
                                >
                                    {Session3}
                                </Link>
                            </li>
                        </ul>
                        <ul className="menu menu-vertical">
                            <li>
                                <Link
                                    className="link-hover"
                                    to={buildNavigationRoute(Session2 as SessionIdentifier, year, RoundNumber)}
                                    viewTransition
                                >
                                    {Session2}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="link-hover"
                                    to={buildNavigationRoute(Session4 as SessionIdentifier, year, RoundNumber)}
                                    viewTransition
                                >
                                    {Session4}
                                </Link>
                            </li>
                        </ul>
                        <ul className="menu menu-vertical">
                            <li>
                                <Link
                                    className="link-hover"
                                    to={buildNavigationRoute(Session5 as SessionIdentifier, year, RoundNumber)}
                                    viewTransition
                                >
                                    {Session5}
                                </Link>
                            </li>
                        </ul>
                    </div>
                ) : null}
            </div>
        </article>
    )
}
