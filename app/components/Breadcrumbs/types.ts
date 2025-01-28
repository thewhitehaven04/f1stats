export interface IBreadcrumbItem {
    text: string
    path: string
}

export interface IBreadcrumbProps<TParams extends Record<string, unknown> | undefined = undefined> {
    base: string
    search?: string
    params: TParams
    active?: boolean
}
