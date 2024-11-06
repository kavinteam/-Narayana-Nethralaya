// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import HeaderBar from "../../WebLayout/HeaderBar";
// import Footer from "../../WebLayout/FooterNaNe";
// import { Button } from "primereact/button";
// import WebApi from "../../WebApi/WebApi";
// import { BASE_URL } from "../../../../config";
// import "./DoctorsList.css";
// import { ProgressSpinner } from "primereact/progressspinner";
// const NN2DoctorsList = () => {
//   const [activeTab, setActiveTab] = useState("NN2");
//   const [doctorsData1, setDoctorsData1] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const doctorsList = async () => {
//     try {
//       setLoading(true);
//       const requestData = {
//         synceddatetime: "2023-01-24 11:57:34",
//         FormCode: "202",
//         ApiKey: "kavin",
//         AppTypeNo: "3",
//         AppVersion: "1.0.0",
//         DbVersion: "10.4.1",
//         DbSource: "W",
//         fld_practice_location_id: "2",
//       };
//       const result = await WebApi.getDoctorsByPlace(requestData);
//       console.log("res", result.responsemessage);
//       setDoctorsData1(result.responsemessage);
//     } catch (error) {
//       console.error("Error fetching requested data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     doctorsList();
//   }, []);

//   const renderDoctorsByDepartment = () => {
//     // if (loading) {
//     //   return <p>Loading...</p>;
//     // }

//     if (doctorsData1 && doctorsData1.length > 0) {
//       const groupedDoctors = groupDoctorsByDepartment();
//       return Object.keys(groupedDoctors).map((department, index) => (
//         <div key={index}>
//           <h1 className="cat-sur">{department}</h1>
//           <div className="doctor-cards-container">
//             {groupedDoctors[department].map((doctor, docIndex) => (
//               <div
//                 key={docIndex}
//                 className="doctor-card"
//                 onClick={() => navigate(`/doctorProfile/${doctor.fld_rf_id}`)}
//               >
//                 <img
//                   src={`${BASE_URL}${doctor.fld_image_of_doctor}`}
//                   alt={doctor.fld_doc_name}
//                   className="doctor-imageList"
//                 />
//                 <h3>{doctor.fld_doc_name}</h3>
//                 <p>{doctor.fld_designation}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       ));
//     }

//     return <h2 style={{ textAlign: "center" }}>No doctors found.</h2>;
//   };

//   const groupDoctorsByDepartment = () => {
//     const groupedDoctors = {};

//     doctorsData1.forEach((doctor) => {
//       // Check if 'fld_practice_location_id' contains '1'
//       if (doctor.fld_practice_location_id && doctor.fld_practice_location_id.split("$").includes("2")) {
//         const departments = doctor.fld_department_Name.split("$");

//         departments.forEach((department) => {
//           department = department.trim();
//           if (!groupedDoctors[department]) {
//             groupedDoctors[department] = [];
//           }
//           groupedDoctors[department].push(doctor);
//         });
//       }
//     });

//     return groupedDoctors;
//   };

