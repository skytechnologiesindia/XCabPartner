import apiClient from '../apiClient';
/**
 * driverService: Screens 3, 4 and 6 of the binding guide.
 */

/**
 * GET /driver/me (Token)
 * [API] Called after login, on every app open, after a submit and on the
 * Under review screen. Its `nextStep` decides which screen opens.
 * @returns {{ driver: object, nextStep: string, documents: Array<{key, status, reviewNote}> }}
 */
export async function getMe() {
  const body = await apiClient.get('/driver/me');
  console.log("this data from the get me ", body);
  return {
    ...body.data,
    // [API] `documents` is empty before the first submit; default to [] so
    // screens can always loop over it.
    documents: body.data.documents || [],
  };
}

/**
 * GET /driver/documents/requirements (Token)
 * [API] Tells the app which step screens to show, in which order, and which
 * options are AVAILABLE or COMING_SOON. The backend can switch a step off
 * without an app update, so the app must not hardcode this list.
 * @returns {Array<{ key: string, required: boolean, options?: Array<{value, status}> }>}
 */
export async function getRequirements() {
  const body = await apiClient.get('/driver/documents/requirements');
  return body.data.steps || [];
}
