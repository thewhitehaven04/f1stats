import type { SessionIdentifier } from '~/client/generated'

export const buildResultRoute = (identifier: SessionIdentifier, year: number | string, event: string) => {
    const isPractice = identifier.includes("Practice")

    if (isPractice) {
        const practiceNumber = identifier.split(" ")[1]
        return `/year/${year}/event/${event}/session/Practice/${practiceNumber}`
    }

    if (identifier === 'Qualifying') {
        return `/year/${year}/event/${event}/session/Qualifying/classic`
    }

    if (identifier === 'Sprint Qualifying') {
        return `/year/${year}/event/${event}/session/Qualifying/sprint`
    }

    if (identifier === 'Sprint') {
        return `/year/${year}/event/${event}/session/Sprint`
    }

    return `/year/${year}/event/${event}/session/Race`
}