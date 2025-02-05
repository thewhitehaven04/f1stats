import { use, useMemo } from "react"
import { Form, useParams } from "react-router"
import type {
    GetPracticeResultsSessionResultsPracticeGetResponse,
    GetQualifyingResultsSessionResultsQualilikeGetResponse,
    GetRacelikeResultsSessionResultsRacelikeGetResponse,
    SessionIdentifier,
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
          results: Promise<GetQualifyingResultsSessionResultsQualilikeGetResponse>
      }
    | {
          type: ESessionType.RACE
          results: Promise<GetRacelikeResultsSessionResultsRacelikeGetResponse>
      }

export function ResultsSection({ data }: { data: TResultSectionData }) {
    const params = useParams<{ year: string; event: string; session: SessionIdentifier }>()
    const results = useMemo(() => {
        if (data.type === ESessionType.QUALIFYING) {
            return {
                rows: use(data.results).map((result) => ({
                    driver: { name: result.Driver, country: result.CountryCode },
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
                    driver: { name: result.Driver, country: result.CountryCode },
                    driverNumber: result.DriverNumber,
                    teamName: result.TeamName,
                    gridPosition: result.GridPosition,
                    time: result.Time,
                    gap: result.Gap,
                    points: result.Points,
                    status: result.Status,
                })),
                columns: SESSION_TYPE_TO_RESULT_COLUMN_MAP[data.type],
            }
        }

        return {
            rows: use(data.results).map((result) => ({
                driver: { name: result.Driver, country: result.CountryCode },
                driverNumber: result.DriverNumber,
                teamName: result.TeamName,
                time: result.Time,
                gap: result.Gap,
            })),
            columns: SESSION_TYPE_TO_RESULT_COLUMN_MAP[data.type],
        }
    }, [data])

    return (
        <section className="flex flex-col gap-2 w-full overflow-x-scroll">
            <h2 className="divider divider-start text-lg">Results</h2>
            <Form
                method="get"
                action={`/year/${params.year}/event/${params.event}/session/${params.session}/laps`}
                className="w-full flex flex-col items-end gap-2"
            >
                <ResultsTable {...results} />
            </Form>
        </section>
    )
}
