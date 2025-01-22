import { NaLabel } from "~/components/ValueOrNa"
import { formatTime } from "~/features/session/results/components/helpers"

export function Gap({ value }: { value: number | null }) {
    if (!value) return <NaLabel />
    return `+${formatTime(value)}`
}
