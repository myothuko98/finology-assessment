import { useMemo, useState } from 'react'
import ExpandableDataTable from '../data-table'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { userExpandedContent } from './user-expandable-content'
import type { IUser } from '@/types/user'
import type { ColumnDef } from '@tanstack/react-table'
import { useUsers } from '@/hooks/useUsers'
import { useDebouncedValue } from '@/hooks/useDebounceValue'

const userTableColumns: Array<ColumnDef<IUser>> = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (info) => (
      <div className="font-medium">{info.getValue() as string}</div>
    ),
  },
  {
    accessorKey: 'username',
    header: 'Username',
    cell: (info) => (
      <div className="text-muted-foreground">@{info.getValue() as string}</div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: (info) => (
      <div className="font-mono text-sm">{info.getValue() as string}</div>
    ),
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: (info) => (
      <div className="font-mono text-sm">{info.getValue() as string}</div>
    ),
  },
]

const UserList = () => {
  const { data = [] } = useUsers()
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('')
  const [company, setCompany] = useState('')
  const debouncedSearch = useDebouncedValue(search, 300)

  // Extract unique cities and companies
  const cityOptions = useMemo(() => {
    const set = new Set<string>()
    data.forEach((u) => set.add(u.address.city))
    return Array.from(set)
  }, [data])
  const companyOptions = useMemo(() => {
    const set = new Set<string>()
    data.forEach((u) => set.add(u.company.name))
    return Array.from(set)
  }, [data])

  // Filter logic (AND)
  const filteredData = useMemo(() => {
    return data.filter((u) => {
      const matchesName = debouncedSearch
        ? u.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        : true
      const matchesCity = city ? u.address.city === city : true
      const matchesCompany = company ? u.company.name === company : true
      return matchesName && matchesCity && matchesCompany
    })
  }, [data, debouncedSearch, city, company])

  const hasFilter = Boolean(search || city || company)

  const handleClear = () => {
    setSearch('')
    setCity('')
    setCompany('')
  }

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className="flex flex-wrap gap-2 items-center">
            <Input
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-48"
            />
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by city" />
              </SelectTrigger>
              <SelectContent>
                {cityOptions.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={company} onValueChange={setCompany}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by company" />
              </SelectTrigger>
              <SelectContent>
                {companyOptions.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {hasFilter && (
              <Button variant="outline" onClick={handleClear} className="ml-2">
                Clear All
              </Button>
            )}
          </div>
          <ExpandableDataTable
            columns={userTableColumns}
            data={filteredData}
            renderExpandedContent={userExpandedContent}
            expandedRowClassName="animate-collapsible-down"
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default UserList
