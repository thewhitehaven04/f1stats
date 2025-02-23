import type { SessionIdentifier } from "~/client/generated"

export interface IUniqueSession extends Record<string, unknown> {
    year: string
    round: string
    session: SessionIdentifier
}