import { createColumnHelper } from "@tanstack/react-table"
import { use, useMemo } from "react"
import type { GetRaceResultsSessionResultsRaceGetResponse } from "~/client/generated"
import { Laptime } from "~/features/session/results/components/helpers"
import { ResultsTable } from "~/features/session/results/components/ResultsTable"
import type { IRaceData } from "~/features/session/results/components/types"

const columnHelper = createColumnHelper<IRaceData>()

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
    columnHelper.accessor("gridPosition", {
        header: () => <span>Grid position</span>,
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
    columnHelper.accessor("points", {
        header: () => <span>Points</span>,
        enableSorting: true,
    }),
]

function getRaceTableDataFromResultsResponse(response: GetRaceResultsSessionResultsRaceGetResponse): IRaceData[] {
    return response.map((result) => ({
        countryCode: result.CountryCode,
        driver: result.Driver,
        driverNumber: result.DriverNumber,
        teamName: result.TeamName,
        gridPosition: result.GridPosition,
        time: result.Time,
        gap: result.Gap,
        points: result.Points,
    }))
}

export function RaceResults({ rawResults }: { rawResults: Promise<GetRaceResultsSessionResultsRaceGetResponse> }) {
    const results = use(rawResults)
    const data = useMemo(() => getRaceTableDataFromResultsResponse(results || []), [results])

    return <ResultsTable columns={columns} data={results} />
}
