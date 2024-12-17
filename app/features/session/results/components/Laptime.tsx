import { formatLaptime } from "~/features/session/results/components/helpers"

export const Laptime = ({
    value,
    isSessionBest = false,
    isPersonalBest = false,
    isAdvantage = false,
}: { value: number | null; isPersonalBest?: boolean; isSessionBest?: boolean; isAdvantage?: boolean }) => (
    <span className={isAdvantage ? "text-success" : "text-gray-700"}>{value ? formatLaptime(value) : "N/A"}</span>
)
