export const TableHeader = ({ children }: { children: React.ReactNode }) => {
    return (
        <thead className='bg-base-200'>
            {children}
        </thead>
    )
}