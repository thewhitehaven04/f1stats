import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes"

export default [
    layout("routes/Layout.tsx", [
        index("routes/Application.tsx"),
        ...prefix("year/:year", [
            route("event/:event/session/:session", "routes/Session/index.tsx", [
                index("routes/Session/Results/index.tsx"),
                route("laps", "routes/Session/Laps/index.tsx"),
                route("laps/telemetry", "routes/Session/Telemetry/index.tsx"),
            ]),
        ]),
    ]),
] satisfies RouteConfig
