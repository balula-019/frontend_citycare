// // // // Import the functions you need from the SDKs you need
// // // import { initializeApp } from "firebase/app";
// // // import { getAnalytics } from "firebase/analytics";
// // // // TODO: Add SDKs for Firebase products that you want to use
// // // // https://firebase.google.com/docs/web/setup#available-libraries

// // // // Your web app's Firebase configuration
// // // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// // // const firebaseConfig = {
// // //   apiKey: "AIzaSyDEf2Ximqe8R1F_qELGz79ryjoZH2VXSow",
// // //   authDomain: "patachako-145f4.firebaseapp.com",
// // //   projectId: "patachako-145f4",
// // //   storageBucket: "patachako-145f4.firebasestorage.app",
// // //   messagingSenderId: "638169465425",
// // //   appId: "1:638169465425:web:8338f873e5beb934d82e70",
// // //   measurementId: "G-84BZFBVJZX"
// // // };

// // // // Initialize Firebase
// // // const app = initializeApp(firebaseConfig);
// // // const analytics = getAnalytics(app);

// // // firebase.js
// // import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// // import { getMessaging } from "firebase/messaging"; // ✅ added

// // const firebaseConfig = {
// //   apiKey: "AIzaSyDEf2Ximqe8R1F_qELGz79ryjoZH2VXSow",
// //   authDomain: "patachako-145f4.firebaseapp.com",
// //   projectId: "patachako-145f4",
// //   storageBucket: "patachako-145f4.firebasestorage.app",
// //   messagingSenderId: "638169465425",
// //   appId: "1:638169465425:web:8338f873e5beb934d82e70",
// //   measurementId: "G-84BZFBVJZX"
// // };

// // const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app); // you can keep or remove if not used

// // export const messaging = getMessaging(app); // ✅ added

// // export default app;

// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyDEf2Ximqe8R1F_qELGz79ryjoZH2VXSow",
//   authDomain: "patachako-145f4.firebaseapp.com",
//   projectId: "patachako-145f4",
//   storageBucket: "patachako-145f4.firebasestorage.app",
//   messagingSenderId: "638169465425",
//   appId: "1:638169465425:web:8338f873e5beb934d82e70",
//   measurementId: "G-84BZFBVJZX"
// };

// const app = initializeApp(firebaseConfig);

// export const messaging = getMessaging(app);
// export default app;