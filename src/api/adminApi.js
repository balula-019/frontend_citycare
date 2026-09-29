import { apiClient } from './client';

// GET /v1/services/lost-reports/dashboard
export const getAdminStats = () =>
  apiClient('/v1/services/lost-reports/dashboard', { method: 'GET' });

// POST /v1/services/users/organisations
export const createOrganisation = (data) =>
  apiClient('/v1/services/users/organisations', {
    method: 'POST',
    body: JSON.stringify(data),
  });

// GET /v1/services/lost-reports/search  (user search by admin)
export const searchUsers = (params = {}) => {
  const query = new URLSearchParams();
  if (params.userType) query.append('userType', params.userType);
  if (params.enabled !== undefined && params.enabled !== '') {
    query.append('enabled', params.enabled);
  }
  query.append('page', params.page || 0);
  query.append('size', params.size || 10);
  return apiClient(`/v1/services/lost-reports/search?${query.toString()}`, { method: 'GET' });
};

// PATCH /v1/services/users/activate/{user-id}
export const activateUser = (userId) =>
  apiClient(`/v1/services/users/activate/${userId}`, { method: 'PATCH' });


// PUT /v1/services/users/update/{profile-id}
export const updateUser = (userId, data) =>
  apiClient(`/v1/services/users/update/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

// PATCH /v1/services/users/deactivate/{user-id}
export const deactivateUser = (userId) =>
  apiClient(`/v1/services/users/deactivate/${userId}`, { method: 'PATCH' });

// DELETE /v1/services/lost-reports/delete-user/{userId}
export const deleteUser = (userId) =>
  apiClient(`/v1/services/lost-reports/delete-user/${userId}`, { method: 'DELETE' });

