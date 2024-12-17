export function formatLaptime(time: number) {
    const minutes = Math.floor(time / 60)
    const seconds = Math.ceil(time % 60).toString().padStart(2, "0")
    const thousandths = Math.ceil((time % 1) * 1000).toString().padStart(3, "0")

    if (minutes === 0) {
        return `${seconds}.${thousandths}`
    }
    return `${minutes}:${seconds}.${thousandths}`
}
