import clsx from "clsx"

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'small' | 'normal'
}

export function Button(props: IButtonProps) {
    const { size = 'small', ...nativeButtonProps } = props

    const classNames = clsx(nativeButtonProps.className, "btn btn-neutral", {
        "btn-sm": size === 'small'
    })

    return <button {...nativeButtonProps} className={classNames} />
}
