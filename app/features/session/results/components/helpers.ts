import type { GetPracticeResultsSessionResultsPracticeGetResponse } from "~/client/generated"
import type { IPracticeData } from "~/features/results/components/PracticeResults"

export function getTableDataFromResultsResponse(
    response: GetPracticeResultsSessionResultsPracticeGetResponse,
): IPracticeData[] {
    return response.map((result) => ({
        countryCode: result.CountryCode,
        driver: result.Driver,
        driverNumber: result.DriverNumber,
        teamName: result.TeamName,
        time: result.Time,
        gap: result.Gap,
    }))
}

export function formatLaptime(time: number) {
    const minutes = Math.floor(time / 60)
    const seconds = (time % 60).toFixed(3)

    if (minutes === 0) {
        return `${seconds}`
    }

    return `${minutes}:${seconds}`
}