//   return (
//     <div className="list-doc">
//        {loading && (
//         <div className="pro-spin">
//           <ProgressSpinner
//             style={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//             }}
//           />
//         </div>
//       )}
//       <HeaderBar />
//       <div className="headerBanner">
//         <img src="/WebPublic/bg-blck.webp" alt="banner" />
//         <div className="profile-banner">
//           <h1 style={{ paddingTop: "80px" }}>
//             <span style={{ fontSize: "4rem" }}>D</span>OCTORS @ NN
//           </h1>
//         </div>
//       </div>
//       {/* <div className="tabs-container">
//         <button
//           className={`tab-button ${activeTab === "NN1" ? "active" : ""}`}
//           onClick={() => navigate("/doctors-nn1")}
//         >
//           NN1 Rajajinagar
//         </button>
//         <button
//           className={`tab-button ${activeTab === "NN2" ? "active" : ""}`}
//           onClick={() => navigate("/doctors-nn2")}
//         >
//           NN2 Bommasandra
//         </button>
//         <button
//           className={`tab-button ${activeTab === "NN3" ? "active" : ""}`}
//           onClick={() => navigate("/doctors-nn3")}
//         >
//           NN3 Indiranagar
//         </button>
//         <button
//           className={`tab-button ${activeTab === "NN4" ? "active" : ""}`}
//           onClick={() => navigate("/doctors-nn4")}
//         >
//           NN4 Bannerghatta Road
//         </button>
//       </div> */}
//     <div className="tabs-container">
//         <button
//           className={`tab-button ${activeTab === "NN1" ? "active" : ""}`}
//           onClick={() => navigate("/doctors-nn1-rajaji-nagar")}
//         >
//           NN1 Rajajinagar
//         </button>
//         <button
//           className={`tab-button ${activeTab === "NN2" ? "active" : ""}`}
//           // onClick={() => setActiveTab("NN2")}
//           onClick={() => navigate("/doctors-nn2-narayana-health-city")}
//         >
//           NN2 Bommasandra
//         </button>
//         <button
//           className={`tab-button ${activeTab === "NN3" ? "active" : ""}`}
//           onClick={() => navigate("/doctors-nn3-indiranagar")}
//         >
//           NN3 Indiranagar
//         </button>
//         <button
//           className={`tab-button ${activeTab === "NN4" ? "active" : ""}`}
//           onClick={() => navigate("/doctors-nn4-bannerghatta-road")}
//         >
//           NN4 Bannerghatta Road
//         </button>
//       </div>
//       <div className="doctor-cards-container1">
//         {renderDoctorsByDepartment()}
//       </div>

//       <Footer />
//       <div className="floating-buttons">
//         <Button
//           icon="pi pi-phone"
//           className="p-button-rounded p-button-help floating-button phone-button"
//           onClick={() => (window.location.href = "tel:+918066121643")}
//         />
//         <Button
//           icon="pi pi-whatsapp"
//           className="p-button-rounded p-button-success floating-button whatsapp-button"
//           onClick={() => window.open("https://wa.me/918066121643", "_blank")}
//         />
//       </div>
//     </div>
//   );
// };

// export default NN2DoctorsList;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderBar from "../../WebLayout/HeaderBar";
import Footer from "../../WebLayout/FooterNaNe";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import WebApi from "../../WebApi/WebApi";
import { BASE_URL } from "../../../../config";
import "./DoctorsList.css";
import { ProgressSpinner } from "primereact/progressspinner";

