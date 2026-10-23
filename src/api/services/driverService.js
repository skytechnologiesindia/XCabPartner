import apiClient from '../apiClient';
/**
 * driverService: Screens 3, 4 and 6 of the binding guide.
 * @returns {{ driver: object, nextStep: string, documents: Array<{key, status, reviewNote}> }}
 */
export async function getMe() {
  const response = await apiClient.get('/driver/me');
  console.log("this data from the get me ", JSON.stringify(response));
  return {
    ...response.data,
    documents: response.data.documents || [],
  };
}

/**
 * GET /driver/documents/requirements (Token)
 * @returns {Array<{ key: string, required: boolean, options?: Array<{value, status}> }>}
 */
export async function getRequirements() {
  const response = await apiClient.get('/driver/documents/requirements');
  console.log("this data from the get requirements ", JSON.stringify(response));
  return response.data.steps || [];
}
