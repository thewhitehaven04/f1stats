import clsx from "clsx"
import { NaLabel } from "~/components/ValueOrNa"
import { formatLaptime } from "~/features/session/results/components/helpers"

export interface ILaptimeProps {
    isPersonalBest?: boolean
    isSessionBest?: boolean
    value: number | null | undefined
    inline?: boolean
}

export function Laptime(props: ILaptimeProps) {
    return (
        <div
            className={clsx("rounded-md", {
                "bg-green-300": props.isPersonalBest && !props.isSessionBest,
                "bg-purple-300": props.isSessionBest,
                "px-2 py-2": !props.inline,
                "px-1 py-1": props.inline
            })}
        >
            {props.value ? formatLaptime(props.value) : <NaLabel />}
        </div>
    )
}
