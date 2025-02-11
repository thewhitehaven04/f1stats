import type { SessionIdentifier } from "~/client/generated"

export const buildNavigationRoute = (identifier: SessionIdentifier, year: number | string, round: number) =>
    `/year/${year}/round/${round}/session/${identifier}`
