import type { Route } from ".react-router/types/app/routes/Session/Results/+types"
import type { ColumnDef } from "@tanstack/react-table"
import { use, useMemo } from "react"
import { Form, useParams } from "react-router"
import type { SessionIdentifier } from "~/client/generated"
import { SESSION_TYPE_TO_RESULT_COLUMN_MAP } from "~/features/session/results/components/constants"
import { ResultsTable } from "~/features/session/results/components/ResultsTable"
import { ESessionType } from "~/features/session/results/components/types"

export function ResultsSection(props: Route.ComponentProps["loaderData"]) {
    const { results, type } = props
    const params = useParams<{ year: string; round: string; session: SessionIdentifier }>()
    const data = useMemo(() => {
        switch (type) {
            case ESessionType.PRACTICE:
                return {
                    rows: use(results).map((result) => ({
                        driver: { name: result.Driver, country: result.CountryCode },
                        driverNumber: result.DriverNumber,
                        teamName: result.TeamName,
                        laptime: result.Time_,
                        gap: result.Gap,
                    })),
                    columns: SESSION_TYPE_TO_RESULT_COLUMN_MAP[ESessionType.PRACTICE],
                } as const
            case ESessionType.RACE:
                return {
                    rows: use(results).map((result) => ({
                        driver: { name: result.Driver, country: result.CountryCode },
                        driverNumber: result.DriverNumber,
                        teamName: result.TeamName,
                        gridPosition: result.GridPosition,
                        time: result.Time,
                        gap: result.Gap,
                        points: result.Points,
                        status: result.Status,
                    })),
                    columns: SESSION_TYPE_TO_RESULT_COLUMN_MAP[ESessionType.RACE],
                } as const
            default:
                return {
                    rows: use(results).map((result) => ({
                        driver: { name: result.Driver, country: result.CountryCode },
                        driverNumber: result.DriverNumber,
                        teamName: result.TeamName,
                        q1Time: result.Q1Time,
                        q2Time: result.Q2Time,
                        q3Time: result.Q3Time,
                    })),
                    columns: SESSION_TYPE_TO_RESULT_COLUMN_MAP[ESessionType.QUALIFYING],
                } as const
        }
    }, [type, results])

    return (
        <section className="flex flex-col gap-2 w-full overflow-x-scroll">
            <h2 className="divider divider-start text-lg">Results</h2>
            <Form
                method="get"
                action={`/year/${params.year}/round/${params.round}/session/${params.session}/laps`}
                className="w-full flex flex-col items-end gap-2"
            >
                <ResultsTable rows={data.rows} columns={data.columns as ColumnDef<(typeof data)["rows"][number]>[]} />
            </Form>
        </section>
    )
}
