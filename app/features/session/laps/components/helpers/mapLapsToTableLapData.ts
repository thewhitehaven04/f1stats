import type { DriverLapData } from "~/client/generated"
import type { ILapData } from "~/features/session/laps/LapComparison"

export function mapLapsToTableLapData(laps: DriverLapData[]): ILapData[] {
    const flattenedLaps: ILapData[] = []

    for (const driver of laps) {
        driver.laps.forEach((lap, index) => {
            if (!flattenedLaps[index]) {
                flattenedLaps[index] = {}
            }

            flattenedLaps[index][`${driver.driver}.LapTime`] = lap.LapTime
            flattenedLaps[index][`${driver.driver}.IsPB`] = lap.IsPB
            flattenedLaps[index][`${driver.driver}.Sector1Time`] = lap.Sector1Time
            flattenedLaps[index][`${driver.driver}.ST1`] = lap.ST1
            flattenedLaps[index][`${driver.driver}.Sector2Time`] = lap.Sector2Time
            flattenedLaps[index][`${driver.driver}.ST2`] = lap.ST2
            flattenedLaps[index][`${driver.driver}.Sector3Time`] = lap.Sector3Time
            flattenedLaps[index][`${driver.driver}.ST3`] = lap.ST3
            flattenedLaps[index][`${driver.driver}.IsBestS1`] = lap.IsBestS1
            flattenedLaps[index][`${driver.driver}.IsBestS2`] = lap.IsBestS2
            flattenedLaps[index][`${driver.driver}.IsBestS3`] = lap.IsBestS3
            flattenedLaps[index][`${driver.driver}.IsBestST1`] = lap.IsBestST1
            flattenedLaps[index][`${driver.driver}.IsBestST2`] = lap.IsBestST2
            flattenedLaps[index][`${driver.driver}.IsBestST3`] = lap.IsBestST3
            flattenedLaps[index][`${driver.driver}.IsPBS1`] = lap.IsPBS1
            flattenedLaps[index][`${driver.driver}.IsPBS2`] = lap.IsPBS2
            flattenedLaps[index][`${driver.driver}.IsPBS3`] = lap.IsPBS3
            flattenedLaps[index][`${driver.driver}.Compound`] = lap.Compound
        })
    }

    return flattenedLaps
}
