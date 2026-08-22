// Updated BASE_URL to live deployment
const BASE_URL = 'https://senior-auth-8.onrender.com/api';

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

const TOAST_STYLES = `
  #pc-toast-root {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 99999;
    display: flex;
    flex-direction: column;
    gap: 10px;
    pointer-events: none;
    max-width: 360px;
    width: calc(100vw - 40px);
  }

  .pc-toast {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    padding: 14px 16px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.10);
    pointer-events: all;
    transform: translateX(120%);
    opacity: 0;
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1),
                opacity 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .pc-toast.pc-toast--show {
    transform: translateX(0);
    opacity: 1;
  }

  .pc-toast.pc-toast--hide {
    transform: translateX(120%);
    opacity: 0;
  }

  .pc-toast__bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    border-radius: 0 0 0 14px;
    animation: pc-shrink linear forwards;
  }

  @keyframes pc-shrink {
    from { width: 100%; }
    to   { width: 0%;   }
  }

  .pc-toast__icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .pc-toast__body {
    flex: 1;
    min-width: 0;
  }

  .pc-toast__title {
    font-size: 13px;
    font-weight: 600;
    color: #0f172a;
    line-height: 1.4;
    margin-bottom: 2px;
  }

  .pc-toast__msg {
    font-size: 12px;
    color: #64748b;
    line-height: 1.5;
    word-break: break-word;
  }

  .pc-toast__close {
    background: none;
    border: none;
    cursor: pointer;
    padding: 2px;
    color: #94a3b8;
    font-size: 16px;
    line-height: 1;
    flex-shrink: 0;
    border-radius: 4px;
    transition: color 0.15s, background 0.15s;
  }

  .pc-toast__close:hover {
    color: #475569;
    background: #f1f5f9;
  }

  @media (prefers-color-scheme: dark) {
    .pc-toast {
      background: #1e293b;
      border-color: #334155;
    }
    .pc-toast__title { color: #f1f5f9; }
    .pc-toast__msg   { color: #94a3b8; }
    .pc-toast__close { color: #64748b; }
    .pc-toast__close:hover { background: #0f172a; color: #94a3b8; }
  }
`;

const TOAST_VARIANTS = {
  error: {
    icon:       '✕',
    iconBg:     '#fee2e2',
    iconColor:  '#e11d48',
    barColor:   '#e11d48',
    title:      'Error',
  },
  warning: {
    icon:       '⚠',
    iconBg:     '#fef9c3',
    iconColor:  '#b45309',
    barColor:   '#f59e0b',
    title:      'Warning',
  },
  success: {
    icon:       '✓',
    iconBg:     '#dcfce7',
    iconColor:  '#10b981',
    barColor:   '#10b981',
    title:      'Success',
  },
  info: {
    icon:       'i',
    iconBg:     '#dbeafe',
    iconColor:  '#1a56db',
    barColor:   '#1a56db',
    title:      'Info',
  },
};

let _styleInjected = false;

function _injectStyles() {
  if (_styleInjected) return;
  const tag = document.createElement('style');
  tag.textContent = TOAST_STYLES;
  document.head.appendChild(tag);
  _styleInjected = true;
}

function _getRoot() {
  let root = document.getElementById('pc-toast-root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'pc-toast-root';
    document.body.appendChild(root);
  }
  return root;
}

export function showToast({ type = 'info', title, message, duration = 5000 }) {
  _injectStyles();

  const root    = _getRoot();
  const variant = TOAST_VARIANTS[type] || TOAST_VARIANTS.info;
  const heading = title || variant.title;

  const toast = document.createElement('div');
  toast.className = 'pc-toast';
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');

  toast.innerHTML = `
    <div class="pc-toast__icon"
         style="background:${variant.iconBg}; color:${variant.iconColor}; font-family:monospace; font-weight:700;">
      ${variant.icon}
    </div>
    <div class="pc-toast__body">
      <div class="pc-toast__title">${heading}</div>
      ${message ? `<div class="pc-toast__msg">${message}</div>` : ''}
    </div>
    <button class="pc-toast__close" aria-label="Dismiss notification">✕</button>
    ${duration > 0
      ? `<div class="pc-toast__bar"
              style="background:${variant.barColor};
                     animation-duration:${duration}ms;"></div>`
      : ''}
  `;

  const dismiss = () => {
    toast.classList.remove('pc-toast--show');
    toast.classList.add('pc-toast--hide');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  };

  toast.querySelector('.pc-toast__close').addEventListener('click', dismiss);

  root.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('pc-toast--show'));
  });

  if (duration > 0) {
    setTimeout(dismiss, duration);
  }

  return dismiss;
}

/* ─────────────────────────────────────────────
   Session helpers
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
   Your backend signals success/failure with its own `statusCode` field
   in the JSON body (as a STRING, e.g. "600", "619", "702") — sometimes
   alongside an HTTP 200. We can't rely on response.ok alone.
───────────────────────────────────────────── */

const SUCCESS_STATUS_CODES = new Set(['600']);

// Builds a normal Error but attaches the backend's business statusCode
// and the raw body, so callers (LoginPage, etc.) can branch on the exact
// code instead of guessing from message text alone.
function makeApiError(message, statusCode, body) {
  const err = new Error(message || 'Something went wrong.');
  err.statusCode = statusCode != null ? String(statusCode) : undefined;
  err.data = body;
  return err;
}

/* ─────────────────────────────────────────────
   Core API client
───────────────────────────────────────────── */

export const apiClient = async (endpoint, options = {}) => {
  const token = getAccessToken();

  const headers = {
    'Content-Type': 'application/json',
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

  // ── Non-2xx HTTP responses ──────────────────────────────────
  if (!response.ok) {
    const errBody = await response.json().catch(() => ({
      message: response.statusText || 'Request failed',
    }));

    const message = errBody?.message || errBody?.error || 'Something went wrong.';
    throw makeApiError(message, errBody?.statusCode, errBody);
  }

  // ── HTTP 200, but the body itself may signal a business-level
  //    failure via its own statusCode (e.g. "619", "702") ───────
  const data = await response.json();

  if (data?.statusCode !== undefined && !SUCCESS_STATUS_CODES.has(String(data.statusCode))) {
    throw makeApiError(data?.message, data.statusCode, data);
  }

  return data;
};

export default apiClient;