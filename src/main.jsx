// // // import React from 'react';
// // // import ReactDOM from 'react-dom/client';
// // // import { BrowserRouter } from 'react-router-dom';
// // // import App from './App';
// // // import './index.css';  // optional, keep if you have global styles

// // // ReactDOM.createRoot(document.getElementById('root')).render(
// // //   <React.StrictMode>
// // //     <BrowserRouter>
// // //       <App />
// // //     </BrowserRouter>
// // //   </React.StrictMode>
// // // );

// // import React from 'react';
// // import ReactDOM from 'react-dom/client';
// // import { BrowserRouter } from 'react-router-dom';
// // import App from './App';
// // import './index.css';

// // ReactDOM.createRoot(document.getElementById('root')).render(
// //   <React.StrictMode>
// //     <BrowserRouter>
// //       <App />
// //     </BrowserRouter>
// //   </React.StrictMode>
// // );

// // src/main.jsx
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import './index.css';
// import { useForegroundNotifications } from './hooks/useForegroundNotifications';

// function AppWithFCM() {
//   useForegroundNotifications();
//   return <App />;
// }

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AppWithFCM />
//     </BrowserRouter>
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);