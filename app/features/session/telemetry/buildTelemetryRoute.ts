import type { SessionIdentifier } from "~/client/generated"

export const buildTelemetryRoutes = (
    year: string | number,
    event: string,
    identifier: SessionIdentifier,
    lapSelection: Record<string, number[]>,
) => {
    const path = `/year/${year}/event/${event}/session/${identifier}/laps/telemetry`
    const searchParams = new URLSearchParams()
    for (const [driver, laps] of Object.entries(lapSelection)) {
        for (const lap of laps) {
            searchParams.append(driver, lap.toString())
        }
    }
    return `${path}?${searchParams}`
}
