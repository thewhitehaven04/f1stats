import type { SessionIdentifier } from "~/client/generated"

export const getLapTelemetryQueryKey = ({
    year,
    event,
    session,
    driver,
    lap,
}: { year: string; event: string; session: SessionIdentifier; driver: string; lap: number }) => {
    return ["LapTelemetry", year, event, session, driver, lap]
}
