import clsx from "clsx"
import { NaLabel } from "~/components/ValueOrNa"
import { formatLaptime } from "~/features/session/results/components/helpers"

export interface ILaptimeProps {
    isPersonalBest?: boolean
    isSessionBest?: boolean
    value: number | null | undefined
}

export function Laptime(props: ILaptimeProps) {
    return (
        <div
            className={clsx("px-2 py-2 rounded-md",{
                "bg-green-300": props.isPersonalBest && !props.isSessionBest,
                "bg-purple-300": props.isSessionBest,
            })}
        >
            {props.value ? formatLaptime(props.value) : <NaLabel />}
        </div>
    )
}
