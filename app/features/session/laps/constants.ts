import type { ITab } from '~/components/Tabs/types'
import type { TLapDisplayTab } from '~/features/session/laps/types'


export const LAP_DISPLAY_TABS: ITab<TLapDisplayTab>[] = [
    {
        label: "Table",
        param: "table",
    },
    {
        label: "Chart",
        param: "chart",
    },
]
