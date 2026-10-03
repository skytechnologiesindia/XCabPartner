# XCab Partner — Backend REST & Real-Time API Specification

> **Version:** 1.0.0  
> **Target Application:** XCab Partner (Driver Mobile App - React Native)  
> **Base URL:** `https://api.xcab.com/api/v1`  
> **WebSocket URL:** `wss://socket.xcab.com/driver`  
> **Content-Type:** `application/json` (or `multipart/form-data` for document uploads)  

---

## Table of Contents

1. [API Architecture & Standards](#1-api-architecture--standards)
2. [Authentication & Onboarding Flow (8-Step Registration)](#2-authentication--onboarding-flow)
   - [2.1 Send Mobile OTP](#21-send-mobile-otp)
   - [2.2 Verify Mobile OTP (Login / Register)](#22-verify-mobile-otp-login--register)
   - [2.3 Resend Mobile OTP](#23-resend-mobile-otp)
   - [2.4 Get Onboarding Status](#24-get-onboarding-status)
   - [2.5 Upload Document Media (Helper)](#25-upload-document-media-helper)
   - [2.6 Step 2: Personal Details & Aadhaar](#26-step-2-personal-details--aadhaar)
   - [2.7 Step 3: Driving Licence](#27-step-3-driving-licence)
   - [2.8 Step 4: Vehicle Details](#28-step-4-vehicle-details)
   - [2.9 Step 5: Vehicle Documents](#29-step-5-vehicle-documents)
   - [2.10 Step 6: Emergency Contact](#210-step-6-emergency-contact)
   - [2.11 Step 8: Final Review & Submit for KYC Verification](#211-step-8-final-review--submit-for-kyc-verification)
3. [Driver Desk & Real-Time State Management (Home)](#3-driver-desk--real-time-state-management)
   - [3.1 Toggle Online / Offline Status](#31-toggle-online--offline-status)
   - [3.2 Update Driver Live GPS Location](#32-update-driver-live-gps-location)
   - [3.3 Get Driver Desk Home Dashboard](#33-get-driver-desk-home-dashboard)
4. [Trip Lifecycle & Execution (Incoming Request -> Completed)](#4-trip-lifecycle--execution)
   - [4.1 Get Current Active Trip](#41-get-current-active-trip)
   - [4.2 Accept Incoming Ride Request](#42-accept-incoming-ride-request)
   - [4.3 Decline Incoming Ride Request](#43-decline-incoming-ride-request)
   - [4.4 Arrived at Pickup Location](#44-arrived-at-pickup-location)
   - [4.5 Verify Rider 4-Digit PIN & Start Trip](#45-verify-rider-4-digit-pin--start-trip)
   - [4.6 Resend Rider Trip PIN](#46-resend-rider-trip-pin)
   - [4.7 Driver Cancellation / Can't Find Rider](#47-driver-cancellation--cant-find-rider)
   - [4.8 Complete Trip](#48-complete-trip)
   - [4.9 Report Issue for Trip](#49-report-issue-for-trip)
5. [Rides History & Management](#5-rides-history--management)
   - [5.1 List Driver Rides (Grouped / Filtered)](#51-list-driver-rides-grouped--filtered)
   - [5.2 Get Ride Details Modal Data](#52-get-ride-details-modal-data)
6. [Earnings, Payouts & Transactions](#6-earnings-payouts--transactions)
   - [6.1 Get Earnings Summary & Analytics](#61-get-earnings-summary--analytics)
   - [6.2 Get Earnings Transactions List](#62-get-earnings-transactions-list)
   - [6.3 Request Instant Payout](#63-request-instant-payout)
7. [Alerts & Notifications](#7-alerts--notifications)
   - [7.1 Get Alerts List](#71-get-alerts-list)
   - [7.2 Mark Alert as Read](#72-mark-alert-as-read)
   - [7.3 Mark All Alerts as Read](#73-mark-all-alerts-as-read)
8. [Driver Profile, Documents & Emergency](#8-driver-profile-documents--emergency)
   - [8.1 Get Driver Profile Details](#81-get-driver-profile-details)
   - [8.2 Update Driver Personal Profile](#82-update-driver-personal-profile)
   - [8.3 Get Driver Vehicle & Regulatory Documents](#83-get-driver-vehicle--regulatory-documents)
   - [8.4 Update / Renew Vehicle Document](#84-update--renew-vehicle-document)
   - [8.5 Get Emergency Contacts](#85-get-emergency-contacts)
   - [8.6 Add / Update Emergency Contact](#86-add--update-emergency-contact)
   - [8.7 Trigger Emergency SOS](#87-trigger-emergency-sos)
   - [8.8 Update Driver Preferences & App Settings](#88-update-driver-preferences--app-settings)
   - [8.9 Delete Driver Account](#89-delete-driver-account)
   - [8.10 Logout Session](#810-logout-session)
9. [WebSocket / Real-Time Events](#9-websocket--real-time-events)

---

## 1. API Architecture & Standards

### 1.1 Headers
For all authenticated requests, pass the JWT token received during OTP verification:
```http
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
Accept-Language: en
X-App-Version: 1.2.0
X-Platform: android | ios
```

### 1.2 Standard Success Response Envelope
```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {}
}
```

### 1.3 Standard Error Response Envelope
```json
{
  "success": false,
  "message": "Validation failed on submitted fields.",
  "errorCode": "INVALID_INPUT_DATA",
  "errors": [
    {
      "field": "registrationNumber",
      "message": "Vehicle registration number must be in standard Indian format (e.g., JH01AB1234)."
    }
  ]
}
```

---

## 2. Authentication & Onboarding Flow

```
[Splash Screen] 
      │
      ▼
[Language Select] ──► [Mobile + OTP] ──► [Personal + Aadhaar] ──► [Driving Licence] 
                                                                        │
[Verification Pending/Approved] ◄── [Review & Submit] ◄── [Emergency] ◄── [Vehicle & Docs]
      │
      ▼
[Driver Desk Dashboard]
```

---

### 2.1 Send Mobile OTP
Sends a 6-digit one-time password (OTP) via SMS to the driver's phone number.

- **Endpoint:** `POST /auth/send-otp`
- **Auth Required:** No

#### Request Body
```json
{
  "phone": "+919123456789",
  "countryCode": "+91"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "OTP has been sent successfully.",
  "data": {
    "phone": "+919123456789",
    "otpExpirySeconds": 60,
    "resendCooldownSeconds": 30,
    "isExistingUser": true
  }
}
```

---

### 2.2 Verify Mobile OTP (Login / Register)
Verifies the submitted OTP. Returns JWT token, onboarding progress step, and KYC approval status.

- **Endpoint:** `POST /auth/verify-otp`
- **Auth Required:** No

#### Request Body
```json
{
  "phone": "+919123456789",
  "otp": "4821",
  "fcmToken": "fcm_token_device_abc123"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "OTP verified successfully.",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "dGhpcy1pcy1hLXJlZnJlc2gtdG9rZW4...",
    "driver": {
      "driverId": "XC784521",
      "phone": "+919123456789",
      "fullName": "Raj Kumar",
      "onboardingCompleted": false,
      "currentStep": 2,
      "verificationStatus": "not_submitted"
    }
  }
}
```
> **verificationStatus Enum:** `"not_submitted"` | `"pending"` | `"approved"` | `"rejected"`

---

### 2.3 Resend Mobile OTP
- **Endpoint:** `POST /auth/resend-otp`
- **Auth Required:** No

#### Request Body
```json
{
  "phone": "+919123456789"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "New OTP sent successfully.",
  "data": {
    "otpExpirySeconds": 60,
    "resendCooldownSeconds": 30
  }
}
```

---

### 2.4 Get Onboarding Status
Used by app launch / splash routing to determine which screen to render.

- **Endpoint:** `GET /driver/onboarding/status`
- **Auth Required:** Yes (`Bearer <token>`)

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Onboarding status retrieved.",
  "data": {
    "currentStep": 4,
    "verificationStatus": "not_submitted",
    "rejectionReason": null,
    "savedData": {
      "language": "en",
      "personalDetails": {
        "fullName": "Raj Kumar",
        "dateOfBirth": "1995-02-14",
        "gender": "Male",
        "email": "rajkumar@gmail.com",
        "profilePhotoUrl": "https://storage.xcab.com/uploads/drivers/avatar_XC784521.jpg"
      },
      "aadhaar": {
        "aadhaarNumber": "482189324821",
        "frontDocumentUrl": "https://storage.xcab.com/uploads/aadhaar_front_XC784521.jpg",
        "backDocumentUrl": "https://storage.xcab.com/uploads/aadhaar_back_XC784521.jpg"
      }
    }
  }
}
```

---

### 2.5 Upload Document Media (Helper)
Uploads an image (photo/document) or PDF to cloud storage (S3 / Cloud Storage / Cloudinary) and returns a permanent secure URL.

- **Endpoint:** `POST /driver/upload-document`
- **Auth Required:** Yes
- **Content-Type:** `multipart/form-data`

#### Form-Data Payload
| Key | Type | Description |
|---|---|---|
| `documentType` | `string` | `profile_photo` \| `aadhaar_front` \| `aadhaar_back` \| `dl_front` \| `dl_back` \| `rc` \| `insurance` \| `puc` \| `fitness` \| `permit` |
| `file` | `File` (Binary) | Image or PDF file |

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "File uploaded successfully.",
  "data": {
    "documentType": "profile_photo",
    "documentUrl": "https://storage.xcab.com/uploads/drivers/avatar_XC784521.jpg",
    "fileName": "avatar_XC784521.jpg",
    "fileSize": 102450,
    "mimeType": "image/jpeg"
  }
}
```

---

### 2.6 Step 2: Personal Details & Aadhaar
- **Endpoint:** `POST /driver/onboarding/personal-details`
- **Auth Required:** Yes

#### Request Body
```json
{
  "fullName": "Raj Kumar",
  "dateOfBirth": "1995-02-14",
  "gender": "Male",
  "email": "rajkumar@gmail.com",
  "profilePhotoUrl": "https://storage.xcab.com/uploads/drivers/avatar_XC784521.jpg",
  "aadhaarNumber": "482189324821",
  "aadhaarFrontUrl": "https://storage.xcab.com/uploads/aadhaar_front_XC784521.jpg",
  "aadhaarBackUrl": "https://storage.xcab.com/uploads/aadhaar_back_XC784521.jpg"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Personal and Aadhaar details saved.",
  "data": {
    "nextStep": 3
  }
}
```

---

### 2.7 Step 3: Driving Licence
- **Endpoint:** `POST /driver/onboarding/driving-licence`
- **Auth Required:** Yes

#### Request Body
```json
{
  "licenceNumber": "JH0120150048219",
  "dateOfBirth": "1995-02-14",
  "validUntil": "2035-02-14",
  "frontDocumentUrl": "https://storage.xcab.com/uploads/dl_front_XC784521.jpg",
  "backDocumentUrl": "https://storage.xcab.com/uploads/dl_back_XC784521.jpg"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Driving licence saved.",
  "data": {
    "nextStep": 4
  }
}
```

---

### 2.8 Step 4: Vehicle Details
- **Endpoint:** `POST /driver/onboarding/vehicle-details`
- **Auth Required:** Yes

#### Request Body
```json
{
  "type": "Sedan",
  "make": "Maruti Suzuki",
  "model": "Dzire",
  "year": "2022",
  "color": "White",
  "registrationNumber": "JH01AB4821"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Vehicle details saved.",
  "data": {
    "nextStep": 5
  }
}
```

---

### 2.9 Step 5: Vehicle Documents
- **Endpoint:** `POST /driver/onboarding/vehicle-documents`
- **Auth Required:** Yes

#### Request Body
```json
{
  "rcDocumentUrl": "https://storage.xcab.com/uploads/rc_JH01AB4821.jpg",
  "rcExpiryDate": "2025-05-21",
  "insuranceDocumentUrl": "https://storage.xcab.com/uploads/ins_JH01AB4821.jpg",
  "insuranceExpiryDate": "2025-11-10",
  "pucDocumentUrl": "https://storage.xcab.com/uploads/puc_JH01AB4821.jpg",
  "pucExpiryDate": "2025-08-05",
  "fitnessDocumentUrl": "https://storage.xcab.com/uploads/fit_JH01AB4821.jpg",
  "fitnessExpiryDate": "2026-01-12",
  "permitDocumentUrl": "https://storage.xcab.com/uploads/permit_JH01AB4821.jpg",
  "permitExpiryDate": "2026-03-30"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Vehicle regulatory documents saved.",
  "data": {
    "nextStep": 6
  }
}
```

---

### 2.10 Step 6: Emergency Contact
- **Endpoint:** `POST /driver/onboarding/emergency-contact`
- **Auth Required:** Yes

#### Request Body
```json
{
  "name": "Suresh Kumar",
  "relationship": "Brother",
  "phone": "+919876543210"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Emergency contact saved.",
  "data": {
    "nextStep": 7
  }
}
```

---

### 2.11 Step 8: Final Review & Submit for KYC Verification
- **Endpoint:** `POST /driver/onboarding/submit`
- **Auth Required:** Yes

#### Request Body
```json
{
  "isConfirmed": true,
  "locationPermissionGranted": true
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Application submitted for KYC verification.",
  "data": {
    "verificationStatus": "pending",
    "estimatedReviewTime": "24 to 48 Hours",
    "supportContact": "1800-247-XCAB"
  }
}
```

---

## 3. Driver Desk & Real-Time State Management

---

### 3.1 Toggle Online / Offline Status
- **Endpoint:** `POST /driver/status/toggle`
- **Auth Required:** Yes

#### Request Body
```json
{
  "isOnline": true,
  "latitude": 23.3441,
  "longitude": 85.3096
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Driver is now online and ready to receive trips.",
  "data": {
    "isOnline": true,
    "status": "scanning",
    "lastStatusChange": "2025-09-18T08:00:00Z"
  }
}
```

---

### 3.2 Update Driver Live GPS Location
Called periodically (every 5-10 seconds) when the driver is online.

- **Endpoint:** `POST /driver/location/update`
- **Auth Required:** Yes

#### Request Body
```json
{
  "latitude": 23.3441,
  "longitude": 85.3096,
  "heading": 180.5,
  "speed": 24.2,
  "accuracy": 5.0
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Location updated."
}
```

---

### 3.3 Get Driver Desk Home Dashboard
Populates the top statistics bar, online status, promotional cards, and demand banners.

- **Endpoint:** `GET /driver/desk/dashboard`
- **Auth Required:** Yes

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Dashboard data loaded.",
  "data": {
    "isOnline": true,
    "currentTrip": null,
    "todayStats": {
      "earnings": "₹1,240",
      "earningsAmount": 1240,
      "ridesCompleted": 8,
      "onlineTime": "4h 15m",
      "acceptanceRate": "94%"
    },
    "promoCard": {
      "title": "Unlock ₹500 Bonus",
      "subtitle": "Complete 5 more trips before 10:00 PM today.",
      "actionText": "View Offers",
      "progress": 3,
      "target": 8
    },
    "highDemandZone": {
      "isHighDemand": true,
      "area": "Morabadi, Ranchi",
      "multiplier": "1.3x",
      "timeWindow": "7:00 PM – 10:00 PM"
    }
  }
}
```

---

## 4. Trip Lifecycle & Execution

```
[Scanning/Idle] 
      │ (Socket event: ride:incoming_request)
      ▼
[Incoming Ride Request Sheet] (5s countdown)
      ├─► [Decline] ──► [Back to Scanning]
      │
      └─► [Accept]
            │
            ▼
      [At Pickup Sheet] ──► [Can't Find Rider Modal] (Wait / Call / Cancel)
            │
            ▼
      [Enter Trip PIN Screen] (Verify 4-digit code)
            │
            ▼
      [On Trip Sheet / Live Navigation]
            │
            ▼
      [End Trip Sheet / Complete] ──► [Report Issue Modal (Optional)]
```

---

### 4.1 Get Current Active Trip
Used if driver app restarts, gets backgrounded, or reconnects.

- **Endpoint:** `GET /trips/current`
- **Auth Required:** Yes

#### Success Response (When Active Trip Exists - `200 OK`)
```json
{
  "success": true,
  "message": "Active trip found.",
  "data": {
    "trip": {
      "tripId": "XC-84920",
      "stage": "pickup",
      "rider": {
        "id": "rider-109",
        "name": "Aarav M.",
        "rating": "4.8",
        "totalRides": 120,
        "phone": "+919876543210"
      },
      "pickup": {
        "address": "Main Road, Ranchi",
        "city": "Ranchi",
        "latitude": 23.3441,
        "longitude": 85.3096
      },
      "drop": {
        "address": "Lalpur Market, Ranchi",
        "city": "Ranchi",
        "latitude": 23.3651,
        "longitude": 85.3289
      },
      "estimatedDistance": "6.4 km",
      "estimatedDuration": "18 min",
      "estimatedFare": "₹180",
      "paymentMethod": "Cash",
      "demandType": "NORMAL",
      "createdAt": "2025-09-18T10:20:00Z"
    }
  }
}
```
> **trip.stage Enum:** `"request"` | `"pickup"` | `"enterPin"` | `"onTrip"` | `"completed"`

---

### 4.2 Accept Incoming Ride Request
- **Endpoint:** `POST /trips/:tripId/accept`
- **Auth Required:** Yes

#### Request Parameters
- `tripId` (URL path): e.g. `XC-84920`

#### Request Body
```json
{
  "driverLatitude": 23.3441,
  "driverLongitude": 85.3096
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Trip accepted successfully.",
  "data": {
    "tripId": "XC-84920",
    "stage": "pickup",
    "pickupEta": "4 min",
    "rider": {
      "name": "Aarav M.",
      "phone": "+919876543210",
      "rating": "4.8"
    }
  }
}
```

---

### 4.3 Decline Incoming Ride Request
- **Endpoint:** `POST /trips/:tripId/decline`
- **Auth Required:** Yes

#### Request Body
```json
{
  "reason": "Too far away"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Trip request declined."
}
```

---

### 4.4 Arrived at Pickup Location
- **Endpoint:** `POST /trips/:tripId/arrived-at-pickup`
- **Auth Required:** Yes

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Rider notified that you have arrived.",
  "data": {
    "tripId": "XC-84920",
    "arrivedAt": "2025-09-18T10:24:00Z",
    "freeWaitTimeSeconds": 180
  }
}
```

---

### 4.5 Verify Rider 4-Digit PIN & Start Trip
Matches the PIN entered on the `EnterPinScreen`.

- **Endpoint:** `POST /trips/:tripId/verify-pin`
- **Auth Required:** Yes

#### Request Body
```json
{
  "pin": "1234"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "PIN verified successfully. Trip started.",
  "data": {
    "tripId": "XC-84920",
    "stage": "onTrip",
    "startedAt": "2025-09-18T10:26:00Z",
    "navigationDestination": {
      "address": "Lalpur Market, Ranchi",
      "latitude": 23.3651,
      "longitude": 85.3289
    }
  }
}
```

#### Error Response — Invalid PIN (`400 Bad Request`)
```json
{
  "success": false,
  "message": "Please ask the rider to confirm their PIN.",
  "errorCode": "INVALID_TRIP_PIN"
}
```

---

### 4.6 Resend Rider Trip PIN
Triggers a push notification and SMS to the rider with their trip OTP.

- **Endpoint:** `POST /trips/:tripId/resend-pin`
- **Auth Required:** Yes

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "PIN sent to rider's registered phone number."
}
```

---

### 4.7 Driver Cancellation / Can't Find Rider
Used when driver has arrived but rider does not show up, or in case of an issue.

- **Endpoint:** `POST /trips/:tripId/cancel`
- **Auth Required:** Yes

#### Request Body
```json
{
  "cancellationReasonId": "rider_not_present",
  "reasonText": "Waited more than 5 minutes at pickup location.",
  "waitedSeconds": 310
}
```
> **cancellationReasonId Enums:** `"rider_not_present"` | `"rider_denied_ride"` | `"wrong_pickup_address"` | `"vehicle_breakdown"` | `"other"`

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Trip has been cancelled.",
  "data": {
    "tripId": "XC-84920",
    "cancellationFeeCredited": 30.00,
    "walletBalance": 1278.00
  }
}
```

---

### 4.8 Complete Trip
Driver arrives at drop point and completes the trip. Calculates actual fare, distance, and time.

- **Endpoint:** `POST /trips/:tripId/complete`
- **Auth Required:** Yes

#### Request Body
```json
{
  "endLatitude": 23.3651,
  "endLongitude": 85.3289,
  "tollAmountPaid": 0
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Trip completed successfully.",
  "data": {
    "tripId": "XC-84920",
    "fare": "₹180",
    "fareAmount": 180,
    "paymentMethod": "Cash",
    "distance": "6.4 km",
    "duration": "18 min",
    "breakdown": {
      "baseFare": "₹50",
      "distanceFare": "₹95",
      "timeFare": "₹35",
      "taxes": "₹15",
      "commission": "₹15",
      "driverEarning": "₹165"
    }
  }
}
```

---

### 4.9 Report Issue for Trip
Supports all issue categories from `ReportIssueSheet` (Fare issues, Rider issues, Lost items, Trip detail mismatch, Vehicle problems, Safety concerns).

- **Endpoint:** `POST /trips/:tripId/report-issue`
- **Auth Required:** Yes

#### Request Body
```json
{
  "category": "fare_payment",
  "subReasonId": "payment_not_received",
  "comment": "Rider exited without paying cash amount of ₹180.",
  "attachmentUrls": [
    "https://storage.xcab.com/uploads/support/proof_1.jpg"
  ]
}
```
> **category Enums:** `"fare_payment"` | `"rider_issue"` | `"lost_item"` | `"trip_details"` | `"vehicle_issue"` | `"safety_concern"` | `"something_else"`

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Issue ticket created. Our team will review within 2 hours.",
  "data": {
    "ticketId": "TCK-928174",
    "status": "OPEN"
  }
}
```

---

## 5. Rides History & Management

---

### 5.1 List Driver Rides (Grouped / Filtered)
- **Endpoint:** `GET /driver/rides`
- **Auth Required:** Yes

#### Query Parameters
| Param | Type | Description |
|---|---|---|
| `filter` | `string` | `all` (default) \| `completed` \| `cancelled` |
| `page` | `number` | Page number (default: `1`) |
| `limit` | `number` | Records per page (default: `20`) |

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Rides list fetched.",
  "data": {
    "counts": {
      "all": 12,
      "completed": 9,
      "cancelled": 3
    },
    "groupedRides": [
      {
        "dateGroup": "Today",
        "date": "18 Sep 2025",
        "rides": [
          {
            "id": "XA3B9211",
            "time": "10:24 AM",
            "pickup": "Main Road",
            "pickupCity": "Ranchi",
            "drop": "Lalpur Market",
            "dropCity": "Ranchi",
            "rider": "Aarav M.",
            "riderRating": "4.8",
            "duration": "18 min",
            "distance": "6.4 km",
            "fare": "₹180",
            "fareAmount": 180,
            "paymentMethod": "Cash",
            "status": "completed",
            "breakdown": {
              "baseFare": "₹50",
              "distanceFare": "₹95",
              "timeFare": "₹35",
              "taxes": "₹15",
              "driverEarning": "₹165"
            }
          }
        ]
      }
    ]
  }
}
```

---

### 5.2 Get Ride Details Modal Data
- **Endpoint:** `GET /driver/rides/:rideId`
- **Auth Required:** Yes

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Ride details retrieved.",
  "data": {
    "id": "XA3B9211",
    "date": "18 Sep 2025",
    "time": "10:24 AM",
    "pickup": "Main Road",
    "pickupCity": "Ranchi",
    "drop": "Lalpur Market",
    "dropCity": "Ranchi",
    "rider": "Aarav M.",
    "riderRating": "4.8",
    "duration": "18 min",
    "distance": "6.4 km",
    "fare": "₹180",
    "fareAmount": 180,
    "paymentMethod": "Cash",
    "status": "completed",
    "breakdown": {
      "baseFare": "₹50",
      "distanceFare": "₹95",
      "timeFare": "₹35",
      "taxes": "₹15",
      "driverEarning": "₹165"
    }
  }
}
```

---

## 6. Earnings, Payouts & Transactions

---

### 6.1 Get Earnings Summary & Analytics
- **Endpoint:** `GET /driver/earnings`
- **Auth Required:** Yes

#### Query Parameters
| Param | Type | Description |
|---|---|---|
| `period` | `string` | `weekly` (default) \| `monthly` \| `yearly` |

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Earnings data retrieved.",
  "data": {
    "periodKey": "weekly",
    "label": "This Week",
    "total": "₹4,860",
    "totalAmount": 4860,
    "growth": "+12% from last week",
    "growthPositive": true,
    "chart": [
      { "day": "Mon", "amount": "₹320", "value": 320, "isHighest": false },
      { "day": "Tue", "amount": "₹450", "value": 450, "isHighest": false },
      { "day": "Wed", "amount": "₹620", "value": 620, "isHighest": false },
      { "day": "Thu", "amount": "₹1,120", "value": 1120, "isHighest": true },
      { "day": "Fri", "amount": "₹780", "value": 780, "isHighest": false },
      { "day": "Sat", "amount": "₹620", "value": 620, "isHighest": false },
      { "day": "Sun", "amount": "₹450", "value": 450, "isHighest": false }
    ],
    "stats": {
      "rides": 26,
      "ridesLabel": "Rides",
      "onlineTime": "9h 32m",
      "onlineTimeLabel": "Online Time",
      "avgFare": "₹186",
      "avgFareLabel": "Avg. Fare"
    },
    "payout": {
      "date": "Tuesday, 23 Sep",
      "amount": "₹4,200",
      "status": "Processing"
    }
  }
}
```

---

### 6.2 Get Earnings Transactions List
- **Endpoint:** `GET /driver/earnings/transactions`
- **Auth Required:** Yes

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Transactions list retrieved.",
  "data": {
    "transactions": [
      {
        "id": "tx-001",
        "title": "Ride Payment",
        "route": "Lalpur Market → Kanke",
        "timestamp": "18 Sep 2025, 10:24 AM",
        "amount": "₹180",
        "method": "Cash",
        "type": "completed"
      },
      {
        "id": "tx-002",
        "title": "Ride Payment",
        "route": "Main Road → Morabadi",
        "timestamp": "18 Sep 2025, 08:12 AM",
        "amount": "₹205",
        "method": "UPI",
        "type": "completed"
      },
      {
        "id": "tx-003",
        "title": "Cancelled Trip",
        "route": "Station Road → Khelgaon",
        "timestamp": "17 Sep 2025, 06:42 PM",
        "amount": "₹0",
        "method": "-",
        "type": "cancelled"
      }
    ]
  }
}
```

---

### 6.3 Request Instant Payout
- **Endpoint:** `POST /driver/earnings/request-payout`
- **Auth Required:** Yes

#### Request Body
```json
{
  "amount": 2500.00,
  "bankAccountId": "bank_hdfc_4821"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Instant payout request initiated.",
  "data": {
    "payoutId": "PO-918231",
    "amount": 2500.00,
    "fee": 10.00,
    "netCredited": 2490.00,
    "status": "Processing",
    "referenceId": "UTR98213749"
  }
}
```

---

## 7. Alerts & Notifications

---

### 7.1 Get Alerts List
- **Endpoint:** `GET /driver/alerts`
- **Auth Required:** Yes

#### Query Parameters
| Param | Type | Description |
|---|---|---|
| `category` | `string` | `all` (default) \| `trips` \| `payouts` \| `documents` |

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Alerts retrieved.",
  "data": {
    "unreadCount": "02",
    "alerts": [
      {
        "id": "alert-001",
        "type": "ride_request",
        "category": "trips",
        "title": "New ride request",
        "subtitle": "Pickup in 4 min",
        "route": [
          { "type": "pickup", "text": "Main Road, Ranchi" },
          { "type": "drop", "text": "Lalpur Market" }
        ],
        "time": "Now",
        "unread": true,
        "targetScreen": "Desk"
      },
      {
        "id": "alert-002",
        "type": "payout",
        "category": "payouts",
        "title": "Settlement confirmed",
        "subtitle": "Trip XC-1048",
        "details": [
          "Payout of ₹180 credited",
          "Wallet Balance: ₹1,248"
        ],
        "time": "12 min ago",
        "unread": true,
        "targetScreen": "Earnings"
      },
      {
        "id": "alert-003",
        "type": "document",
        "category": "documents",
        "title": "Documents expire in 14 days",
        "subtitle": "Update RC",
        "details": [
          "Your Vehicle RC will expire on 21 May 2025",
          "Update now to avoid disruptions."
        ],
        "time": "Yesterday",
        "unread": false,
        "targetScreen": "Profile"
      }
    ]
  }
}
```

---

### 7.2 Mark Alert as Read
- **Endpoint:** `PATCH /driver/alerts/:alertId/read`
- **Auth Required:** Yes

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Alert marked as read."
}
```

---

### 7.3 Mark All Alerts as Read
- **Endpoint:** `POST /driver/alerts/mark-all-read`
- **Auth Required:** Yes

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "All notifications marked as read."
}
```

---

## 8. Driver Profile, Documents & Emergency

---

### 8.1 Get Driver Profile Details
- **Endpoint:** `GET /driver/profile`
- **Auth Required:** Yes

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Driver profile loaded.",
  "data": {
    "driverId": "XC784521",
    "name": "Raj Kumar",
    "fullName": "Raj Kumar",
    "phone": "+91 91234 56789",
    "email": "rajkumar@gmail.com",
    "dateOfBirth": "14 Feb 1995",
    "gender": "Male",
    "avatar": "https://storage.xcab.com/uploads/drivers/avatar_XC784521.jpg",
    "rating": "4.92",
    "totalRides": "1,320",
    "experience": "2+ yrs",
    "isVerified": true,
    "address": {
      "line1": "Main Road, Ranchi",
      "line2": "Jharkhand - 834001"
    },
    "aadhaar": "XXXX XXXX 4821",
    "pan": "XXXXXXX732K",
    "accountInfo": {
      "joinedOn": "12 Mar 2023",
      "accountStatus": "Active",
      "kycStatus": "Verified"
    },
    "stats": {
      "todayEarnings": "₹1,240",
      "weeklyEarnings": "₹4,860",
      "completionRate": "98.5%",
      "hoursOnline": "42h"
    }
  }
}
```

---

### 8.2 Update Driver Personal Profile
- **Endpoint:** `PUT /driver/profile`
- **Auth Required:** Yes

#### Request Body
```json
{
  "email": "rajkumar.new@gmail.com",
  "avatarUrl": "https://storage.xcab.com/uploads/drivers/avatar_new.jpg",
  "address": {
    "line1": "Circular Road, Ranchi",
    "line2": "Jharkhand - 834001"
  }
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Profile updated successfully."
}
```

---

### 8.3 Get Driver Vehicle & Regulatory Documents
- **Endpoint:** `GET /driver/vehicle-documents`
- **Auth Required:** Yes

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Vehicle and document list retrieved.",
  "data": {
    "vehicle": {
      "name": "White Sedan",
      "registration": "JH 01 AB 4821",
      "status": "active",
      "statusText": "Active on XCab",
      "type": "Sedan",
      "makeModel": "Maruti Dzire",
      "year": "2022",
      "color": "White"
    },
    "documents": [
      {
        "id": "rc",
        "type": "registration",
        "title": "Registration Certificate (RC)",
        "validity": "Valid till 21 May 2025",
        "status": "valid",
        "iconType": "car"
      },
      {
        "id": "insurance",
        "type": "insurance",
        "title": "Insurance",
        "validity": "Valid till 10 Nov 2025",
        "status": "valid",
        "iconType": "shield"
      },
      {
        "id": "puc",
        "type": "puc",
        "title": "Pollution Under Control (PUC)",
        "validity": "Valid till 05 Aug 2025",
        "status": "valid",
        "iconType": "leaf"
      },
      {
        "id": "dl",
        "type": "license",
        "title": "Driving License",
        "validity": "Valid till 14 Feb 2035",
        "status": "valid",
        "iconType": "license"
      },
      {
        "id": "fitness",
        "type": "fitness",
        "title": "Fitness Certificate",
        "validity": "Expired on 12 Jan 2025",
        "status": "expired",
        "iconType": "document"
      },
      {
        "id": "permit",
        "type": "permit",
        "title": "Permit (Commercial)",
        "validity": "Valid till 30 Mar 2026",
        "status": "valid",
        "iconType": "permit"
      }
    ]
  }
}
```

---

### 8.4 Update / Renew Vehicle Document
- **Endpoint:** `PUT /driver/vehicle-documents/:docType`
- **Auth Required:** Yes

#### Request Parameters
- `docType`: `rc` | `insurance` | `puc` | `fitness` | `permit`

#### Request Body
```json
{
  "documentUrl": "https://storage.xcab.com/uploads/fitness_renewed_2026.jpg",
  "expiryDate": "2026-01-12"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Document uploaded and submitted for review.",
  "data": {
    "id": "fitness",
    "status": "reviewing"
  }
}
```

---

### 8.5 Get Emergency Contacts
- **Endpoint:** `GET /driver/emergency-contacts`
- **Auth Required:** Yes

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Emergency contacts retrieved.",
  "data": {
    "primary": {
      "id": "contact-001",
      "name": "Suresh Kumar",
      "relationship": "Brother",
      "phone": "+91 98765 43210",
      "location": "Ranchi, Jharkhand",
      "status": "active"
    },
    "alternate": null
  }
}
```

---

### 8.6 Add / Update Emergency Contact
- **Endpoint:** `POST /driver/emergency-contacts`
- **Auth Required:** Yes

#### Request Body
```json
{
  "type": "primary",
  "name": "Suresh Kumar",
  "relationship": "Brother",
  "phone": "+919876543210",
  "location": "Ranchi, Jharkhand"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Emergency contact updated."
}
```

---

### 8.7 Trigger Emergency SOS
Sends immediate alert to the XCab Safety Response Team and dispatches SMS/location coordinates to the driver's registered emergency contacts.

- **Endpoint:** `POST /driver/sos`
- **Auth Required:** Yes

#### Request Body
```json
{
  "latitude": 23.3441,
  "longitude": 85.3096,
  "currentTripId": "XC-84920",
  "batteryLevel": "84%"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "SOS alert triggered. Safety team and emergency contacts alerted.",
  "data": {
    "incidentId": "SOS-98124",
    "safetyDeskPhone": "1800-247-XCAB-HELP"
  }
}
```

---

### 8.8 Update Driver Preferences & App Settings
- **Endpoint:** `PUT /driver/settings/preferences`
- **Auth Required:** Yes

#### Request Body
```json
{
  "language": "hi",
  "theme": "Light",
  "pushNotificationsEnabled": true,
  "soundAlertsEnabled": true
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Preferences updated."
}
```

---

### 8.9 Delete Driver Account
- **Endpoint:** `POST /driver/account/delete`
- **Auth Required:** Yes

#### Request Body
```json
{
  "reason": "Moving to another city",
  "feedback": "Great experience overall",
  "confirmPhone": "+919123456789"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Account scheduled for permanent deletion in 30 days."
}
```

---

### 8.10 Logout Session
- **Endpoint:** `POST /auth/logout`
- **Auth Required:** Yes

#### Request Body
```json
{
  "fcmToken": "fcm_token_device_abc123"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Logged out successfully."
}
```

---

## 9. WebSocket / Real-Time Events

The driver app communicates over WebSocket for latency-critical trip dispatches and coordinate broadcasts.

### 9.1 Connection
Connect with driver JWT token:
```js
const socket = io('wss://socket.xcab.com/driver', {
  auth: {
    token: 'Bearer <JWT_TOKEN>'
  },
  transports: ['websocket']
});
```

### 9.2 Client -> Server Events

#### `driver:location`
Stream driver location every 5s while online.
```json
{
  "latitude": 23.3441,
  "longitude": 85.3096,
  "heading": 180.5,
  "speed": 24.2
}
```

---

### 9.3 Server -> Client Events

#### `ride:incoming_request`
Triggers the `RideRequestSheet` popup with a 5-second decision timer.
```json
{
  "tripId": "XC-84920",
  "riderName": "Aarav M.",
  "rating": "4.8 (120)",
  "pickupLocation": "Main Road, Ranchi",
  "dropLocation": "Lalpur Market, Ranchi",
  "pickupLat": 23.3441,
  "pickupLng": 85.3096,
  "dropLat": 23.3651,
  "dropLng": 85.3289,
  "distance": "3.2 km",
  "estimatedFare": "₹180",
  "paymentMethod": "Cash / UPI",
  "demand": "NORMAL",
  "pickupTime": "4 min",
  "timeoutSeconds": 5
}
```

#### `ride:cancelled_by_rider`
Sent when rider cancels before or after pickup.
```json
{
  "tripId": "XC-84920",
  "reason": "Rider cancelled before pickup",
  "cancellationFee": 30.00
}
```

#### `payout:processed`
Notifies driver of settlement credited to their bank account.
```json
{
  "payoutId": "PO-918231",
  "amount": "₹4,200",
  "bankName": "HDFC Bank •••• 4821",
  "referenceId": "UTR98213749"
}
```

---

## Summary of All APIs

| # | Endpoint | Method | Purpose |
|---|---|---|---|
| **1** | `/auth/send-otp` | `POST` | Send OTP for mobile login/signup |
| **2** | `/auth/verify-otp` | `POST` | Verify OTP & receive JWT token |
| **3** | `/auth/resend-otp` | `POST` | Resend OTP |
| **4** | `/auth/logout` | `POST` | Logout session |
| **5** | `/driver/onboarding/status` | `GET` | Get current step and KYC verification status |
| **6** | `/driver/upload-document` | `POST` | Upload photo/document (multipart) |
| **7** | `/driver/onboarding/personal-details` | `POST` | Save step 2 personal details & Aadhaar |
| **8** | `/driver/onboarding/driving-licence` | `POST` | Save step 3 driving licence |
| **9** | `/driver/onboarding/vehicle-details` | `POST` | Save step 4 vehicle specs |
| **10** | `/driver/onboarding/vehicle-documents` | `POST` | Save step 5 vehicle regulatory documents |
| **11** | `/driver/onboarding/emergency-contact` | `POST` | Save step 6 emergency contact |
| **12** | `/driver/onboarding/submit` | `POST` | Step 8 final submission for KYC review |
| **13** | `/driver/status/toggle` | `POST` | Go Online / Offline |
| **14** | `/driver/location/update` | `POST` | Broadcast driver GPS coordinates |
| **15** | `/driver/desk/dashboard` | `GET` | Get driver desk stats & home cards |
| **16** | `/trips/current` | `GET` | Fetch active trip on app open/reconnect |
| **17** | `/trips/:tripId/accept` | `POST` | Accept ride request |
| **18** | `/trips/:tripId/decline` | `POST` | Decline ride request |
| **19** | `/trips/:tripId/arrived-at-pickup` | `POST` | Mark arrived at pickup location |
| **20** | `/trips/:tripId/verify-pin` | `POST` | Verify 4-digit trip PIN to start ride |
| **21** | `/trips/:tripId/resend-pin` | `POST` | Resend PIN to rider |
| **22** | `/trips/:tripId/cancel` | `POST` | Cancel trip with reason |
| **23** | `/trips/:tripId/complete` | `POST` | Complete trip & calculate fare |
| **24** | `/trips/:tripId/report-issue` | `POST` | Submit issue report for trip |
| **25** | `/driver/rides` | `GET` | Get list of rides (all, completed, cancelled) |
| **26** | `/driver/rides/:rideId` | `GET` | Get single ride details & fare breakdown |
| **27** | `/driver/earnings` | `GET` | Get weekly/monthly/yearly earnings & chart |
| **28** | `/driver/earnings/transactions` | `GET` | Get transactions list |
| **29** | `/driver/earnings/request-payout` | `POST` | Request payout |
| **30** | `/driver/alerts` | `GET` | Get notifications & unread counts |
| **31** | `/driver/alerts/:alertId/read` | `PATCH` | Mark alert as read |
| **32** | `/driver/alerts/mark-all-read` | `POST` | Mark all alerts as read |
| **33** | `/driver/profile` | `GET` | Get driver profile & identity |
| **34** | `/driver/profile` | `PUT` | Update profile info |
| **35** | `/driver/vehicle-documents` | `GET` | Get attached vehicle & regulatory documents |
| **36** | `/driver/vehicle-documents/:docType` | `PUT` | Re-upload renewed vehicle document |
| **37** | `/driver/emergency-contacts` | `GET` | Get emergency contacts |
| **38** | `/driver/emergency-contacts` | `POST` | Update emergency contact |
| **39** | `/driver/sos` | `POST` | Emergency SOS trigger |
| **40** | `/driver/settings/preferences` | `PUT` | Update language/theme/notifications |
| **41** | `/driver/account/delete` | `POST` | Request driver account deletion |
