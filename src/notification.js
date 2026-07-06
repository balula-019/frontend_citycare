// import { getToken } from "firebase/messaging";
// import { messaging } from "./firebase";

// const VAPID_KEY = "BBGK4krxAlpqKvkD-DvBvDXYVsF2V8LbKcU4lHrAZOTPvsdBj5EjSblBsYjB7U6dKQn8owxRpY5LHdDQMlHTUNI";

// export async function generateFCMToken() {
//     try {

//         // Ask the user for notification permission
//         const permission = await Notification.requestPermission();

//         if (permission !== "granted") {
//             console.log("Notification permission denied.");
//             return null;
//         }

//         // Generate FCM token
//         const token = await getToken(messaging, {
//             vapidKey: VAPID_KEY,
//         });

//         if (token) {
//             console.log("FCM Token:", token);
//             return token;
//         } else {
//             console.log("No registration token available.");
//             return null;
//         }

//     } catch (error) {
//         console.error("Error generating FCM token:", error);
//         return null;
//     }
// }