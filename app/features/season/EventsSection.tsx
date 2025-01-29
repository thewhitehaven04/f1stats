import type { ScheduledEvent } from "~/client/generated"
import { EventCard } from "~/features/season/Event"

export function EventsSection(props: { events: ScheduledEvent[]; year: string }) {
    const { events, year } = props
    return (
        <section className="w-full grid grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-4">
            {events.map((event) => (
                <EventCard key={event.EventName} {...event} year={year} />
            ))}
        </section>
    )
}
