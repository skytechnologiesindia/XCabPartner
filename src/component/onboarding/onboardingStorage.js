/**
 * Onboarding Persistence Storage
 * Lightweight session & local persistence tracker for onboarding completion.
 */

let isOnboardingFinished = false;

export const setOnboardingCompleted = (completed = true) => {
  isOnboardingFinished = completed;
};

export const getOnboardingCompleted = () => {
  return isOnboardingFinished;
};

export default {
  setOnboardingCompleted,
  getOnboardingCompleted,
};
