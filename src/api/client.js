// Updated BASE_URL to live deployment
// const BASE_URL = 'https://senior-auth-8.onrender.com/api';

const BASE_URL = 'http://localhost:60200/api';

const getAccessToken  = () => localStorage.getItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');

const setTokens = (access, refresh) => {
  if (access)  localStorage.setItem('accessToken',  access);
  if (refresh) localStorage.setItem('refreshToken', refresh);
};

const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

/* ─────────────────────────────────────────────
   Toast notification system (unchanged)
───────────────────────────────────────────── */  

const TOAST_STYLES = `/* ...unchanged... */`;

const TOAST_VARIANTS = { /* unchanged */ };

let _styleInjected = false;

function _injectStyles() { /* unchanged */ }
function _getRoot()      { /* unchanged */ }

export function showToast({ type = 'info', title, message, duration = 5000 }) {
  /* unchanged */
}

/* ─────────────────────────────────────────────
   Session helpers (unchanged)
───────────────────────────────────────────── */

const redirectToLogin = () => {
  setTimeout(() => {
    window.location.hash = '#/login';
    window.location.reload();
  }, 1200);
};

const handleSessionExpiry = () => {
  clearTokens();
  showToast({
    type:     'warning',
    title:    'Session expired',
    message:  'Please log in again to continue.',
    duration: 5000,
  });
  redirectToLogin();
};

/* ─────────────────────────────────────────────
   Business-level status codes
───────────────────────────────────────────── */

const SUCCESS_STATUS_CODES = new Set(['600']);

function makeApiError(message, statusCode, body) {
  const err = new Error(message || 'Something went wrong.');
  err.statusCode = statusCode != null ? String(statusCode) : undefined;
  err.data = body;

  // axios-like shape
  err.response = {
    status: Number(statusCode) || 0,
    data: body,
  };

  return err;
}

// Pick the most specific message the backend sent.
function pickErrorMessage(body, fallback = 'Something went wrong.') {
  return (
    body?.data?.message ||   // ✅ nested payload message (e.g. "Account locked. Try again in 20 mins.")
    body?.message ||         // top-level message
    body?.error ||
    fallback
  );
}

/* ─────────────────────────────────────────────
   Core API client
───────────────────────────────────────────── */

export const apiClient = async (endpoint, options = {}) => {
  const token = getAccessToken();

  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  let response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

  // ── 401: attempt silent token refresh ──────────────────────
  if (response.status === 401) {
    const refresh = getRefreshToken();

    if (refresh) {
      try {
        const refreshRes = await fetch(
          `${BASE_URL}/v1/services/users/refresh-token`,
          {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ refreshToken: refresh }),
          }
        );

        if (refreshRes.ok) {
          const data = await refreshRes.json();

          if (data?.data?.access_token && data?.data?.refresh_token) {
            setTokens(data.data.access_token, data.data.refresh_token);
            headers.Authorization = `Bearer ${data.data.access_token}`;
            response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
          } else {
            handleSessionExpiry();
            throw new Error('Session expired');
          }
        } else {
          handleSessionExpiry();
          throw new Error('Session expired');
        }
      } catch (err) {
        if (err.message === 'Session expired') throw err;
        handleSessionExpiry();
        throw new Error('Session expired');
      }
    } else {
      handleSessionExpiry();
      throw new Error('Not authenticated');
    }
  }

  // ── Non-2xx HTTP responses ─────────────────────────────────
  if (!response.ok) {
    const errBody = await response.json().catch(() => ({
      message: response.statusText || 'Request failed',
    }));

    const message = pickErrorMessage(
      errBody,
      response.statusText || 'Something went wrong.'
    );
    throw makeApiError(message, errBody?.statusCode, errBody);
  }

  // ── HTTP 200, business-level failure ───────────────────────
  const data = await response.json();

  if (
    data?.statusCode !== undefined &&
    !SUCCESS_STATUS_CODES.has(String(data.statusCode))
  ) {
    const message = pickErrorMessage(data);
    throw makeApiError(message, data.statusCode, data);
  }

  return data;
};

export default apiClient;