import { createColumnHelper } from "@tanstack/react-table"
import { use, useMemo } from "react"
import { Form, useParams } from "react-router"
import type { LapSelectionData, SessionIdentifier } from "~/client/generated"
import { Laptime } from "~/components/Laptime"
import { SectorTime } from "~/components/SectorTime"
import { Speedtrap } from "~/components/Speedtrap"
import { NaLabel } from "~/components/ValueOrNa"
import { getTyreComponentByCompound } from "~/features/session/laps/components/helpers/getTyreIconByCompound"
import { mapLapsToTableLapData } from "~/features/session/laps/components/helpers/mapLapsToTableLapData"
import { usePrefetchTelemetry } from "~/features/session/laps/components/LapsTableTab/hooks/usePrefetchTelemtry"
import { LapsTable } from "~/features/session/laps/components/LapsTableTab/table"
import type { ILapData } from "~/features/session/laps/LapComparisonTable"
import { useToaster } from "~/features/toaster/hooks/useToaster"

export const columnHelper = createColumnHelper<ILapData>()

export interface ILapsTableViewProps {
    data: Promise<LapSelectionData>
}

export function LapsTableTab(props: ILapsTableViewProps) {
    const { data: promiseData } = props
    const data = use(promiseData)
    const params = useParams<{ year: string; session: SessionIdentifier; event: string }>()
    const { prefetch } = usePrefetchTelemetry()
    const toast = useToaster()

    const flattenedLaps = useMemo(() => mapLapsToTableLapData(data.driver_lap_data), [data.driver_lap_data])

    const tableColumns = useMemo(
        () => [
            columnHelper.group({
                header: "Lap",
                enablePinning: true,
                columns: [
                    columnHelper.display({
                        id: "lap",
                        cell: (cell) => cell.row.index + 1,
                    }),
                ],
            }),
            ...data.driver_lap_data.flatMap(({ driver: driverName }) =>
                columnHelper.group({
                    header: driverName,
                    id: driverName,
                    columns: [
                        columnHelper.display({
                            id: `${driverName}.selector`,
                            cell: (cell) => {
                                const lap = cell.row.index + 1
                                return (
                                    <input
                                        className="checkbox align-middle"
                                        type="checkbox"
                                        name={driverName}
                                        value={lap}
                                        onChange={() => {
                                            prefetch({ driver: driverName, lap: lap.toString() })
                                        }}
                                        disabled={!cell.row.original[`${driverName}.LapTime`]}
                                    />
                                )
                            },
                            enableHiding: false,
                        }),
                        columnHelper.accessor((row) => row[`${driverName}.LapTime`], {
                            id: `${driverName}.laptime`,
                            header: "Time",
                            cell: (info) => (
                                <Laptime
                                    value={info.getValue()}
                                    isPersonalBest={info.row.original[`${driverName}.IsPB`] === true || undefined}
                                    className="py-1"
                                />
                            ),
                        }),
                        columnHelper.accessor((row) => row[`${driverName}.Sector1Time`], {
                            id: `${driverName}.sector1`,
                            header: "S1",
                            cell: (info) => (
                                <SectorTime
                                    value={info.getValue()}
                                    isSessionBest={info.row.original[`${driverName}.IsBestS1`]}
                                    isPersonalBest={info.row.original[`${driverName}.IsPBS1`]}
                                />
                            ),
                        }),
                        columnHelper.accessor((row) => row[`${driverName}.ST1`], {
                            id: `${driverName}.ST1`,
                            header: "ST1",
                            cell: (info) => (
                                <Speedtrap
                                    value={info.getValue()}
                                    isSessionBest={info.row.original[`${driverName}.IsBestST1`]}
                                />
                            ),
                        }),
                        columnHelper.accessor((row) => row[`${driverName}.Sector2Time`], {
                            id: `${driverName}.sector2`,
                            header: "S2",
                            cell: (info) => (
                                <SectorTime
                                    value={info.getValue()}
                                    isSessionBest={info.row.original[`${driverName}.IsBestS2`]}
                                    isPersonalBest={info.row.original[`${driverName}.IsPBS2`]}
                                />
                            ),
                        }),
                        columnHelper.accessor((row) => row[`${driverName}.ST2`], {
                            id: `${driverName}.ST2`,
                            header: "ST2",
                            cell: (info) => (
                                <Speedtrap
                                    value={info.getValue()}
                                    isSessionBest={info.row.original[`${driverName}.IsBestST2`]}
                                />
                            ),
                        }),
                        columnHelper.accessor((row) => row[`${driverName}.Sector3Time`], {
                            id: `${driverName}.sector3`,
                            header: "S3",
                            cell: (info) => (
                                <SectorTime
                                    value={info.getValue()}
                                    isSessionBest={info.row.original[`${driverName}.IsBestS3`]}
                                    isPersonalBest={info.row.original[`${driverName}.IsPBS3`]}
                                />
                            ),
                        }),
                        columnHelper.accessor((row) => row[`${driverName}.ST3`], {
                            id: `${driverName}.ST3`,
                            header: "FL",
                            cell: (info) => (
                                <Speedtrap
                                    value={info.getValue()}
                                    isSessionBest={info.row.original[`${driverName}.IsBestST3`]}
                                />
                            ),
                        }),
                        columnHelper.accessor((row) => row[`${driverName}.Compound`], {
                            id: `${driverName}.Compound`,
                            header: "Tyre",
                            cell: (info) => {
                                const Icon = getTyreComponentByCompound(info.getValue())
                                return Icon ? (
                                    <div className="w-full flex flex-row justify-center">
                                        <Icon className="w-8" />
                                    </div>
                                ) : (
                                    <NaLabel />
                                )
                            },
                        }),
                    ],
                }),
            ),
        ],
        [data.driver_lap_data, prefetch],
    )

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        const isEmptySubmission = new FormData(evt.currentTarget).values().next().done
        if (isEmptySubmission) {
            evt.preventDefault()
            toast("Please, select at least one lap to view telemetry")
        }
    }

    return (
        <Form
            method="get"
            action={`/year/${params.year}/event/${params.event}/session/${params.session}/laps/telemetry`}
            onSubmit={handleSubmit}
        >
            <LapsTable
                columns={tableColumns}
                data={flattenedLaps}
                initialState={{
                    columnVisibility: data.driver_lap_data.reduce<Record<string, boolean>>((curr, { driver }) => {
                        curr[`${driver}.ST1`] = false
                        curr[`${driver}.ST2`] = false
                        curr[`${driver}.ST3`] = false

                        return curr
                    }, {}),
                }}
                toolbar={
                    <button type="submit" className="btn btn-sm">
                        View telemetry
                    </button>
                }
            />
        </Form>
    )
}
