import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Search, Users, UserX, UserCheck,
  Loader2, ChevronLeft, ChevronRight, RefreshCw, Trash2,
  AlertCircle, X
} from 'lucide-react';
import {
  searchUsers as searchUsersApi,
  activateUser,
  deactivateUser,
  deleteUser
} from '../../api/adminApi';

export default function ManageUsers() {
  const navigate = useNavigate();

  const [userType, setUserType] = useState('');
  const [enabled, setEnabled] = useState('');   // '' = all, 'true'/'false'
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState({});
  const [deletingUser, setDeletingUser] = useState(null);

  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {
        userType: userType || undefined,
        enabled: enabled !== '' ? enabled : undefined,
        page,
        size: 10,
      };
      const res = await searchUsersApi(params);
      const data = res?.data || res;
      setUsers(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      setError(err.message || 'Failed to load users.');
    } finally {
      setLoading(false);
    }
  }, [userType, enabled, page]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleToggleStatus = async (user) => {
    const userId = user.userId;
    const isActive = user.status === 'ACTIVE';
    setActionLoading(prev => ({ ...prev, [userId]: true }));
    try {
      if (isActive) {
        await deactivateUser(userId);
      } else {
        await activateUser(userId);
      }
      await fetchUsers();
    } catch (err) {
      setError(err.message || 'Action failed.');
    } finally {
      setActionLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  // Open confirmation modal
  const confirmDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  // Actual delete action
  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    const userId = userToDelete.userId;
    setDeletingUser(userId);
    setShowDeleteModal(false);
    try {
      await deleteUser(userId);
      await fetchUsers();
    } catch (err) {
      setError(err.message || 'Failed to delete user.');
    } finally {
      setDeletingUser(null);
      setUserToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const prevPage = () => { if (page > 0) setPage(page - 1); };
  const nextPage = () => { if (page < totalPages - 1) setPage(page + 1); };

  const statusBadge = (user) => {
    const active = user.status === 'ACTIVE';
    return active
      ? <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">Active</span>
      : <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded-full">Inactive</span>;
  };

  return (
    <div className="min-h-screen bg-[#f5faf9] p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#0f766e] mb-6"
        >
          <ArrowLeft size={15} /> Back to Dashboard
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ccfbf1] flex items-center justify-center">
              <Users size={20} className="text-[#0f766e]" />
            </div>
            <h1 className="text-xl font-extrabold text-gray-900" style={{ fontFamily: "'Sora', sans-serif" }}>
              Manage Users
            </h1>
          </div>
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#e2e8f0] text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-500 mb-1">User Type</label>
              <select
                value={userType}
                onChange={(e) => { setUserType(e.target.value); setPage(0); }}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-[#f8fafc]"
              >
                <option value="">All Types</option>
                <option value="ADMIN">Admin</option>
                <option value="OWNER">Owner</option>
                <option value="ORGANISATION">Organisation</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Status</label>
              <select
                value={enabled}
                onChange={(e) => { setEnabled(e.target.value); setPage(0); }}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-[#f8fafc]"
              >
                <option value="">All</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
            <button
              onClick={() => fetchUsers()}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0f766e] text-white text-sm font-bold hover:bg-[#115e59] transition-all disabled:opacity-60"
            >
              <Search size={16} /> Search
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 size={32} className="animate-spin text-[#0f766e]" />
            </div>
          ) : users.length === 0 ? (
            <div className="p-12 text-center">
              <Users size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">No users found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Name</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Email</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Phone</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Type</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((user) => {
                    const isActive = user.status === 'ACTIVE';
                    const userId = user.userId;
                    const isDeleting = deletingUser === userId;
                    const isAdmin = user.userType === 'ADMIN';

                    return (
                      <tr key={userId} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {user.name || 'N/A'}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{user.email}</td>
                        <td className="px-4 py-3 text-gray-600">{user.phoneNumber || '—'}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 bg-primary-soft text-primary-hover text-xs font-bold rounded-full">
                            {user.userType}
                          </span>
                        </td>
                        <td className="px-4 py-3">{statusBadge(user)}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* Activate/Deactivate – hidden for ADMIN users */}
                            {!isAdmin && (
                              <button
                                onClick={() => handleToggleStatus(user)}
                                disabled={actionLoading[userId]}
                                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all disabled:opacity-50 ${
                                  isActive
                                    ? 'bg-red-50 text-red-700 hover:bg-red-100'
                                    : 'bg-green-50 text-green-700 hover:bg-green-100'
                                }`}
                              >
                                {actionLoading[userId] ? (
                                  <Loader2 size={12} className="animate-spin" />
                                ) : isActive ? (
                                  <UserX size={14} />
                                ) : (
                                  <UserCheck size={14} />
                                )}
                                {isActive ? 'Deactivate' : 'Activate'}
                              </button>
                            )}

                            {/* Delete button – hidden for ADMIN users */}
                            {!isAdmin && (
                              <button
                                onClick={() => confirmDeleteUser(user)}
                                disabled={isDeleting}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-700 transition-all disabled:opacity-50"
                                title="Delete user permanently"
                              >
                                {isDeleting ? (
                                  <Loader2 size={14} className="animate-spin" />
                                ) : (
                                  <Trash2 size={14} />
                                )}
                                Delete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t">
              <span className="text-xs text-gray-500">
                Page {page + 1} of {totalPages}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={prevPage}
                  disabled={page === 0}
                  className="p-1 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={nextPage}
                  disabled={page >= totalPages - 1}
                  className="p-1 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && userToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl border border-[#e2e8f0] max-w-md w-full p-6 relative">
              <button
                onClick={cancelDelete}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <X size={18} className="text-gray-500" />
              </button>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <AlertCircle size={20} className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0f172a]">Delete User Permanently</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Are you sure you want to permanently delete <strong>{userToDelete.name || 'this user'}</strong>? This action cannot be undone.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 rounded-xl border border-[#e2e8f0] text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteUser}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-all"
                >
                  Delete Permanently
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}