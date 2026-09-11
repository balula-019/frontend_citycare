

import { apiClient } from './client';

/**
 * Public search — found items visible to everyone
 * GET /v1/services/lost-reports/public/items
 */
export const searchPublicItems = (params = {}) => {
  const query = new URLSearchParams();
  if (params.region)              query.append('region', params.region);
  if (params.page !== undefined)  query.append('page',   params.page);
  if (params.size !== undefined)  query.append('size',   params.size);
  return apiClient(`/v1/services/lost-reports/public/items?${query.toString()}`);
};

/**
 * Create a lost report.
 * POST /v1/services/lost-reports/owner-report
 */
export const createLostReport = (data) =>
  apiClient('/v1/services/lost-reports/owner-report', {
    method: 'POST',
    body:   JSON.stringify(data),
  });

/**
 * Claim a found item
 * POST /v1/services/lost-reports/{organizationItemId}/claim
 */
export const claimItem = (organizationItemId) =>
  apiClient(`/v1/services/lost-reports/${organizationItemId}/claim`, {
    method: 'POST',
  });

/**
 * Get claim payment details
 * GET /v1/services/lost-reports/{organizationItemId}/payment
 */
export const getClaimPayment = (organizationItemId) =>
  apiClient(`/v1/services/lost-reports/${organizationItemId}/payment`);

// **
//  * Publish an organisation found item
//  * POST /v1/services/lost-reports/publish
//  * 
//  * NOTE: This endpoint expects multipart/form-data with:
//  *   - request (JSON string)
//  *   - photos (file array)
//  *   - reporterPhotos (file array)
//  */
/**
 * Publish an organisation found item
 * POST /v1/services/lost-reports/publish
 * 
 * This endpoint requires multipart/form-data with:
 *   - request (JSON string)
 *   - photos (file array)
 *   - reporterPhotos (file array)
 */
export const publishOrganizationItem = (formData) =>
  apiClient('/v1/services/lost-reports/publish', {
    method: 'POST',
    body: formData,   // ✅ FormData goes directly, no JSON.stringify
  });
/**
 * Update a published organisation item
 * PUT /v1/services/lost-reports/publish/{itemId}
 */
export const updatePublishedItem = (itemId, data) =>
  apiClient(`/v1/services/lost-reports/publish/${itemId}`, {
    method: 'PUT',
    body:   JSON.stringify(data),
  });

/**
 * Owner's lost reports — without AI match data.
 * GET /v1/services/lost-reports/my-lost-reports
 */
export const getMyLostReports = (page = 0, size = 20) =>
  apiClient(`/v1/services/lost-reports/my-lost-reports?page=${page}&size=${size}`);

/**
 * Owner's lost reports — WITH full AI matching results.
 * GET /v1/services/lost-reports/my-lost-reports-with-matches
 */
export const getMyLostReportsWithMatches = (page = 0, size = 20) =>
  apiClient(
    `/v1/services/lost-reports/my-lost-reports-with-matches?page=${page}&size=${size}`
  );

// ─── Organisation‑specific endpoints ──────────────────────────

/**
 * Organisation Dashboard
 * GET /v1/services/lost-reports/organization/dashboard
 */
export const getOrganizationDashboard = () =>
  apiClient('/v1/services/lost-reports/organization/dashboard');

/**
 * Organisation My Published Items (paginated)
 * GET /v1/services/lost-reports/organization/my-items
 */
export const getOrganizationItems = (page = 0, size = 10) => {
  const params = new URLSearchParams({ page, size });
  return apiClient(`/v1/services/lost-reports/organization/my-items?${params.toString()}`);
};

/**
 * Organisation Claims (all claims)
 * GET /v1/services/lost-reports/organization/claims
 */
export const getOrganizationClaims = () =>
  apiClient('/v1/services/lost-reports/organization/claims');

/**
 * Accept a claim
 * PATCH /v1/services/lost-reports/claims/{claimId}/accept
 */
export const acceptClaim = (claimId) =>
  apiClient(`/v1/services/lost-reports/claims/${claimId}/accept`, {
    method: 'PATCH',
  });

/**
 * Reject a claim
 * PATCH /v1/services/lost-reports/claims/{claimId}/reject
 */
export const rejectClaim = (claimId, reason = '') => {
  const query = reason ? `?reason=${encodeURIComponent(reason)}` : '';
  return apiClient(`/v1/services/lost-reports/claims/${claimId}/reject${query}`, {
    method: 'PATCH',
  });
};

// ─── Item management ─────────────────────────────────────────

/**
 * Delete a published item (soft delete)
 * DELETE /v1/services/lost-reports/publish/{itemId}
 */
export const deletePublishedItem = (itemId) =>
  apiClient(`/v1/services/lost-reports/publish/${itemId}`, {
    method: 'DELETE',
  });

/**
 * Get a single published item (full details)
 * GET /v1/services/lost-reports/public/items/{itemId}
 */
export const getPublishedItem = (itemId) =>
  apiClient(`/v1/services/lost-reports/public/items/${itemId}`);

/**
 * Get a single claim by ID
 * GET /v1/services/lost-reports/claim/{claimId}
 */
export const getClaimDetail = (claimId) =>
  apiClient(`/v1/services/lost-reports/claim/${claimId}`);

// ─── Notification endpoints ─────────────────────────────────

/**
 * Get notifications for the authenticated user
 * GET /v1/services/lost-reports/notifications
 */
export const getNotifications = () =>
  apiClient('/v1/services/lost-reports/notifications');

/**
 * Mark a single notification as read
 * PATCH /v1/services/lost-reports/{notificationId}/read
 */
export const markNotificationRead = (notificationId) =>
  apiClient(`/v1/services/lost-reports/${notificationId}/read`, {
    method: 'PATCH',
  });

/**
 * Mark all notifications as read
 * PATCH /v1/services/lost-reports/read-all
 */
export const markAllNotificationsRead = () =>
  apiClient('/v1/services/lost-reports/read-all', {
    method: 'PATCH',
  });

/**
 * Delete a notification
 * DELETE /v1/services/lost-reports/{notificationId}/delete
 */
export const deleteNotification = (notificationId) =>
  apiClient(`/v1/services/lost-reports/${notificationId}/delete`, {
    method: 'DELETE',
  });

/**
 * Update organisation profile
 * PUT /v1/services/lost-reports/profile
 */
export const updateOrganisationProfile = (data) =>
  apiClient('/v1/services/lost-reports/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  });

// ─── Completed (Found) & Delete claim endpoints ─────────────

/**
 * Mark a claim as found (move to Completed tab)
 * PATCH /v1/services/lost-reports/claims/{claimId}/found
 */
export const markClaimFound = (claimId) =>
  apiClient(`/v1/services/lost-reports/claims/${claimId}/found`, {
    method: 'PATCH',
  });

/**
 * Delete a claim (soft delete)
 * DELETE /v1/services/lost-reports/claim/{claimId}
 */
export const deleteClaim = (claimId) =>
  apiClient(`/v1/services/lost-reports/claim/${claimId}`, {
    method: 'DELETE',
  });