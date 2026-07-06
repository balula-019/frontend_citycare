import apiClient from './client';

/**
 * PUT /v1/services/users/update/{id}
 */
export const updateUserProfile = (id, data) =>
  apiClient.put(`/v1/services/users/update/${id}`, data);