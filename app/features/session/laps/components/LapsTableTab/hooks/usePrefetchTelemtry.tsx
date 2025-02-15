import { useQueryClient } from "@tanstack/react-query"
import { useCallback } from 'react'
import { useParams } from "react-router"
import { ApiClient } from "~/client"
import {
    getSessionLapDriverTelemetrySeasonYearRoundRoundNumberSessionSessionIdentifierLapLapDriverDriverTelemetryGet,
    type SessionIdentifier,
} from "~/client/generated"
import { getLapTelemetryQueryKey } from "~/features/session/laps/queries"

export function usePrefetchTelemetry() {
    const queryClient = useQueryClient()
    const params = useParams<{ year: string; round: string; session: SessionIdentifier }>()
    const prefetch = useCallback(
        ({ driver, lap }: { driver: string; lap: string }) =>
            queryClient.prefetchQuery({
                queryKey: getLapTelemetryQueryKey({
                    session: params.session as SessionIdentifier,
                    round: params.round || "",
                    year: params.year || "",
                    driver,
                    lap,
                }),
                queryFn: () =>
                    getSessionLapDriverTelemetrySeasonYearRoundRoundNumberSessionSessionIdentifierLapLapDriverDriverTelemetryGet(
                        {
                            throwOnError: true,
                            client: ApiClient,
                            path: {
                                driver,
                                lap,
                                round_number: params.round || "",
                                year: params.year || "",
                                session_identifier: params.session as SessionIdentifier,
                            },
                        },
                    ).then((response) => response.data),
                staleTime: Number.POSITIVE_INFINITY,
            }),
        [params, queryClient],
    )

    return { prefetch }
}
