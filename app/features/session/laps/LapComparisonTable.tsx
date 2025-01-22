import { use, useCallback, useState } from "react"
import type { DriverLapData, LapTimingData } from "~/client/generated"
import { Button } from "~/components/Button"
import { LAP_DISPLAY_TABS } from "~/features/session/laps/constants"
import type { TLapDisplayTab } from "~/features/session/laps/types"
import { Tabs } from "~/components/Tabs"
import { LapsChartView } from "~/features/session/laps/components/LapsChartView"
import { LapsTableView } from "~/features/session/laps/components/LapsTableView"

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

export interface ILapComparisonSectionProps {
    responsePromise: Promise<DriverLapData[]>
    onViewTelemetry: (selection: Record<string, number[]>) => void
    onLapSelect: (driver: string, lap: number) => void
}

export function LapComparisonSection(props: ILapComparisonSectionProps) {
    const { responsePromise, onViewTelemetry, onLapSelect } = props
    const allDriverLaps = use(responsePromise)
    const [tab, setTab] = useState<TLapDisplayTab>(LAP_DISPLAY_TABS[0].param)

    const [lapSelection, setLapSelection] = useState<Record<string, number[]>>({})

    const onLapSelectionChange = useCallback(
        (driver: string, lap: number, checked: boolean) => {
            if (checked) {
                onLapSelect(driver, lap)
            }

            setLapSelection((prevState) => {
                if (!Object.keys(prevState).includes(driver)) {
                    return { ...prevState, [driver]: [lap] }
                }

                if (prevState[driver].includes(lap)) {
                    return { ...prevState, [driver]: prevState[driver].filter((currentLap) => currentLap !== lap) }
                }

                return { ...prevState, [driver]: [...prevState[driver], lap] }
            })
        },
        [onLapSelect],
    )

    return (
        <section className="flex flex-col gap-2 overflow-x-scroll">
            <h2 className="divider divider-start text-lg">Lap by lap comparison</h2>
            <div className="flex flex-row justify-between items-center">
                <nav className="w-64">
                    <Tabs<TLapDisplayTab> tabs={LAP_DISPLAY_TABS} currentTab={tab} onTabChange={(tab) => setTab(tab)} />
                </nav>
                <div className="flex flex-row gap-4">
                    <Button
                        type="button"
                        disabled={!Object.values(lapSelection).find((value) => !!value.length)}
                        onClick={() => onViewTelemetry(lapSelection)}
                        className="w-32"
                    >
                        View telemetry
                    </Button>
                </div>
            </div>
            {tab === "table" && <LapsTableView drivers={allDriverLaps} onLapSelectionChange={onLapSelectionChange} />}
            {tab === "chart" && <LapsChartView drivers={allDriverLaps} />}
        </section>
    )
}