const NN2DoctorsList = () => {
  const [activeTab, setActiveTab] = useState("NN2");
  const [doctorsData1, setDoctorsData1] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const doctorsList = async () => {
    try {
      setLoading(true);
      const requestData = {
        synceddatetime: "2023-01-24 11:57:34",
        FormCode: "202",
        ApiKey: "kavin",
        AppTypeNo: "3",
        AppVersion: "1.0.0",
        DbVersion: "10.4.1",
        DbSource: "W",
        fld_practice_location_id: "2",
      };
      const result = await WebApi.getDoctorsByPlace(requestData);
      console.log("res", result.responsemessage);
      setDoctorsData1(result.responsemessage);
    } catch (error) {
      console.error("Error fetching requested data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    doctorsList();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDoctors = doctorsData1.filter((doctor) =>
    doctor.fld_doc_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderDoctors = () => {
    if (searchTerm) {
      // Show only matching doctors without departments when a search term is active
      return (
        <div className="doctor-cards-container">
          {filteredDoctors.map((doctor, index) => (
            <div
              key={index}
              className="doctor-card"
              onClick={() => navigate(`/doctorProfile/${doctor.fld_rf_id}`)}
            >
              <img
                src={`${BASE_URL}${doctor.fld_image_of_doctor}`}
                alt={doctor.fld_doc_name}
                className="doctor-imageList"
              />
              <h3>{doctor.fld_doc_name}</h3>
              <p>{doctor.fld_designation}</p>
            </div>
          ))}
        </div>
      );
    } else {
      // Display grouped doctors by department if no search term
      const groupedDoctors = groupDoctorsByDepartment();
      return Object.keys(groupedDoctors).map((department, index) => (
        <div key={index}>
          <h1 className="cat-sur">{department}</h1>
          <div className="doctor-cards-container">
            {groupedDoctors[department].map((doctor, docIndex) => (
              <div
                key={docIndex}
                className="doctor-card"
                onClick={() => navigate(`/doctorProfile/${doctor.fld_rf_id}`)}
              >
                <img
                  src={`${BASE_URL}${doctor.fld_image_of_doctor}`}
                  alt={doctor.fld_doc_name}
                  className="doctor-imageList"
                />
                <h3>{doctor.fld_doc_name}</h3>
                <p>{doctor.fld_designation}</p>
              </div>
            ))}
          </div>
        </div>
      ));
    }
  };

  const groupDoctorsByDepartment = () => {
    const groupedDoctors = {};
    doctorsData1.forEach((doctor) => {
      const departments = doctor.fld_department_Name.split("$");
      departments.forEach((department) => {
        department = department.trim();
        if (!groupedDoctors[department]) {
          groupedDoctors[department] = [];
        }
        groupedDoctors[department].push(doctor);
      });
    });
    return groupedDoctors;
  };

  return (
    <div className="list-doc">
      {loading && (
        <div className="pro-spin">
          <ProgressSpinner
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      )}
      <HeaderBar />
      <div className="headerBanner">
        <img src="/WebPublic/bg-blck.webp" alt="banner" />
        <div className="profile-banner">
          <h1 style={{ paddingTop: "80px" }}>
            <span style={{ fontSize: "4rem" }}>D</span>OCTORS @ NN
          </h1>
        </div>
      </div>
      <div className="breadcrumbs1" style={{marginTop:"120px"}}>
            <a href="https://kavintechcorp.in/nnwps">Home</a> &gt; <a href="/doctors-nn1-rajaji-nagar">Our doctors</a> &gt;NN2 Bommasandra
          </div>
      <div className="tabs-search-container">
      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === "NN1" ? "active" : ""}`}
          onClick={() => navigate("/doctors-nn1-rajaji-nagar")}
        >
          NN1 Rajajinagar
        </button>
        <button
          className={`tab-button ${activeTab === "NN2" ? "active" : ""}`}
          onClick={() => navigate("/doctors-nn2-narayana-health-city")}
        >
          NN2 Bommasandra
        </button>
        <button
          className={`tab-button ${activeTab === "NN3" ? "active" : ""}`}
          onClick={() => navigate("/doctors-nn3-indiranagar")}
        >
          NN3 Indiranagar
        </button>
        <button
          className={`tab-button ${activeTab === "NN4" ? "active" : ""}`}
          onClick={() => navigate("/doctors-nn4-bannerghatta-road")}
        >
          NN4 Bannerghatta Road
        </button>
      </div>
      
      {/* Search bar */}
      <div className="search-bar">
        <InputText
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search doctor by name..."
        />
      </div>
      </div>

      <div className="doctor-cards-container1">
        {renderDoctors()}
      </div>

      <Footer />
      <div className="floating-buttons">
        <Button
          icon="pi pi-phone"
          className="p-button-rounded p-button-help floating-button phone-button"
          onClick={() => (window.location.href = "tel:+918066121643")}
        />
        <Button
          icon="pi pi-whatsapp"
          className="p-button-rounded p-button-success floating-button whatsapp-button"
          onClick={() => window.open("https://wa.me/918066121643", "_blank")}
        />
      </div>
    </div>
  );
};

export default NN2DoctorsList;
