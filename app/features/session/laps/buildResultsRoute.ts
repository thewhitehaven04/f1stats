import type { SessionIdentifier } from "~/client/generated"

export const buildLapsRoute = (
    year: string | number,
    event: string,
    identifier: SessionIdentifier,
    drivers: string[],
) => {
    const path = `/year/${year}/event/${event}/session/${identifier}/laps`
    const searchParams = new URLSearchParams()
    searchParams.set("drivers", new URLSearchParams(drivers.map((driver) => ["drivers", driver])).toString())
    return `${path}?${searchParams}`
}
