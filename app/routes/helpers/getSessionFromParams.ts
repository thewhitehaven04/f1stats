import type { SessionIdentifier } from "~/client/generated"

export interface ICurrentSession {
    year: string | undefined
    event: string | undefined
    session: SessionIdentifier | undefined
}

export function getSessionFromParams(params: { year?: string; event: string; session: string }) {
    const year = params.year ?? '2024'
    const session = params.session as SessionIdentifier

    return {
        year,
        event: params.event,
        session,
    }
}
