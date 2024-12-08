import { type RouteConfig, route } from "@react-router/dev/routes"

export default [route("year?/:year?", "./routes/app.tsx", [
    route('event?/:eventName?/session?/:sessionType?', "./routes/eventSession.tsx"),
])] satisfies RouteConfig
