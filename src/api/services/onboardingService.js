import apiClient from '../apiClient';
import { ENDPOINTS } from '../endpoints';
import { UPLOAD_TIMEOUT_MS } from '../config';
import { buildOnboardingFormData } from '../mappers/onboardingMapper';
/**
 * POST /driver/onboarding (Token, multipart/form-data)
 * @param data      registrationData
 * @param stepKeys  all steps (first submit) or only the rejected ones (fix)
 * @returns {{ result: { status: 'UNDER_REVIEW' }, sentKeys: string[] }}
 * @throws ApiError, with `sentKeys` attached so details can be mapped to steps
 */
export async function submitOnboarding(data, stepKeys) {
  const { formData, sentKeys } = buildOnboardingFormData(data, stepKeys);
  try {
    const body = await apiClient.post('/driver/onboarding', formData, {
      timeout: UPLOAD_TIMEOUT_MS,
      transformRequest: requestBody => requestBody,
    });
    console.log("this is full data when you start submmiting doc", body)
    return { result: body.data, sentKeys };
  } catch (error) {
    error.sentKeys = sentKeys;
    throw error;
  }
}
