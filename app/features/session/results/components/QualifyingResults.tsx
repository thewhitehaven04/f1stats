import { createColumnHelper, type TableOptions } from "@tanstack/react-table"
import { use, useMemo } from 'react'
import type { GetQualifyingResultsSessionResultsQualifyingGetResponse } from "~/client/generated"
import { Laptime } from '~/features/session/results/components/helpers'
import { ResultsTable } from '~/features/session/results/components/ResultsTable'
import type { IQualifyingData } from "~/features/session/results/components/types"

const columnHelper = createColumnHelper<IQualifyingData>()

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
    columnHelper.accessor("q1Time", {
        header: () => <span>Q1 Time</span>,
        cell: (info) => <Laptime value={info.getValue()} />,
        enableSorting: true,
    }),
    columnHelper.accessor("q2Time", {
        header: () => <span>Q2 Time</span>,
        cell: (info) => <Laptime value={info.getValue()} />,
        enableSorting: true,
    }),
    columnHelper.accessor("q3Time", {
        header: () => <span>Q3 Time</span>,
        cell: (info) => <Laptime value={info.getValue()} />,
        enableSorting: true,
    }),
]

export type TQualifyingResultsTable = TableOptions<IQualifyingData>

export function getQualifyingTableDataFromResultsResponse(
    response: GetQualifyingResultsSessionResultsQualifyingGetResponse,
): IQualifyingData[] {
    return response.map((result) => ({
        countryCode: result.CountryCode,
        driver: result.Driver,
        driverNumber: result.DriverNumber,
        teamName: result.TeamName,
        q1Time: result.Q1Time,
        q2Time: result.Q2Time,
        q3Time: result.Q3Time,
    }))
}

export function QualifyingResults({
    rawResults
}: { rawResults: Promise<GetQualifyingResultsSessionResultsQualifyingGetResponse> }) {
    const results = use(rawResults)
    const data = useMemo(() => getQualifyingTableDataFromResultsResponse(results || []), [results])

    return <ResultsTable columns={columns} data={data} />
}