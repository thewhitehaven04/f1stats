import { createColumnHelper } from "@tanstack/react-table"
import { use, useMemo } from "react"
import type { GetSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPostResponse } from "~/client/generated"
import { LapsTable } from "~/features/session/laps/components/LapsTable"
import { Laptime } from "~/features/session/results/components/helpers"

export interface ILapData {
    driver: string
    team: string
    data: GetSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPostResponse[number]["data"]
}

export const columnHelper = createColumnHelper<ILapData>()

export function LapComparisonTable({
    responsePromise,
}: { responsePromise: Promise<GetSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPostResponse> }) {
    const driverLaps = use(responsePromise)

    const tableColumns = useMemo(
        () =>
            driverLaps.flatMap((driver) =>
                columnHelper.group({
                    header: driver.driver,
                    columns: [
                        columnHelper.display({
                            id: `${driver.driver}.selector`,
                            cell: ({ row }) => (
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    checked={row.getIsSelected()}
                                    onChange={row.getToggleSelectedHandler()}
                                />
                            ),
                        }),
                        columnHelper.accessor("data.LapTime", {
                            header: "Laptime",
                            cell: (info) => <Laptime value={info.getValue()} />,
                        }),
                        columnHelper.accessor("data.Sector1Time", {
                            header: "Sector 1",
                            cell: (info) => <Laptime value={info.getValue()} />,
                        }),
                        columnHelper.accessor("data.ST1", {
                            header: "Speed trap 1",
                        }),
                        columnHelper.accessor("data.Sector2Time", {
                            header: "Sector 2",
                            cell: (info) => <Laptime value={info.getValue()} />,
                        }),
                        columnHelper.accessor("data.ST2", {
                            header: "Speed trap 2",
                        }),
                        columnHelper.accessor("data.Sector3Time", {
                            header: "Sector 3",
                            cell: (info) => <Laptime value={info.getValue()} />,
                        }),
                        columnHelper.accessor("data.ST3", {
                            header: "Speed trap @ FL",
                        }),
                    ],
                }),
            ),
        [driverLaps],
    )

    return <LapsTable columns={tableColumns} data={driverLaps} />
}
