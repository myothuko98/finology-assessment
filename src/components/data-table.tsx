import * as React from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface ExpandableDataTableProps<T extends { id: number | string }> {
  data: Array<T>
  columns: Array<ColumnDef<T>>
  renderExpandedContent: (item: T) => React.ReactNode
  className?: string
  expandedRowClassName?: string
  defaultExpanded?: Array<number | string>
}

export function ExpandableDataTable<T extends { id: number | string }>({
  data,
  columns,
  renderExpandedContent,
  className,
  expandedRowClassName,
  defaultExpanded = [],
}: ExpandableDataTableProps<T>) {
  const [expandedRows, setExpandedRows] = React.useState<Set<number | string>>(
    new Set(defaultExpanded),
  )

  const table = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // Handle different versions of react-table
    ...(typeof window !== 'undefined' && {
      filterFns: {},
      sortingFns: {},
      state: {},
      onStateChange: () => {},
      renderFallbackValue: null,
    }),
    // Disable features we don't need
    enableRowSelection: false,
    enableColumnFilters: false,
    enableSorting: false,
    enableGlobalFilter: false,
    enableMultiRowSelection: false,
    enableSubRowSelection: false,
  } as any)

  const toggleExpanded = (id: number | string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <div className="rounded-md border">
      <Table className={className}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              <TableHead className="w-8" />
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            const isExpanded = expandedRows.has(row.original.id)
            return (
              <React.Fragment key={row.id}>
                <TableRow
                  className={cn(
                    'cursor-pointer hover:bg-muted/50 transition-colors',
                    isExpanded && 'bg-muted',
                  )}
                  onClick={() => toggleExpanded(row.original.id)}
                >
                  <TableCell className="w-8 align-middle">
                    {isExpanded ? (
                      <ChevronDown
                        size={16}
                        className="text-muted-foreground"
                      />
                    ) : (
                      <ChevronRight
                        size={16}
                        className="text-muted-foreground"
                      />
                    )}
                  </TableCell>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                {isExpanded && (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + 1}
                      className={cn(
                        'bg-muted/30 border-b border-muted animate-collapsible-down',
                        'animate-collapsible-down-open',
                        expandedRowClassName,
                      )}
                    >
                      {renderExpandedContent(row.original)}
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            )
          })}
          {table.getRowModel().rows.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={columns.length + 1}
                className="text-center text-muted-foreground py-8"
              >
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

// Export types for external use
export type { ExpandableDataTableProps }

// Default export
export default ExpandableDataTable
