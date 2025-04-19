import { type RouteConfig, index, layout, route } from "@react-router/dev/routes"

export default [
    index("routes/Landing.tsx"),
    route("year/:year", "routes/Year.tsx", [
        layout("routes/AppLayout.tsx", [
            index("routes/Season.tsx"),
            route("round/:round/session/:session", "routes/Session/index.tsx", [
                index("routes/Session/Results/index.tsx"),
                route("laps", "routes/Session/Results/Laps.tsx"),
                route("laps/telemetry", "routes/Session/Results/Telemetry/index.tsx"),
            ]),
            route("testingRound/:round/day/:day", "routes/TestingSession/index.tsx", [
                index("routes/TestingSession/Results/index.tsx"),
                route("laps", "routes/TestingSession/Results/Laps.tsx"),
                route("laps/telemetry", "routes/TestingSession/Results/Telemetry/index.tsx"),
            ]),
        ]),
    ]),
] satisfies RouteConfig
