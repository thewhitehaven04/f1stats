import clsx from "clsx"
import { use, useMemo, useState } from "react"
import type {
    GetPracticeResultsSessionResultsPracticeGetResponse,
    GetQualifyingResultsSessionResultsQualifyingGetResponse,
    GetRaceResultsSessionResultsRaceGetResponse,
} from "~/client/generated"
import { SESSION_TYPE_TO_RESULT_COLUMN_MAP } from "~/features/session/results/components/constants"
import { ResultsTable } from "~/features/session/results/components/ResultsTable"
import { ESessionType } from "~/features/session/results/components/types"

export type TResultSectionData =
    | {
          type: ESessionType.PRACTICE
          resultsPromise: Promise<GetPracticeResultsSessionResultsPracticeGetResponse>
      }
    | {
          type: ESessionType.QUALI_LIKE
          resultsPromise: Promise<GetQualifyingResultsSessionResultsQualifyingGetResponse>
      }
    | {
          type: ESessionType.RACE_LIKE
          resultsPromise: Promise<GetRaceResultsSessionResultsRaceGetResponse>
      }

export interface IResultsSectionProps {
    data: TResultSectionData
    onViewLaps: (drivers: string[]) => void
}

export function ResultsSection({ onViewLaps, data }: IResultsSectionProps) {
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
    const btnClasses = clsx("btn btn-sm btn-outline", {
        invisible: !Object.values(rowSelection).find((value) => value),
    })

    const tableData = useMemo(() => {
        if (data.type === ESessionType.QUALI_LIKE) {
            return use(data.resultsPromise).map((result) => ({
                countryCode: result.CountryCode,
                driver: result.Driver,
                driverNumber: result.DriverNumber,
                teamName: result.TeamName,
                q1Time: result.Q1Time,
                q2Time: result.Q2Time,
                q3Time: result.Q3Time,
            }))
        }

        if (data.type === ESessionType.RACE_LIKE) {
            return use(data.resultsPromise).map((result) => ({
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

        if (data.type === ESessionType.PRACTICE) {
            return use(data.resultsPromise).map((result) => ({
                countryCode: result.CountryCode,
                driver: result.Driver,
                driverNumber: result.DriverNumber,
                teamName: result.TeamName,
                time: result.Time,
                gap: result.Gap,
            }))
        }
    }, [data])

    return (
        <div className="flex flex-col gap-2">
            <button
                type="button"
                className={btnClasses}
                onClick={() =>
                    onViewLaps(
                        Object.entries(rowSelection)
                            .filter((selection) => selection[1])
                            .map((selection) => selection[0]),
                    )
                }
            >
                View laps
            </button>
            <ResultsTable
                data={tableData}
                columns={SESSION_TYPE_TO_RESULT_COLUMN_MAP[data.type]}
                onRowSelectionChange={setRowSelection}
            />
        </div>
    )
}
