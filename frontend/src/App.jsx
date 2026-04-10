import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Educators from "./pages/Educators";
import Infrastructure from "./pages/Infrastructure";
import Trust from "./pages/Trust";
import PrincipalDesk from "./pages/PrincipalDesk";
import CbseAdmissions from "./pages/CbseAdmissions";
import Reviews from "./pages/Reviews";
import WriteReview from "./pages/WriteReview";
import Gallery from "./pages/Gallery";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Admission from "./pages/Admission";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Sitemap from "./pages/Sitemap";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppMascot from "./components/WhatsAppMascot";
import ScrollToTopButton from "./components/ScrollToTopButton";


// Admin Pages
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import ManageAdmissions from "./pages/Admin/ManageAdmissions";
import ManageContacts from "./pages/Admin/ManageContacts";
import ManageReviews from "./pages/Admin/ManageReviews";
import ManageFees from "./pages/Admin/ManageFees";
import FeesOverview from "./pages/Admin/FeesOverview";

import { api } from "./services/api";
import { useEffect } from "react";
import ReactGA from "react-ga4";

const App = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  // Initialize Google Analytics once
  useEffect(() => {
    ReactGA.initialize("G-RFTKLNSWZ7");
  }, []);

  // Track page views on route change
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

  useEffect(() => {
    const trackVisitor = async () => {
      // Use sessionStorage to count each unique visit (resets when browser closes)
      const hasVisitedThisSession = sessionStorage.getItem("has_visited_this_session");

      if (!hasVisitedThisSession) {
        try {
          await api.incrementViewCount();
          sessionStorage.setItem("has_visited_this_session", "true");
        } catch (err) {
          console.error("Tracking Error:", err);
        }
      }
    };

    trackVisitor();
  }, []);


  return (
    <>
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        {!isAdminPath && <Navbar />}



      {/* Main content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about/educators" element={<Educators />} />
          <Route path="/about/infrastructure" element={<Infrastructure />} />
          <Route path="/about/trust" element={<Trust />} />
          <Route path="/events" element={<Events />} />
          <Route path="/principal-desk" element={<PrincipalDesk />} />
          <Route path="/admissions/cbse" element={<CbseAdmissions />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/write-review" element={<WriteReview />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/sitemap" element={<Sitemap />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="admissions" element={<ManageAdmissions />} />
            <Route path="contacts" element={<ManageContacts />} />
            <Route path="reviews" element={<ManageReviews />} />
            <Route path="fees" element={<FeesOverview />} />
            <Route path="fees/:id" element={<ManageFees />} />
          </Route>
        </Routes>
      </main>

      {!isAdminPath && <WhatsAppMascot />}
      {!isAdminPath && <ScrollToTopButton />}
      {!isAdminPath && <Footer />}
    </div>
    </>
  );
};

export default App;

