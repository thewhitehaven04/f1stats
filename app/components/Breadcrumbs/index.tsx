import { Link, useLocation } from "react-router"
import { Fragment } from "react/jsx-runtime"

const mapPathSegmentToBreadcrumb = Object.freeze({
    year: "Season",
    event: "Event",
    session: "Session",
    telemetry: "Telemetry",
})

export function buildLink(
    entities: ((typeof mapPathSegmentToBreadcrumb)[keyof typeof mapPathSegmentToBreadcrumb] | string)[],
) {
    return entities.map(([entity, entityId]) => `${entity}/${entityId}`).join("/")
}

export function Breadcrumbs() {
    const location = useLocation()
    const segments = location.pathname.split("/")
    return (
        <nav className="breadcrumbs">
            <ul>
                {segments.map((segment: string, index) => (
                    <Fragment key={segment}>
                        <li key={segment}>
                            {segment in mapPathSegmentToBreadcrumb ? (
                                <span className="text-gray-300">
                                    {mapPathSegmentToBreadcrumb[segment as keyof typeof mapPathSegmentToBreadcrumb]}
                                </span>
                            ) : (
                                <Link to={segments.slice(0, index + 1).join("/")}>
                                    {mapPathSegmentToBreadcrumb[segment] || decodeURI(segment)}
                                </Link>
                            )}
                        </li>
                    </Fragment>
                ))}
            </ul>
        </nav>
    )
}
