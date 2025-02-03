export type TCompound = "SOFT" | "MEDIUM" | "HARD" | "INTERMEDIATE" | "WET"

export const TYRE_COLOR_MAP: Record<TCompound, string> = {
    SOFT: "#e32526",
    MEDIUM: "#ffe826",
    HARD: "#fdfffe",
    WET: "#0e629e",
    INTERMEDIATE: "#148f37",
}
