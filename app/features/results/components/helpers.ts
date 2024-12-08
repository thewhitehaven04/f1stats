import type { GetPracticeResultsSessionResultsPracticeGetResponse } from "~/client/generated"
import type { IPracticeData } from "~/features/results/components/PracticeResults"

export const getTableDataFromResultsResponse = (
    response: GetPracticeResultsSessionResultsPracticeGetResponse,
): IPracticeData[] =>
    response.map((result) => ({
        countryCode: result.CountryCode,
        driver: result.Driver,
        driverNumber: result.DriverNumber,
        teamName: result.TeamName,
        time: result.Time,
    }))
