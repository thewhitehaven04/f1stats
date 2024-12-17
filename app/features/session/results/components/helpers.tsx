export function formatLaptime(time: number) {
    const minutes = Math.floor(time / 60)
    const seconds = (time % 60).toFixed(3)

    if (minutes === 0) {
        return `${seconds}`
    }

    return `${minutes}:${seconds}`
}