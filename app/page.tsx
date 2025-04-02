// "use client";
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import LoginForm from '@/app/Login/page';
// import ProfileSection from '@/components/ProfileSection';
// import Home from '@/components/Home';
// import Assistant from '@/app/Assistant/page'; 
// import { isAuthenticated } from '../lib/axios';

// const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
//   return isAuthenticated() ? children : <Navigate to="/login" replace />;
// };

// function App() {
//   return (
//     <Router>
//       <Toaster position="top-right" />
//       <Routes>
//         <Route path="/Login" element={
//           isAuthenticated() ? <Navigate to="/" replace /> : <LoginForm />
//         } />
//         <Route path="/" element={
//           <PrivateRoute>
//             <>
//               {/* <Header /> */}
//               <Home />
//             </>
//           </PrivateRoute>
//         } />
//         <Route path="/profile" element={
//           <PrivateRoute>
//             <>
//               {/* <Header /> */}
//               <ProfileSection />
//             </>
//           </PrivateRoute>
//         } />
//        <Route path="/assistant" element={
//   <PrivateRoute>
//     <>
//       {/* <Header /> */}
//       <Assistant />
//     </>
//   </PrivateRoute>
// } />
       
//         {/* Catch all route - redirect to login if not authenticated, home if authenticated */}
//         <Route path="*" element={
//           isAuthenticated() ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
//         } />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
"use client";
import React from 'react';
import { Toaster } from 'react-hot-toast';
import Profile from '@/app/Profile/page';
import Home from '@/components/Home';
import Assistant from '@/app/Assistant/page';
import { usePathname } from 'next/navigation';

function App() {
  const pathname = usePathname();

  // Render the appropriate component based on the current path
  const renderContent = () => {
    switch (pathname) {
      case '/':
        return <Home />;
      case '/profile':
        return <Profile />;
      case '/assistant':
        return <Assistant />;
      default:
        return <Home />; // Default to Home if the path is not recognized
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      {renderContent()}
    </>
  );
}
export default App;