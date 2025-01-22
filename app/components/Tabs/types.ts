import type { HTMLAttributes } from "react"

export interface ITabProps<T> extends HTMLAttributes<HTMLButtonElement> {
    label: string
    param: T 
}

export interface ITabsProps<T> extends HTMLAttributes<HTMLDivElement> {
    currentTab: string
    tabs: ITabProps<T>[]
    onTabChange: (tab: T) => void
}
