import { createColumnHelper, type TableOptions } from "@tanstack/react-table"
import { use, useMemo } from "react"
import type { GetPracticeResultsSessionResultsPracticeGetResponse } from "~/client/generated"
import { Laptime } from '~/features/session/results/components/helpers'
import { ResultsTable } from "~/features/session/results/components/ResultsTable"
import type { IPracticeData } from "~/features/session/results/components/types"

const columnHelper = createColumnHelper<IPracticeData>()

const columns = [
    columnHelper.accessor("driverNumber", {
        header: () => <span>Number</span>,
        enableSorting: true,
    }),
    columnHelper.accessor("countryCode", {
        header: () => <span>Country</span>,
    }),
    columnHelper.accessor("driver", {
        header: () => <span>Driver</span>,
        enableSorting: true,
    }),
    columnHelper.accessor("teamName", {
        header: () => <span>Team</span>,
        enableSorting: true,
    }),
    columnHelper.accessor("time", {
        header: () => <span>Time</span>,
        cell: (info) => <Laptime value={info.getValue()} />,
        enableSorting: true,
    }),
    columnHelper.accessor("gap", {
        header: () => <span>Gap to leader</span>,
        cell: (info) => <Laptime value={info.getValue()} />,
        enableSorting: true,
    }),
]

export type TPracticeResultsTable = TableOptions<IPracticeData>

export function getPracticeTableDataFromResultsResponse(
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

export function PracticeResults({
    rawResults,
}: { rawResults: Promise<GetPracticeResultsSessionResultsPracticeGetResponse> }) {
    const results = use(rawResults)
    const data = useMemo(() => getPracticeTableDataFromResultsResponse(results || []), [results])

    return <ResultsTable columns={columns} data={data} />
}
