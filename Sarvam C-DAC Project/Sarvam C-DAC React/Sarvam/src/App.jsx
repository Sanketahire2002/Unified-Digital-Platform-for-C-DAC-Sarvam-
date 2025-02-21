import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Components
import SplashScreen from './Sarvam_Components/SplashScreen_Components/SplashScreen';
import Navbar from './Sarvam_Components/Navbar_Components/Navbar';
import Footer from './Sarvam_Components/Footer_Components/Footer';
import Home from './Sarvam_Components/Home_Components/Home';
import About from './Sarvam_Components/About_Components/About';
import Contact from './Sarvam_Components/Contact_Components/Contact';
import Placements from './Sarvam_Components/Placements_Components/Placement';
import Login from './Sarvam_Components/Login_Components/Login';
import Admission from './Sarvam_Components/Admission_Components/Admission';
import Payment from './Sarvam_Components/Admission_Components/Payment';
import FaqPage from './Sarvam_Components/FAQ_Components/FaqPage';
import PrivacyPolicyPage from './Sarvam_Components/FAQ_Components/PrivacyPolicyPage';
import TermsAndConditionsPage from './Sarvam_Components/FAQ_Components/TermsAndConditionsPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Import ScrollToTop component
import ScrollToTop from './Sarvam_Components/App_Components/ScrollToTop'; // Adjust the import path if needed


import AdminMainDashboard from './Sarvam_Components/Dashboards_Components/AdminDashboardsComponents';
import StudentMainDashboard from './Sarvam_Components/Dashboards_Components/StudentDashboardComponents';
import ModuleCoordinatorMainDashboard from './Sarvam_Components/Dashboards_Components/ModuleCoordinatorDashboardComponents';
import CourseCoordinatorMainDashboard from './Sarvam_Components/Dashboards_Components/CourseCoordinatorDashboardComponents';
import InstructorMainDashboard from './Sarvam_Components/Dashboards_Components/InstructorDashboardComponents';
import TPOMainDashboard from './Sarvam_Components/Dashboards_Components/TPODashboardComponents';

import Test from './Sarvam_Components/Dashboards_Components/StudentDashboardComponents/Test';

import GenrateQuiz  from './Sarvam_Components/Dashboards_Components/StudentDashboardComponents/GenrateQuiz';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Show SplashScreen for 3 seconds

    return () => clearTimeout(timer);
  }, []);


  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Navbar />
                <About />
                <Footer />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <Contact />
                <Footer />
              </>
            }
          />
          <Route
            path="/placement"
            element={
              <>
                <Navbar />
                <Placements />
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Login />
                <Footer />
              </>
            }
          />
          <Route
            path="/admission"
            element={
              <>
                <Navbar />
                <Admission />
                <Footer />
              </>
            }
          />
          <Route
            path="/faq"
            element={
              <>
                <Navbar />
                <FaqPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/privacy"
            element={
              <>
                <Navbar />
                <PrivacyPolicyPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/terms"
            element={
              <>
                <Navbar />
                <TermsAndConditionsPage />
                <Footer />
              </>
            }
          />

          <Route path="/go-to-admin-dashboard/*" element={<AdminMainDashboard />} />
          <Route path="/go-to-student-dashboard/*" element={<StudentMainDashboard />} />
          <Route path="/go-to-modulecoordinator-dashboard/*" element={<ModuleCoordinatorMainDashboard />} />
          <Route path="/go-to-coursecoordinator-dashboard/*" element={<CourseCoordinatorMainDashboard />} />
          <Route path="/go-to-instructor-dashboard/*" element={<InstructorMainDashboard />} />
          <Route path="/go-to-tpo-dashboard/*" element={<TPOMainDashboard />} />
          <Route path="/pay-fees" element={<Payment />} />
          <Route path="/GenrateQuiz" element={<GenrateQuiz />} />
          <Route path="/give-test-browser" element={<Test />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
