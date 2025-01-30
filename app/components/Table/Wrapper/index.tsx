export const TableWrapper = ({ children }: { children: React.ReactNode }) => (
    <table className="table table-zebra border-separate rounded-md border-2 border-spacing-1 w-full overflow-x-scroll font-medium text-slate-600">
        {children}
    </table>
)
