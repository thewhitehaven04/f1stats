import type { ScheduledEvent } from "~/client/generated"
import { EventCard } from "~/features/season/Event"

export function EventsSection(props: { events: ScheduledEvent[]; year: string }) {
    const { events, year } = props
    const testingEvents = events.filter((event) => event.EventFormat === "testing")
    const calendarEvents = events.filter((event) => event.EventFormat !== "testing")
    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-lg">Pre-Season testing</h2>
            <div className="w-full grid grid-cols-[repeat(auto-fill,_minmax(330px,_1fr))] gap-4">
                {testingEvents.map((event, index) => (
                    <EventCard key={event.EventName} {...event} RoundNumber={index + 1} year={year} />
                ))}
            </div>
            <h2 className="text-lg">Calendar events</h2>
            <div className="w-full grid grid-cols-[repeat(auto-fill,_minmax(330px,_1fr))] gap-4">
                {calendarEvents.map((event) => (
                    <EventCard key={event.EventName} {...event} year={year} />
                ))}
            </div>
        </section>
    )
}
