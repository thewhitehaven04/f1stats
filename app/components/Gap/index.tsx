import { NaLabel } from "~/components/ValueOrNa"
import { formatLaptime } from "~/features/session/results/components/helpers"

export function Gap({ value }: { value: number | null }) {
    if (!value) return <NaLabel />
    return `+${formatLaptime(value)}`
}
