import type { IUser } from '@/types/user'

export const userExpandedContent = (user: IUser) => (
  <div className="p-6 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
        {user.name
          .split(' ')
          .map((n) => n[0])
          .join('')}
      </div>
      <div>
        <h3 className="text-xl font-bold">{user.name}</h3>
        <p className="text-gray-600">@{user.username}</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
      <div className="bg-white p-3 rounded-lg">
        <h4 className="font-semibold mb-2">Contact</h4>
        <p>{user.email}</p>
        <p>{user.phone}</p>
        <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className='text-blue-500 hover:underline'>
          {user.website}
        </a>
      </div>

      <div className="bg-white p-3 rounded-lg">
        <h4 className="font-semibold mb-2">Address</h4>
        <p>{user.address.street}</p>
        <p>{user.address.city}</p>
        <p>{user.address.zipcode}</p>
      </div>

      <div className="bg-white p-3 rounded-lg">
        <h4 className="font-semibold mb-2">Company</h4>
        <p className="font-medium">{user.company.name}</p>
        <p className="italic text-gray-600">{user.company.catchPhrase}</p>
      </div>
    </div>
  </div>
)
