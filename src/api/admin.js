import { apiClient } from './client';

export const createOrganisation = (data) =>
  apiClient('/v1/services/users/organisations', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const activateUser = (userId) =>
  apiClient(`/v1/services/users/activate/${userId}`, { method: 'PUT' });

export const deactivateUser = (userId) =>
  apiClient(`/v1/services/users/deactivate/${userId}`, { method: 'PUT' });


/**
 * GET /v1/services/admin/stats  (or whatever your endpoint is)
 * Returns { users, organisations, reports, matches }
 */
export const getAdminStats = () =>
  apiClient.get('/v1/services/admin/stats');