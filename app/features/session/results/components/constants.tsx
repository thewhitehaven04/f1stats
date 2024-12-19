import { createColumnHelper } from "@tanstack/react-table"
import {
    ESessionType,
    type IPracticeData,
    type IQualifyingData,
    type IRaceData,
} from "~/features/session/results/components/types"
import { NaLabel, ValueOrNa } from "~/components/ValueOrNa"
import { SectorTime } from "~/components/SectorTime"
import { Laptime } from "~/components/Laptime"
import { formatLaptime } from "~/features/session/results/components/helpers"
import { Gap } from '~/components/Gap'

const practiceHelper = createColumnHelper<IPracticeData>()
const qualiHelper = createColumnHelper<IQualifyingData>()
const raceHelper = createColumnHelper<IRaceData>()

const PRACTICE_COLUMNS_DEF = [
    practiceHelper.accessor("driverNumber", {
        header: () => <span>Number</span>,
        enableSorting: true,
    }),
    practiceHelper.accessor("countryCode", {
        header: () => <span>Country</span>,
    }),
    practiceHelper.accessor("driver", {
        header: () => <span>Driver</span>,
        enableSorting: true,
    }),
    practiceHelper.accessor("teamName", {
        header: () => <span>Team</span>,
        enableSorting: true,
    }),
    practiceHelper.accessor("time", {
        header: () => <span>Time</span>,
        cell: (info) => <Laptime value={info.getValue()} />,
        enableSorting: true,
    }),
    practiceHelper.accessor("gap", {
        header: () => <span>Gap to leader</span>,
        cell: (info) => <Gap value={info.getValue()} />,
        enableSorting: true,
    }),
]

const QUALI_COLUMNS_DEF = [
    qualiHelper.accessor("driverNumber", {
        header: () => <span>Number</span>,
        enableSorting: true,
    }),
    qualiHelper.accessor("countryCode", {
        header: () => <span>Country</span>,
    }),
    qualiHelper.accessor("driver", {
        header: () => <span>Driver</span>,
        enableSorting: true,
    }),
    qualiHelper.accessor("teamName", {
        header: () => <span>Team</span>,
        enableSorting: true,
    }),
    qualiHelper.accessor("q1Time", {
        header: () => <span>Q1 Time</span>,
        cell: (info) => <SectorTime value={info.getValue()} />,
        enableSorting: true,
    }),
    qualiHelper.accessor("q2Time", {
        header: () => <span>Q2 Time</span>,
        cell: (info) => <SectorTime value={info.getValue()} />,
        enableSorting: true,
    }),
    qualiHelper.accessor("q3Time", {
        header: () => <span>Q3 Time</span>,
        cell: (info) => <SectorTime value={info.getValue()} />,
        enableSorting: true,
    }),
]

export const RACE_COLUMNS_DEF = [
    raceHelper.accessor("driverNumber", {
        header: () => <span>№</span>,
        enableSorting: true,
    }),
    raceHelper.accessor("countryCode", {
        header: () => <span>Country</span>,
    }),
    raceHelper.accessor("driver", {
        header: () => <span>Driver</span>,
        enableSorting: true,
    }),
    raceHelper.accessor("teamName", {
        header: () => <span>Team</span>,
        enableSorting: true,
    }),
    raceHelper.accessor("gridPosition", {
        header: () => <span>Grid</span>,
        enableSorting: true,
    }),
    raceHelper.accessor("time", {
        header: () => <span>Time</span>,
        cell: (info) => <SectorTime value={info.getValue()} />,
        enableSorting: true,
    }),
    raceHelper.accessor("gap", {
        header: () => <span>Gap</span>,
        cell: (info) => <Gap value={info.getValue()} />,
        enableSorting: true,
    }),
    raceHelper.accessor("points", {
        header: () => <span>Points</span>,
        enableSorting: true,
    }),
    raceHelper.accessor("status", {
        header: () => <span>Classification</span>,
        cell: (info) => <ValueOrNa value={info.getValue()} />,
    }),
]

export const SESSION_TYPE_TO_RESULT_COLUMN_MAP = {
    [ESessionType.PRACTICE]: PRACTICE_COLUMNS_DEF,
    [ESessionType.QUALIFYING]: QUALI_COLUMNS_DEF,
    [ESessionType.RACE]: RACE_COLUMNS_DEF,
}