import type { ReactNode } from "react"
import { useMatches, type UIMatch } from "react-router"

export function Breadcrumbs() {
    const matches = useMatches() as UIMatch<
        unknown,
        { breadcrumb?: (pathname: string, params: Record<string, unknown>) => ReactNode }
    >[]

    const breadcrumbs = matches
        .map((match) => (match.handle?.breadcrumb ? match.handle?.breadcrumb(match.pathname, match.params) : null))
        .filter(Boolean)

    return (
        <nav className="breadcrumbs">
            <ul>
                {breadcrumbs.map((crumb) => (
                    <li key={crumb}>{crumb}</li>
                ))}
            </ul>
        </nav>
    )
}
