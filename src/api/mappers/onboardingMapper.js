import { STEP_KEYS } from '../constants';
import { toApiDate } from '../../utils/date';

/**
 * onboardingMapper
 * Converts the app's own form state (RegistrationContext.registrationData)
 * into the exact shape POST /driver/onboarding expects, and maps the server's
 * error `details` back to step keys.
 *
 * [API] The screens keep their existing field names (licenceNumber,
 * validTill, "12 Feb 2026" dates, ...). Instead of renaming everything in the
 * UI, this one file translates app fields -> API fields, so the UI and the API
 * contract can change independently.
 *
 * [API] Rules from the guide that this file enforces:
 *   - each step sends ONLY its own fields (an extra field, even empty, is refused)
 *   - dates are "YYYY-MM-DD" text
 *   - each step has fixed photo part names, e.g. DRIVING_LICENCE_FRONT
 */

const trim = value => (typeof value === 'string' ? value.trim() : '');
// Numbers are sent without spaces ("1234 5678 9012" -> "123456789012").
const compact = value => trim(value).replace(/\s+/g, '');

// The app stores gender as the option id ('male'); the API wants 'MALE'.
const toApiGender = gender => (gender ? String(gender).toUpperCase() : '');

// Older drafts only have vehicle.type ('Car', 'Sedan', ...). Only CAR is
// available today, so any car-like type maps to CAR.
function vehicleOption(vehicle = {}) {
  if (vehicle.option) {
    return vehicle.option;
  }
  const type = (vehicle.type || '').toLowerCase();
  if (type.includes('bike')) return 'BIKE';
  if (type.includes('auto')) return 'AUTO';
  return type ? 'CAR' : '';
}

// The Aadhaar/PAN screen keeps both forms; `identityType` says which one the
// driver picked.
function identityChoice(data) {
  const type =
    data.identityType ||
    (data.aadhaar?.aadhaarNumber ? 'aadhaar' : data.pan?.panNumber ? 'pan' : 'aadhaar');
  if (type === 'pan') {
    return {
      option: 'PAN_CARD',
      number: compact(data.pan?.panNumber).toUpperCase(),
      front: data.pan?.frontDocument,
    };
  }
  return {
    option: 'AADHAAR',
    // [API] Aadhaar: the full 12-digit number, digits only.
    number: (data.aadhaar?.aadhaarNumber || '').replace(/[^0-9]/g, ''),
    front: data.aadhaar?.frontDocument,
  };
}

// The Vehicle Details screen keeps RC and Road Tax separately; `numberDocType`
// says which one the driver picked.
function vehicleNumberChoice(vehicle = {}) {
  if (vehicle.numberDocType === 'roadTax') {
    return {
      option: 'ROAD_TAX',
      number: compact(vehicle.roadTax?.number).toUpperCase(),
      front: vehicle.roadTax?.frontDocument,
      back: vehicle.roadTax?.backDocument,
    };
  }
  return {
    option: 'VEHICLE_RC',
    number: compact(vehicle.registrationNumber).toUpperCase(),
    front: vehicle.rcDocuments?.frontDocument,
    back: vehicle.rcDocuments?.backDocument,
  };
}

/**
 * One entry per step key:
 *   fields(data) -> the exact JSON fields of that step (without `key`)
 *   photos(data) -> { PART_NAME: pickedImage }
 */
const STEP_DEFINITIONS = {
  [STEP_KEYS.VEHICLE]: {
    fields: data => ({ option: vehicleOption(data.vehicle) }),
    photos: () => ({}),
  },
  [STEP_KEYS.PERSONAL_INFO]: {
    fields: data => ({
      fullName: trim(data.personalDetails?.fullName),
      dateOfBirth: toApiDate(data.personalDetails?.dateOfBirth),
      gender: toApiGender(data.personalDetails?.gender),
    }),
    photos: data => ({ PERSONAL_INFO_PHOTO: data.personalDetails?.profilePhoto }),
  },
  [STEP_KEYS.PERSONAL_IDENTITY]: {
    fields: data => {
      const { option, number } = identityChoice(data);
      return { option, number };
    },
    // [API] Identity proof has ONE photo slot (front only).
    photos: data => ({ PERSONAL_IDENTITY_FRONT: identityChoice(data).front }),
  },
  [STEP_KEYS.DRIVING_LICENCE]: {
    fields: data => ({
      number: compact(data.drivingLicence?.licenceNumber),
      expiryDate: toApiDate(data.drivingLicence?.validUntil),
    }),
    photos: data => ({
      DRIVING_LICENCE_FRONT: data.drivingLicence?.frontDocument,
      DRIVING_LICENCE_BACK: data.drivingLicence?.backDocument,
    }),
  },
  [STEP_KEYS.VEHICLE_NUMBER]: {
    fields: data => {
      const { option, number } = vehicleNumberChoice(data.vehicle);
      return { option, number };
    },
    photos: data => {
      const choice = vehicleNumberChoice(data.vehicle);
      return { VEHICLE_NUMBER_FRONT: choice.front, VEHICLE_NUMBER_BACK: choice.back };
    },
  },
  [STEP_KEYS.PERMIT]: {
    fields: data => ({
      number: compact(data.permit?.number),
      expiryDate: toApiDate(data.permit?.validTill),
    }),
    photos: data => ({
      PERMIT_FRONT: data.permit?.frontDocument,
      PERMIT_BACK: data.permit?.backDocument,
    }),
  },
  [STEP_KEYS.CAB_INSURANCE]: {
    // [API] Insurance company is only kept on the phone: the API has no field
    // for it, and an unknown field would be refused.
    fields: data => ({
      number: compact(data.insurance?.number),
      expiryDate: toApiDate(data.insurance?.validTill),
    }),
    photos: data => ({ CAB_INSURANCE_FRONT: data.insurance?.frontDocument }),
  },
  [STEP_KEYS.FITNESS]: {
    // [API] Issuing authority is only kept on the phone (no API field).
    fields: data => ({
      number: compact(data.fitness?.number),
      expiryDate: toApiDate(data.fitness?.validTill),
    }),
    photos: data => ({ FITNESS_FRONT: data.fitness?.frontDocument }),
  },
};

