import { apiClient } from './client';

export const login = (username, password) =>
  apiClient('/v1/services/users/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

export const createAccount = (data) =>
  apiClient('/v1/services/users/create-account', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const verifyOtp = (email, otpCode) =>
  apiClient('/v1/services/users/verify-otp', {
    method: 'POST',
    body: JSON.stringify({ email, otp_code: otpCode }),
  });

export const resendOtp = (email, purpose) =>
  apiClient('/v1/services/users/resend-otp', {
    method: 'POST',
    body: JSON.stringify({ email, purpose }),
  });

export const refreshToken = (refreshToken) =>
  apiClient('/v1/services/users/refresh-token', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  });

export const logout = () =>
  apiClient('/v1/services/users/logout', { method: 'POST' });

export const forgotPassword = (email) =>
  apiClient('/v1/services/users/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

export const verifyResetOtp = (email, otpCode) =>
  apiClient('/v1/services/users/forgot-verify-otp', {
    method: 'POST',
    body: JSON.stringify({ email, otp_code: otpCode }),
  });

export const resetPassword = (email, otpCode, newPassword) =>
  apiClient('/v1/services/users/reset-password', {
    method: 'POST',
    body: JSON.stringify({ email, otp_code: otpCode, password: newPassword }),
  });

export const changePassword = (currentPwd, newPwd, confirmPwd) =>
  apiClient('/v1/services/users/change-password', {
    method: 'POST',
    body: JSON.stringify({ current_password: currentPwd, new_password: newPwd, confirm_password: confirmPwd }),
  });

export const updateProfile = (profileId, data) =>
  apiClient(`/v1/services/users/update/${profileId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });