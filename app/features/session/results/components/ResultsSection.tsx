import clsx from "clsx"
import { use, useMemo, useState } from "react"
import type {
    GetPracticeResultsSessionResultsPracticeGetResponse,
    GetQualifyingResultsSessionResultsQualifyingGetResponse,
    GetSprintResultsSessionResultsSprintGetResponse,
} from "~/client/generated"
import { SESSION_TYPE_TO_RESULT_COLUMN_MAP } from "~/features/session/results/components/constants"
import { ResultsTable } from "~/features/session/results/components/ResultsTable"
import { ESessionType } from "~/features/session/results/components/types"

export type TResultSectionData =
    | {
          type: ESessionType.PRACTICE
          results: Promise<GetPracticeResultsSessionResultsPracticeGetResponse>
      }
    | {
          type: ESessionType.QUALIFYING
          results: Promise<GetQualifyingResultsSessionResultsQualifyingGetResponse>
      }
    | {
          type: ESessionType.RACE
          results: Promise<GetSprintResultsSessionResultsSprintGetResponse>
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

    const results = useMemo(() => {
        if (data.type === ESessionType.QUALIFYING) {
            return {
                rows: use(data.results).map((result) => ({
                    countryCode: result.CountryCode,
                    driver: result.Driver,
                    driverNumber: result.DriverNumber,
                    teamName: result.TeamName,
                    q1Time: result.Q1Time,
                    q2Time: result.Q2Time,
                    q3Time: result.Q3Time,
                })),
                columns: SESSION_TYPE_TO_RESULT_COLUMN_MAP[data.type],
            }
        }

        if (data.type === ESessionType.RACE) {
            return {
                rows: use(data.results).map((result) => ({
                    countryCode: result.CountryCode,
                    driver: result.Driver,
                    driverNumber: result.DriverNumber,
                    teamName: result.TeamName,
                    gridPosition: result.GridPosition,
                    time: result.Time,
                    gap: result.Gap,
                    points: result.Points,
                })),
                columns: SESSION_TYPE_TO_RESULT_COLUMN_MAP[data.type],
            }
        }

        return {
            rows: use(data.results).map((result) => ({
                countryCode: result.CountryCode,
                driver: result.Driver,
                driverNumber: result.DriverNumber,
                teamName: result.TeamName,
                time: result.Time,
                gap: result.Gap,
            })),
            columns: SESSION_TYPE_TO_RESULT_COLUMN_MAP[data.type],
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
                {...results}
                onRowSelectionChange={setRowSelection}
                rowSelectionState={rowSelection}
            />
        </div>
    )
}
