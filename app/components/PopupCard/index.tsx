import clsx from "clsx"
import type React from "react"

export function PopupCard(
    props: {
        children?: React.ReactNode
        actions?: React.ReactNode
        title?: React.ReactNode | string
        onClose: () => void
    } & React.HTMLAttributes<HTMLDivElement>,
) {
    const { className, children, actions, title, onClose, ...rest } = props
    return (
        <div
            className={clsx(
                "card card-compact bg-base-100 border-2 border-neutral-100 border-solid shadow-xl absolute top-10 left-0 min-w-40",
                className,
            )}
            {...rest}
        >
            <div className="flex flex-row justify-end py-1 px-2">
                <button type="button" onClick={onClose}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        class="inline-block h-4 w-4 stroke-current"
                    >
                        <title>Close</title>
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
            <div className='card-title px-2'>{title}</div>
            <div className="card-body">
                {children}
                <div className="card-actions">{actions}</div>
            </div>
        </div>
    )
}
