import { createColumnHelper, type ColumnDef } from "@tanstack/react-table"
import { Laptime } from "~/features/session/results/components/helpers"
import {
    ESessionType,
    type IPracticeData,
    type IQualifyingData,
    type IRaceData,
} from "~/features/session/results/components/types"

const practiceColumnHelper = createColumnHelper<IPracticeData>()
const qualiColumnHelper = createColumnHelper<IQualifyingData>()
const raceColumnHelper = createColumnHelper<IRaceData>()

const PRACTICE_COLUMNS_DEF = [
    practiceColumnHelper.accessor("driverNumber", {
        header: () => <span>Number</span>,
        enableSorting: true,
    }),
    practiceColumnHelper.accessor("countryCode", {
        header: () => <span>Country</span>,
    }),
    practiceColumnHelper.accessor("driver", {
        header: () => <span>Driver</span>,
        enableSorting: true,
    }),
    practiceColumnHelper.accessor("teamName", {
        header: () => <span>Team</span>,
        enableSorting: true,
    }),
    practiceColumnHelper.accessor("time", {
        header: () => <span>Time</span>,
        cell: (info) => <Laptime value={info.getValue()} />,
        enableSorting: true,
    }),
    practiceColumnHelper.accessor("gap", {
        header: () => <span>Gap to leader</span>,
        cell: (info) => <Laptime value={info.getValue()} />,
        enableSorting: true,
    }),
]

const QUALI_COLUMNS_DEF = [
    qualiColumnHelper.accessor("driverNumber", {
        header: () => <span>Number</span>,
        enableSorting: true,
    }),
    qualiColumnHelper.accessor("countryCode", {
        header: () => <span>Country</span>,
    }),
    qualiColumnHelper.accessor("driver", {
        header: () => <span>Driver</span>,
        enableSorting: true,
    }),
    qualiColumnHelper.accessor("teamName", {
        header: () => <span>Team</span>,
        enableSorting: true,
    }),
    qualiColumnHelper.accessor("q1Time", {
        header: () => <span>Q1 Time</span>,
        cell: (info) => <Laptime value={info.getValue()} />,
        enableSorting: true,
    }),
    qualiColumnHelper.accessor("q2Time", {
        header: () => <span>Q2 Time</span>,
        cell: (info) => <Laptime value={info.getValue()} />,
        enableSorting: true,
    }),
    qualiColumnHelper.accessor("q3Time", {
        header: () => <span>Q3 Time</span>,
        cell: (info) => <Laptime value={info.getValue()} />,
        enableSorting: true,
    }),
]

export const RACE_COLUMNS_DEF = [
    raceColumnHelper.accessor("driverNumber", {
        header: () => <span>Number</span>,
        enableSorting: true,
    }),
    raceColumnHelper.accessor("countryCode", {
        header: () => <span>Country</span>,
    }),
    raceColumnHelper.accessor("driver", {
        header: () => <span>Driver</span>,
        enableSorting: true,
    }),
    raceColumnHelper.accessor("teamName", {
        header: () => <span>Team</span>,
        enableSorting: true,
    }),
    raceColumnHelper.accessor("gridPosition", {
        header: () => <span>Grid position</span>,
        enableSorting: true,
    }),
    raceColumnHelper.accessor("time", {
        header: () => <span>Time</span>,
        cell: (info) => <Laptime value={info.getValue()} />,
        enableSorting: true,
    }),
    raceColumnHelper.accessor("gap", {
        header: () => <span>Gap to leader</span>,
        cell: (info) => <Laptime value={info.getValue()} />,
        enableSorting: true,
    }),
    raceColumnHelper.accessor("points", {
        header: () => <span>Points</span>,
        enableSorting: true,
    }),
]

export const SESSION_TYPE_TO_RESULT_COLUMN_MAP = {
    [ESessionType.PRACTICE]: PRACTICE_COLUMNS_DEF,
    [ESessionType.QUALI_LIKE]: QUALI_COLUMNS_DEF,
    [ESessionType.RACE_LIKE]: RACE_COLUMNS_DEF,
}
