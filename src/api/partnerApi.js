import { apiClient } from './client';

/* =========================================================================
 * PUBLIC — PARTNER WITH US FLOW (unauthenticated)
 * =========================================================================
 * Step 1 → sendPartnerRequestOtp       POST /v1/services/users/partner-request/send-otp
 * Step 1 → resendPartnerRequestOtp     POST /v1/services/users/resend-otp
 * Step 2 → submitPartnerRequest        POST /v1/services/users/partner-request
 * Shared → getPartnerOtpConfig         GET  /v1/services/users/otp-config
 * ========================================================================= */

// POST /v1/services/users/partner-request/send-otp
// Body: { email }
export const sendPartnerRequestOtp = (data) =>
  apiClient('/v1/services/users/partner-request/send-otp', {
    method: 'POST',
    body: JSON.stringify(data),
  });

// POST /v1/services/users/resend-otp
// Body: { identifier, purpose: 'PARTNER_REQUEST_EMAIL_VERIFICATION' }
// ✅ Spec now uses `identifier` (not `email`)
export const resendPartnerRequestOtp = (data) =>
  apiClient('/v1/services/users/resend-otp', {
    method: 'POST',
    body: JSON.stringify(data),
  });

// POST /v1/services/users/partner-request
// Body: { organizationName, contactPerson, email, phoneNumber,
//         partnershipType, message, otpCode }
export const submitPartnerRequest = (data) =>
  apiClient('/v1/services/users/partner-request', {
    method: 'POST',
    body: JSON.stringify(data),
  });

// GET /v1/services/users/otp-config
// Returns { expiryMinutes, maxFailedAttempts, cooldownSeconds,
//           dailyLimit, lockDurationMinutes }
export const getPartnerOtpConfig = async () => {
  const res = await apiClient('/v1/services/users/otp-config', {
    method: 'GET',
  });
  return res?.data; // unwrap GenericRestResponse.data
};

/* =========================================================================
 * ADMIN — PARTNER REQUEST REVIEW
 * ========================================================================= */

// PUT /v1/services/lost-reports/partner-requests/{requestId}
// Body: { status: 'PENDING' | 'APPROVED' | 'REJECTED', adminNote? }
export const updatePartnerRequestStatus = (requestId, data) =>
  apiClient(`/v1/services/lost-reports/partner-requests/${requestId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  // ✅ GET /v1/services/lost-reports/view-partner-requests
// Returns: PartnerRequestResponse[]  (plain array, not wrapped)
export const getAllPartnerRequests = () =>
  apiClient('/v1/services/lost-reports/view-partner-requests', {
    method: 'GET',
  });

