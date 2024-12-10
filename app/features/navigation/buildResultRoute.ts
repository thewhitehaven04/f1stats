import type { SessionIdentifier } from "~/client/generated"

export const buildNavigationRoute = (identifier: SessionIdentifier, year: number | string, event: string) =>
    `/year/${year}/event/${event}/session/${identifier}`
