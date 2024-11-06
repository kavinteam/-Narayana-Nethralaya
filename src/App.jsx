import { Route, Routes, useNavigate ,useLocation} from "react-router-dom";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "./App.css";
import Login from "./components/auth/Login";
import Main from "./components/layout/Main";
import { useEffect } from "react";
import DoctorProfile from './WebsiteSrc/webComponents/WebPages/doctorprofile/DoctorProfile';
import NN1DoctorList from './WebsiteSrc/webComponents/WebPages/doctorlist/NN1DoctorsList';
import ReviewsPage from './WebsiteSrc/webComponents/WebPages/ReviewsPage'
import NN2DoctorsList from "./WebsiteSrc/webComponents/WebPages/doctorlist/NN2DoctosList";
import NN3DoctorsList from "./WebsiteSrc/webComponents/WebPages/doctorlist/NN3DoctorsList";
import NN4DoctorsList from "./WebsiteSrc/webComponents/WebPages/doctorlist/NN4DoctorsList";
import ScrollToTop from "./ScrollTop";
function App() {
  const hasSessionId = !!sessionStorage.getItem("sessionId");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // if (!hasSessionId) {
    //   navigate("/");
    // }
    if (!hasSessionId && (location.pathname === "/" || location.pathname.startsWith("/main"))) {
      navigate("/");
    }
  }, [hasSessionId, navigate]);
  return (
    <div>
        <ScrollToTop />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main/*" element={<Main />} />
        <Route path="/doctorProfile/:rf_id" element={<DoctorProfile/>} />
        <Route path="/doctors-nn1-rajaji-nagar" element={<NN1DoctorList />} />
        <Route path="/doctors-nn2-narayana-health-city" element={<NN2DoctorsList />} />
        <Route path="/doctors-nn3-indiranagar" element={<NN3DoctorsList />} />
        <Route path="/doctors-nn4-bannerghatta-road" element={<NN4DoctorsList />} />
        <Route path="/reviewsPage" element={<ReviewsPage/>} />
        <Route path="/reviewsPage/:location" element={<ReviewsPage />} />
      </Routes>
    </div>
  );
}

export default App;
