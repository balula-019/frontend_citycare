import { apiClient } from './client';

/**
 * Update the signed-in organisation's own details.
 * PUT /v1/services/lost-reports/profile
 */
export const updateOrganisationProfile = (data) =>
  apiClient('/v1/services/lost-reports/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
