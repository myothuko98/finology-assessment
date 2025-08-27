import { createFileRoute } from '@tanstack/react-router'

import UserList from '@/components/users/user-list'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-sm text-gray-600">List of all users</p>
      </div>
      <UserList />
    </div>
  )
}
