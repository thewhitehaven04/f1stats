import type { SessionIdentifier } from "~/client/generated"

export interface IUniqueSession extends Record<string, unknown> {
    year: string
    event: string
    session: SessionIdentifier
}
