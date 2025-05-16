import LandingPage from "./components/LandingPage";
import CookiePolicy from "./components/CookiePolicy";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router basename="/NexusHiveCRM-frontend">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
      </Routes>
    </Router>
  );
}