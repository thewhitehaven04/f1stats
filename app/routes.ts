import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes"

export default [
    index("routes/Landing.tsx"),
    ...prefix("year/:year", [
        layout("routes/AppLayout.tsx", [
            index("routes/Season.tsx"),
            route("event/:event/session/:session", "routes/Session/index.tsx", [
                index("routes/Session/Results/index.tsx"),
                route("laps", "routes/Session/Laps/index.tsx"),
                route("laps/telemetry", "routes/Session/Telemetry/index.tsx"),
            ]),
        ]),
    ]),
] satisfies RouteConfig
