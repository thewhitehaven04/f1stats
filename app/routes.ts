import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes"

export default [
    ...prefix("year?/:year?", [
        layout("./routes/Layout.tsx", [
            index("./routes/App.tsx"),
            route("event/:event/session/Practice/:number", "./routes/sessions/Practice.tsx"),
        ]),

    ]),
] satisfies RouteConfig
