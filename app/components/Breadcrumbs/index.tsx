import type { ReactNode } from "react"
import { useLocation, useMatches, type UIMatch } from "react-router"
import type { IBreadcrumbProps } from "~/components/Breadcrumbs/types"

export function Breadcrumbs() {
    const matches = useMatches() as UIMatch<
        unknown,
        { breadcrumb?: (props: IBreadcrumbProps<Record<string, unknown> | undefined>) => ReactNode }
    >[]
    const search = useLocation().search

    const breadcrumbs = matches
        .map((match, index) =>
            match.handle?.breadcrumb
                ? match.handle?.breadcrumb({
                      base: match.pathname,
                      params: match.params || undefined,
                      active: !(index === matches.length - 1),
                      search: index === matches.length - 1 ? search : "",
                  })
                : null,
        )
        .filter(Boolean)

    return (
        <nav className="breadcrumbs">
            <ul>{breadcrumbs.map((crumb) => crumb)}</ul>
        </nav>
    )
}
