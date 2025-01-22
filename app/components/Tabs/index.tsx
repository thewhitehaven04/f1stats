import clsx from "clsx"
import type { ITabsProps } from "~/components/Tabs/types"

export function Tabs<T extends string>(props: ITabsProps<T>) {
    const { className, tabs, currentTab, onTabChange, ...rest } = props

    return (
        <div role="tablist" className="tabs" {...rest}>
            {tabs.map((tab) => (
                <button
                    key={tab.param}
                    role="tab"
                    type="button"
                    className={clsx("tab", className, {
                        "tab-active": currentTab === tab.param,
                    })}
                    onClick={() => onTabChange(tab.param)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    )
}
