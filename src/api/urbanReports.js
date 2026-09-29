import { apiClient } from './client';

const BASE = '/v1/services/lost-reports/urban-problems';

/*
  The report endpoints are multipart: a `request` part carrying the JSON
  payload as plain text, plus zero or more `photos` file parts. The JSON is
  appended as a string on purpose — the backend reads that part as a String
  and parses it itself, so tagging it application/json makes Spring reject it.
*/
const buildFormData = (payload, photos = []) => {
  const form = new FormData();
  form.append('request', JSON.stringify(payload));
  photos.forEach((photo) => form.append('photos', photo));
  return form;
};

/**
 * Report an urban problem.
 * POST /urban-problems/report
 *
 * Rejected by image verification? The call throws, and the thrown error
 * carries the verification detail on `error.data.data`.
 */
export const createUrbanProblemReport = (payload, photos) =>
  apiClient(`${BASE}/report`, {
    method: 'POST',
    body: buildFormData(payload, photos),
  });

/**
 * Correct a report of your own.
 * PUT /urban-problems/reports/{reportId}
 *
 * Omitted fields keep their current value. Cloudinary URLs listed in
 * `removeImageUrls` are dropped; new files arrive as photos.
 */
export const updateUrbanProblemReport = (reportId, payload, photos) =>
  apiClient(`${BASE}/reports/${reportId}`, {
    method: 'PUT',
    body: buildFormData(payload, photos),
  });

/**
 * List reports, newest first.
 * GET /urban-problems/reports
 */
export const getUrbanProblemReports = ({
  problemType,
  status,
  region,
  district,
  reportedBy,
  assignedTo,
  page = 1,
  size = 20,
} = {}) => {
  const query = new URLSearchParams();

  if (problemType) query.append('problem-type', problemType);
  if (status) query.append('status', status);
  if (region) query.append('region', region);
  if (district) query.append('district', district);
  if (reportedBy) query.append('reported-by', reportedBy);
  if (assignedTo) query.append('assigned-to', assignedTo);
  query.append('page', page);
  query.append('size', size);

  return apiClient(`${BASE}/reports?${query.toString()}`);
};

/**
 * One report with its verification and routing detail.
 * GET /urban-problems/reports/{reportId}
 */
export const getUrbanProblemReport = (reportId) =>
  apiClient(`${BASE}/reports/${reportId}`);

/**
 * Totals, the average number of reports per person, and the share of each
 * problem type with the organisations registered for it.
 * GET /urban-problems/reports/statistics
 */
export const getUrbanProblemStatistics = () =>
  apiClient(`${BASE}/reports/statistics`);

/**
 * The reports routed to the signed-in organisation, as map points.
 * GET /urban-problems/organisation/map
 *
 * The organisation is taken from the token, so there is no id to pass. Reports
 * without coordinates are left out by the backend.
 */
export const getOrganisationReportsMap = ({
  status,
  problemType,
  page = 1,
  size = 50,
} = {}) => {
  const query = new URLSearchParams();

  if (status) query.append('status', status);
  if (problemType) query.append('problem-type', problemType);
  query.append('page', page);
  query.append('size', size);

  return apiClient(`${BASE}/organisation/map?${query.toString()}`);
};

/**
 * One report ready to travel to: coordinates, distance from the organisation
 * and links that open the real map.
 * GET /urban-problems/reports/{reportId}/map
 */
export const getUrbanProblemReportMap = (reportId) =>
  apiClient(`${BASE}/reports/${reportId}/map`);
