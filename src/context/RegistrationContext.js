import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Initial Registration State Structure
 */
export const initialRegistrationData = {
  // Authentication
  phone: '',
  otpVerified: false,

  // Selected Language
  language: 'en', // 'en' | 'hi' | 'bn' | 'mr' | 'ta'

  // Step 2: Personal Details + Aadhaar
  personalDetails: {
    fullName: '',
    dateOfBirth: '',
    gender: '', // 'Male' | 'Female' | 'Other'
    email: '',
    profilePhoto: null, // { uri, name, status: 'uploaded' } or image asset
  },
  aadhaar: {
    aadhaarNumber: '',
    frontDocument: null, // { uri, name, status: 'uploaded' }
    backDocument: null,
  },

  // Step 3: Driving Licence
  drivingLicence: {
    licenceNumber: '',
    dateOfBirth: '',
    validUntil: '',
    frontDocument: null,
    backDocument: null,
  },

  // Step 4: Vehicle Details
  vehicle: {
    type: 'Sedan',
    make: 'Toyota',
    model: 'Etios',
    year: '2020',
    color: 'White',
    registrationNumber: '',
  },

  // Step 5: Vehicle Documents
  vehicleDocuments: {
    rc: null, // { uri, name, status: 'uploaded' | 'reviewing' }
    insurance: null,
    puc: null,
    fitness: null,
    permit: null,
  },

  // Step 6: Emergency Contact
  emergencyContact: {
    name: '',
    relationship: '',
    phone: '',
  },

  // Step 7: Location Permission
  location: {
    permissionGranted: false,
  },

  // Post-submission verification state
  // 'not_submitted' | 'pending' | 'approved'
  verificationStatus: 'not_submitted',
};

const RegistrationContext = createContext(null);

export function RegistrationProvider({ children }) {
  // Current app stage:
  // 'splash' | 'onboarding' | 'language' | 'registration' | 'verification_pending' | 'verification_approved' | 'driver_desk'
  const [appStage, setAppStage] = useState('splash');
  
  // Registration Step: 1 to 8
  // 1: Phone + OTP
  // 2: Personal Details + Aadhaar
  // 3: Driving Licence
  // 4: Vehicle Details
  // 5: Vehicle Documents
  // 6: Emergency Contact
  // 7: Location Permission
  // 8: Review & Submit
  const [registrationStep, setRegistrationStep] = useState(1);

  const [registrationData, setRegistrationData] = useState(initialRegistrationData);

  // Partial update helper
  const updateRegistrationData = (section, payload) => {
    setRegistrationData(prev => {
      if (typeof payload === 'object' && !Array.isArray(payload) && payload !== null && typeof prev[section] === 'object') {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            ...payload,
          },
        };
      }
      return {
        ...prev,
        [section]: payload,
      };
    });
  };

  // Move to next logical registration step
  const nextRegistrationStep = () => {
    if (registrationStep < 8) {
      setRegistrationStep(prev => prev + 1);
    } else {
      // Step 8 finished -> submit
      submitForVerification();
    }
  };

  // Move to previous logical registration step
  const prevRegistrationStep = () => {
    if (registrationStep > 1) {
      setRegistrationStep(prev => prev - 1);
    } else {
      // From Step 1 back to Language selection
      setAppStage('language');
    }
  };

  // Jump to specific step (e.g. from Review screen)
  const jumpToStep = stepNumber => {
    if (stepNumber >= 1 && stepNumber <= 8) {
      setRegistrationStep(stepNumber);
      setAppStage('registration');
    }
  };

  // Submit registration for verification
  const submitForVerification = () => {
    setRegistrationData(prev => ({
      ...prev,
      verificationStatus: 'pending',
    }));
    setAppStage('verification_pending');
  };

  // Approve driver (can be triggered by review system or instant demo)
  const approveDriver = () => {
    setRegistrationData(prev => ({
      ...prev,
      verificationStatus: 'approved',
    }));
    setAppStage('verification_approved');
  };

  // Complete onboarding and enter Driver Desk
  const enterDriverDesk = () => {
    setAppStage('driver_desk');
  };

  // Reset registration
  const resetRegistration = () => {
    setRegistrationData(initialRegistrationData);
    setRegistrationStep(1);
    setAppStage('onboarding');
  };

  const value = {
    appStage,
    setAppStage,
    registrationStep,
    setRegistrationStep,
    registrationData,
    setRegistrationData,
    updateRegistrationData,
    nextRegistrationStep,
    prevRegistrationStep,
    jumpToStep,
    submitForVerification,
    approveDriver,
    enterDriverDesk,
    resetRegistration,
  };

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
}

export default RegistrationContext;
