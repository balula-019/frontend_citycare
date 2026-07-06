import { useState } from 'react';
import { activateUser, deactivateUser } from '../../api/admin';
import Button from '../../components/shared/Button';

// Dummy user list
const dummyUsers = [
  { id: 'u1', name: 'John Doe', email: 'john@example.com', status: 'ACTIVE' },
  { id: 'u2', name: 'Jane Org', email: 'jane@org.com', status: 'ACTIVE' },
];

export default function ManageUsers() {
  const [users, setUsers] = useState(dummyUsers);

  const handleActivate = async (id) => {
    await activateUser(id);
    setUsers(users.map(u => u.id === id ? { ...u, status: 'ACTIVE' } : u));
  };
  const handleDeactivate = async (id) => {
    await deactivateUser(id);
    setUsers(users.map(u => u.id === id ? { ...u, status: 'INACTIVE' } : u));
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-t">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${user.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 space-x-2">
                  {user.status === 'ACTIVE' ? (
                    <Button variant="ghost" onClick={() => handleDeactivate(user.id)} className="text-red-500">Deactivate</Button>
                  ) : (
                    <Button variant="ghost" onClick={() => handleActivate(user.id)} className="text-green-500">Activate</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}