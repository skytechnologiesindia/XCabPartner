import { storage, STORAGE_KEYS } from '../utils/storage';


let cachedToken = null;
let tokenLoaded = false;

export async function getToken() {
  if (!tokenLoaded) {
    cachedToken = await storage.getItem(STORAGE_KEYS.TOKEN);
    tokenLoaded = true;
  }
  return cachedToken;
}

export async function saveToken(token) {
  cachedToken = token;
  tokenLoaded = true;
  await storage.setItem(STORAGE_KEYS.TOKEN, token);
}

export async function clearSession() {
  cachedToken = null;
  tokenLoaded = true;
  // Removes token, phone, logged-in flag and cached driver data.
  await storage.clearAuth();
}

/**
 * [API] "Any 401 from a Token call means: delete the token and open the phone
 * number screen." The api client cannot navigate, so it calls this; the
 * navigator registers the real handler (see RootNavigator / App).
 */
let sessionExpiredHandler = null;

export function setSessionExpiredHandler(handler) {
  sessionExpiredHandler = handler;
}

export async function handleSessionExpired() {
  await clearSession();
  if (sessionExpiredHandler) {
    sessionExpiredHandler();
  }
}
