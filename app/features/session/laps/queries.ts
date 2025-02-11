import type { SessionIdentifier } from "~/client/generated"

export const getLapTelemetryQueryKey = ({
    year,
    round,
    session,
    driver,
    lap,
}: { year: string; round: string; session: SessionIdentifier; driver: string; lap: string }) => {
    return ["LapTelemetry", year, round, session, driver, lap]
}
