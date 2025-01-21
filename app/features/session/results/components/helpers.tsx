export function formatLaptime(time: number) {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60).toString()
    const thousandths = Math.floor((time % 1) * 1000)
        .toString()
        .padStart(3, "0")

    if (minutes === 0) {
        return `${seconds}.${thousandths}`
    }
    return `${minutes}:${seconds.padStart(2, "0")}.${thousandths}`
}