/** True when the app knows how to send this step. Unknown keys are skipped. */
export function isKnownStep(key) {
  return !!STEP_DEFINITIONS[key];
}

/** True when every field and every photo of the step is filled in. */
export function isStepComplete(key, data) {
  const definition = STEP_DEFINITIONS[key];
  if (!definition) {
    return false;
  }
  const fields = definition.fields(data);
  const photos = definition.photos(data);
  return (
    Object.values(fields).every(value => !!value) &&
    Object.values(photos).every(photo => !!photoUri(photo))
  );
}

// ProfilePhotoPicker stores a plain uri string; the other pickers store
// { uri, name, type }. Both are accepted.
function photoUri(photo) {
  if (!photo) return null;
  return typeof photo === 'string' ? photo : photo.uri || null;
}

function toFilePart(photo, partName) {
  const uri = photoUri(photo);
  const rawType = (typeof photo === 'object' && photo.type) || 'image/jpeg';
  const type = rawType === 'image/jpg' ? 'image/jpeg' : rawType;
  const extension = type === 'image/png' ? 'png' : 'jpg';
  return {
    uri,
    // [API] Every file part needs a type such as image/jpeg; some Android HTTP
    // libraries fail without it. The server still checks the real bytes.
    type,
    name: `${partName.toLowerCase()}.${extension}`,
  };
}

/**
 * Builds the multipart body for POST /driver/onboarding.
 *
 * @param data      registrationData from RegistrationContext
 * @param stepKeys  steps to send, in order: all steps on first submit, only
 *                  the REJECTED steps when fixing documents
 * @returns {{ formData: FormData, sentKeys: string[] }}
 *          sentKeys is needed later to read errors like data.steps.3.expiryDate
 */
export function buildOnboardingFormData(data, stepKeys) {
  const sentKeys = stepKeys.filter(isKnownStep);
  const steps = sentKeys.map(key => ({ key, ...STEP_DEFINITIONS[key].fields(data) }));

  const formData = new FormData();
  // [API] Exactly ONE text part, named "data", holding the answers as a JSON
  // string (not an object).
  formData.append('data', JSON.stringify({ steps }));
  console.log('Upload data part:', JSON.stringify({ steps }, null, 2));

  // [API] One file part per photo, named after its step. Photos of steps that
  // are not in `data` must not be sent, so only sentKeys are looped.
  sentKeys.forEach(key => {
    const photos = STEP_DEFINITIONS[key].photos(data);
    Object.entries(photos).forEach(([partName, photo]) => {
      if (photoUri(photo)) {
        formData.append(partName, toFilePart(photo, partName));
        console.log('Upload photo part:', partName, toFilePart(photo, partName));
      } else {
        console.log('Upload photo part MISSING:', partName);
      }
    });
  });

  return { formData, sentKeys };
}

// ---- Errors -----------------------------------------------------------------

// [API] Text to show for each `reason` inside error.details (from the guide).
const REASON_MESSAGES = {
  REQUIRED: 'This is required.',
  INVALID_FORMAT: 'Please check the format. Photos must be JPG or PNG.',
  OUT_OF_RANGE: 'A date is out of range. Expired documents cannot be submitted.',
  TOO_SHORT: 'Please enter your full name.',
  TOO_LONG: 'This is too long.',
  NOT_ALLOWED: 'This option is not available yet.',
};

const PHOTO_SUFFIX = /_(FRONT|BACK|PHOTO)$/;

/**
 * Maps one `details[].field` to the step key it belongs to.
 *   data.steps.3.expiryDate -> sentKeys[3]   (position in the list we sent)
 *   data.steps.FITNESS      -> FITNESS       (a required step is missing)
 *   DRIVING_LICENCE_BACK    -> DRIVING_LICENCE (photo part name)
 */
function stepKeyFromField(field, sentKeys) {
  if (!field) return null;
  const stepMatch = field.match(/^data\.steps\.([^.]+)/);
  if (stepMatch) {
    const part = stepMatch[1];
    return /^\d+$/.test(part) ? sentKeys[Number(part)] || null : part;
  }
  if (PHOTO_SUFFIX.test(field)) {
    return field.replace(PHOTO_SUFFIX, '');
  }
  return null;
}

/**
 * Turns an INVALID_INPUT ApiError into { STEP_KEY: message } so the Documents
 * screen can mark the cards that need fixing.
 */
export function mapErrorDetailsToSteps(apiError, sentKeys) {
  const result = {};
  (apiError.details || []).forEach(detail => {
    const key = stepKeyFromField(detail.field, sentKeys);
    if (key && !result[key]) {
      result[key] = REASON_MESSAGES[detail.reason] || apiError.message;
    }
  });
  return result;
}
