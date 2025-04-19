import type { Route } from '.react-router/types/app/routes/Session/Results/Telemetry/+types'
import { Suspense } from "react"
import { useLoaderData } from "react-router"
import { TelemetryChartSection } from "~/features/session/telemetry/components/ChartSection"
import { TimeDeltaComparison } from "~/features/session/telemetry/components/ChartSection/comparison"
import { TelemetryChartFallback } from "~/features/session/telemetry/components/ChartSection/fallback"
import { LaptimeSectionFallback } from "~/features/session/telemetry/components/fallback"
import { TelemetryLaptimeSection } from "~/features/session/telemetry/components/LaptimeSection"

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
