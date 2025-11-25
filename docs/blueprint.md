# **App Name**: BoneCheck AI

## Core Features:

- X-ray Image Upload: Allows users to upload X-ray images for analysis.
- On-Device AI Analysis: Runs a TFLite model to classify bone density from X-ray images into Normal, Osteopenia, or Osteoporosis.
- Risk Assessment Tool: LLM uses the image uploaded as a tool to inform the probability of osteopenia or osteoporosis.
- Result Display: Clearly displays the AI's bone density classification result to the user.
- Result Saving: Saves user results, including the classification and date, to Firebase Firestore.
- History View: Allows users to view their past bone density assessment results stored in Firebase.
- Secure Authentication: Secure user authentication using Firebase Authentication to protect user data.

## Style Guidelines:

- Primary color: Pale Blue (#ADD8E6), evokes a sense of calm and reliability, like a clear sky.
- Background color: Very pale blue (#F0F8FF), provides a clean, clinical feel that doesn't distract from the content.
- Accent color: Soft Lavender (#E6E6FA), provides gentle contrast and supports a calm and clinical mood.
- Body and headline font: 'PT Sans' for clear and accessible text.
- Code font: 'Source Code Pro' for any displayed code.
- Use clean, minimalist icons representing bone health and data analysis.
- Subtle animations to confirm actions like uploading and saving data.