import { Suspense, useState } from "react"
import type { LapSelectionData, LapTimingData } from "~/client/generated"
import { LAP_DISPLAY_TABS } from "~/features/session/laps/constants"
import type { TLapDisplayTab } from "~/features/session/laps/types"
import { Tabs } from "~/components/Tabs"
import { LinePlotTab } from "~/features/session/laps/components/LinePlotTab"
import { LapsTableTab } from "~/features/session/laps/components/LapsTableTab"
import { BoxPlotTab } from "~/features/session/laps/components/LapsBoxPlotTab"
import { LapsTableFallback } from "~/features/session/laps/components/LapsTableTab/fallback"
import { ViolinPlotTab } from '~/features/session/laps/components/ViolinPlotTab'

export interface ILapData {
    [key: `${string}.LapTime`]: LapTimingData["LapTime"]
    [key: `${string}.IsPB`]: LapTimingData["IsPB"]
    [key: `${string}.Sector1Time`]: LapTimingData["Sector1Time"]
    [key: `${string}.ST1`]: LapTimingData["ST1"]
    [key: `${string}.Sector2Time`]: LapTimingData["Sector2Time"]
    [key: `${string}.ST2`]: LapTimingData["ST2"]
    [key: `${string}.Sector3Time`]: LapTimingData["Sector3Time"]
    [key: `${string}.ST3`]: LapTimingData["ST3"]
    [key: `${string}.IsBestS1`]: LapTimingData["IsBestS1"]
    [key: `${string}.IsBestS2`]: LapTimingData["IsBestS2"]
    [key: `${string}.IsBestS3`]: LapTimingData["IsBestS3"]
    [key: `${string}.IsBestST1`]: LapTimingData["IsBestST1"]
    [key: `${string}.IsBestST2`]: LapTimingData["IsBestST2"]
    [key: `${string}.IsBestST3`]: LapTimingData["IsBestST3"]
    [key: `${string}.IsPBS1`]: LapTimingData["IsPBS1"]
    [key: `${string}.IsPBS2`]: LapTimingData["IsPBS2"]
    [key: `${string}.IsPBS3`]: LapTimingData["IsPBS3"]
    [key: `${string}.Compound`]: LapTimingData["Compound"]
}

export function LapComparisonSection(props: {
    lapSelectionDataPromise: Promise<LapSelectionData>
}) {
    const { lapSelectionDataPromise } = props
    const [tab, setTab] = useState<TLapDisplayTab>(LAP_DISPLAY_TABS[0].param)

    return (
        <section className="flex flex-col gap-2 overflow-x-scroll">
            <div className="flex flex-row items-center gap-4">
                <h2 className="divider divider-start text-lg w-full">Lap by lap comparison</h2>
            </div>
            <Tabs<TLapDisplayTab> tabs={LAP_DISPLAY_TABS} currentTab={tab} onTabChange={(tab) => setTab(tab)} />
            {tab === "table" && (
                <Suspense fallback={<LapsTableFallback />}>
                    <LapsTableTab data={lapSelectionDataPromise} />
                </Suspense>
            )}
            {tab === "plot" && <LinePlotTab data={lapSelectionDataPromise} />}
            {tab === "box" && <BoxPlotTab data={lapSelectionDataPromise} />}
            {tab === "violin" && <ViolinPlotTab data={lapSelectionDataPromise} />}
        </section>
    )
}
