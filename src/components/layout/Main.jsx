import React, { useRef, useState, useEffect } from "react";
import { Menu } from "primereact/menu";
import { TieredMenu } from "primereact/tieredmenu";
import { Button } from "primereact/button";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Dashboard from "./../pages/Dashboard";
import GoogleReviews from "../pages/GoogleReviews";
import DoctorMaster from "../pages/DoctorMaster";
import Reports from "../pages/Reports";

const Main=()=> {
  const menu = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);
  const clearSession = () => {
    sessionStorage.clear();
    // localStorage.removeItem('sessionId');
    navigate("/");
  };

  const displayContent = () => {
    return (
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/googlereviews" element={<GoogleReviews />} />
        <Route exact path="/doctormaster" element={<DoctorMaster/>} />
        <Route exact path="/reports" element={<Reports/>} />
      </Routes>
    );
  };

  const items1 = [
    {
      label: "Log out",
      icon: "pi pi-sign-out",
      command: () => {
        clearSession();
      },
      // style: { fontFamily: '"Poppins", sans-serif' }
    },
  ];

  const SuperItems = [
    {
      label: (
        <p className={`m-0 pt-1 ${activeTab === "/main/dashboard" ? "active-text" : ""}`}>
          Dashboard
        </p>
      ),
      icon: activeTab === "/main/dashboard" ? (
        <i className="fa-solid fa-house" style={{ fontSize: "22px", color: "#129485", paddingRight: "10px" }} />
      ) : (
        <i className="pi pi-home" style={{ fontSize: "24px", paddingRight: "10px" }} />
      ),
      className: activeTab === "/main/dashboard" ? "active-tab" : "",
      command: () => {
        setActiveTab("/main/dashboard");
        navigate("/main/dashboard");
      },
    },
    {
      label: (
        <p className={`m-0 ${activeTab === "/main/googlereviews" ? "active-text" : ""}`}>
          Google reviews
        </p>
      ),
      icon: activeTab === "/main/googlereviews" ? (
        <img src="/G__logo.png" style={{width:"26px" , marginRight:"10px" }} alt="google logo"/>
      ) : (
        <i className="pi pi-google" style={{ fontSize: "22px", paddingRight: "10px" }} />
      ),
      className: activeTab === "/main/googlereviews" ? "active-tab" : "",
      command: () => {
        setActiveTab("/main/googlereviews");
        navigate("/main/googlereviews");
      },
    },
    {
      label: (
        <p className={`m-0 ${activeTab === "/main/doctormaster" ? "active-text" : ""}`}>
          Doctor Master
        </p>
      ),
      icon: activeTab === "/main/doctormaster" ? (
        <i className="fa-solid fa-stethoscope" style={{ fontSize: "24px", color: "#129485", paddingRight: "10px" }} />
      ) : (
        <i className="fa-solid fa-stethoscope" style={{ fontSize: "24px", paddingRight: "10px" }} />
      ),
      className: activeTab === "/main/doctormaster" ? "active-tab" : "",
      command: () => {
        setActiveTab("/main/doctormaster");
        navigate("/main/doctormaster");
      },
    },
    {
      label: (
        <p className={`m-0 ${activeTab === "/main/reports" ? "active-text" : ""}`}>
          Reports
        </p>
      ),
      icon: activeTab === "/main/reports" ? (
        <i className="fa-solid fa-clipboard" style={{ fontSize: "25px", color: "#129485", paddingRight: "10px" }} />
      ) : (
        <i className="pi pi-clipboard" style={{ fontSize: "24px", paddingRight: "10px" }} />
      ),
      className: activeTab === "/main/reports" ? "active-tab" : "",
      command: () => {
        setActiveTab("/main/reports");
        navigate("/main/reports");
      },
    },
  ];
  return (
    <>
    <div className="sidebar">
      <div className="flex justify-content-center mt-5">
        <img src="/Logo.png" alt="logo" style={{ width: "180px" }} />
      </div>
      <div className="menu-container">
        <Menu model={SuperItems} className="sidebarMenu mt-7 pl-4" />
      </div>
      <div className="sidebartieredmenu-container" style={{display: "flex", justifyContent: "center",  marginBottom: "15px"}}>
        <TieredMenu model={items1} popup ref={menu} />
        <Button
          className="sidebartieredmenu pi pi-user"
          onClick={(e) => menu.current.toggle(e)}
        >
          <span className="menuFont">Administrator</span> <i className="pi pi-chevron-up" />
        </Button>
      </div>
    </div>
    <div className="cardStyle">
      <div>{displayContent()}</div>
    </div>
  </>
  );
}
export default Main;