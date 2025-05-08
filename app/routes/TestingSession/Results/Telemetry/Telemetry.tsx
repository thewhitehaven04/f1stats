import type { Route } from '.react-router/types/app/routes/TestingSession/Results/Telemetry/+types'
import { lazy, Suspense } from "react"
import { useLoaderData } from "react-router"
import { TimeDeltaComparison } from "~/features/session/telemetry/components/ChartSection/comparison"
import { TelemetryChartFallback } from "~/features/session/telemetry/components/ChartSection/fallback"
import { LaptimeSectionFallback } from "~/features/session/telemetry/components/fallback"
import { TelemetryLaptimeSection } from "~/features/session/telemetry/components/LaptimeSection"

const TelemetryChartSection = lazy(() => import("~/features/session/telemetry/components/ChartSection/index"))
export default function Telemetry() {
    const { loaderData } = useLoaderData<Route.ComponentProps>()
    return (
        <>
            <Suspense fallback={<LaptimeSectionFallback />}>
                <TelemetryLaptimeSection laps={loaderData.laps} />
            </Suspense>
            <Suspense fallback={<TelemetryChartFallback height={90} sectionTitle="Speed trace" />}>
                <TelemetryChartSection
                    telemetry={loaderData.telemetry}
                    telemetryComparisonSlot={
                        <Suspense fallback={<TelemetryChartFallback height={50} sectionTitle="Time delta" />}>
                            <TimeDeltaComparison comparison={loaderData.telemetryComparison} />
                        </Suspense>
                    }
                />
            </Suspense>
        </>
    )
}
