import clsx from "clsx"

export interface ISpeedtrapProps {
    isPersonalBest?: boolean
    isSessionBest?: boolean
    value: number
}

export function Speedtrap(props: ISpeedtrapProps) {
    return (
        <span
            className={clsx("px-2", {
                "text-green-600": !!props.isPersonalBest && !props.isSessionBest,
                "text-purple-600": !!props.isSessionBest,
                "font-medium": !!props.isPersonalBest || !!props.isSessionBest,
            })}
        >
            {props.value}
        </span>
    )
}
