import type { TelemetryRequest } from '~/client/generated'

export function buildQueries(search: URLSearchParams): TelemetryRequest[] {
    const queries: TelemetryRequest[] = []
    for (const [driver, lap] of search.entries()) {
        const exisitingQuery = queries.find((query) => query.driver === driver)
        if (exisitingQuery) {
            exisitingQuery.lap_filter?.push(Number.parseInt(lap))
        } else {
            queries.push({
                driver,
                lap_filter: [Number.parseInt(lap)],
            })
        }
    }

    return queries
}