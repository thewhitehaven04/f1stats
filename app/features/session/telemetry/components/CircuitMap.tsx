import { useMemo } from "react"
import type { TelemetryComparison } from "~/client/generated"
import { encodeSVGPath, SVGPathData } from "svg-pathdata"

const WIDTH = 900
const HEIGHT = 550

export function CircuitMap(props: { comparison: TelemetryComparison }) {
    const { comparison } = props

    const maxX = Math.max(...comparison.circuit_data.position_data.map((pos) => pos.X))
    const maxY = Math.max(...comparison.circuit_data.position_data.map((pos) => pos.Y))
    const [start, ...posData] = comparison.circuit_data.position_data

    const path = useMemo(() => {
        return encodeSVGPath([
            {
                type: SVGPathData.MOVE_TO,
                relative: false,
                x: (start.X / maxX) * WIDTH,
                y: (start.Y / maxY) * HEIGHT,
            },
            ...posData.map((pos) => ({
                type: SVGPathData.LINE_TO,
                relative: false,
                x: (pos.X / maxX) * WIDTH,
                y: (pos.Y / maxY) * HEIGHT,
            })),
            {
                type: SVGPathData.CLOSE_PATH,
            },
        ])
    }, [posData, start])

    return (
        <div className="w-full h-full flex justify-center items-center p-2">
            <svg width={WIDTH} height={HEIGHT} className='overflow-visible'>
                <title>Driver speed comparison</title>
                <path className="w-full h-full" d={path} fill="white" stroke="red" strokeWidth={"4"} />
            </svg>
        </div>
    )
}
