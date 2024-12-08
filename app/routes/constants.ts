const FIRST_SEASON = 2018
const currentYear = new Date().getFullYear()

export const SUPPORTED_SEASONS = Array.from({ length: currentYear - FIRST_SEASON + 1 }, (_, i) => i + FIRST_SEASON)
