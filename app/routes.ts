import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes"

export default [
    ...prefix("year/:year", [
        layout("./routes/Layout.tsx", [
            index("./routes/App.tsx"),
            route("event/:event/session/:session", "./routes/Session.tsx"),
            route("event/:event/session/:session/laps", "./routes/Laps.tsx"),
            route('event/:event/session/:session/laps/telemetry', "./routes/Telemetry/index.tsx"),
        ]),
    ]),
] satisfies RouteConfig
