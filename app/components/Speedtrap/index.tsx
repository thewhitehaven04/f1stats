import clsx from "clsx"
import { NaLabel } from '~/components/ValueOrNa'

export interface ISpeedtrapProps {
    isPersonalBest?: boolean
    isSessionBest?: boolean
    withUnit?: boolean
    value: number
}

export function Speedtrap(props: ISpeedtrapProps) {
    return (
        <span
            className={clsx("px-1", {
                "text-personal-best": !!props.isPersonalBest && !props.isSessionBest,
                "text-best": !!props.isSessionBest,
                "font-medium": !!props.isPersonalBest || !!props.isSessionBest,
            })}
        >
            {props.value || <NaLabel/>}
            {props.withUnit && (
                <>
                    {" "}
                    <span>kph</span>
                </>
            )}
        </span>
    )
}
