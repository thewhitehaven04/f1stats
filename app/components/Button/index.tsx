import clsx from "clsx"

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size: 'small' | 'normal'
}

export function Button(props: IButtonProps) {
    const { size, ...nativeButtonProps } = props

    const classNames = clsx(nativeButtonProps.className, "btn btn-outline", {
        "btn-sm": size === 'small'
    })

    return <button {...nativeButtonProps} className={classNames} />
}
