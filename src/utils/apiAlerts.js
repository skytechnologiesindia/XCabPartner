import { Alert } from 'react-native';
import { SUPPORT_PHONE } from '../api';

/**
 * [API] ACCOUNT_BANNED can come from verify-otp and every Token call. The
 * guide says "open the support screen"; there is no support screen yet, so the
 * support contact is shown in an alert from one shared place.
 */
export function showAccountBannedAlert(onClose) {
  Alert.alert(
    'Account blocked',
    `Your account has been blocked. Please contact TREEPS support at ${SUPPORT_PHONE}.`,
    [{ text: 'OK', onPress: onClose }],
  );
}
