import React, { useState, useEffect } from "react";
import { Menubar } from "primereact/menubar";
import "./Header.css";
import { MegaMenu } from "primereact/megamenu";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
const HeaderBar = () => {
  const [showAboveNav, setShowAboveNav] = useState(true);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [isCentersHovered, setIsCentersHovered] = useState(false);

  const handleCentersMouseEnter = () => {
    setIsCentersHovered(true);
    console.log("Mouse entered");
  };
  
  const handleCentersMouseLeave = () => {
    setIsCentersHovered(false);
    console.log("Mouse left");
  };
  


  const handleCentersClick = () => {
    window.location.href = "https://kavintechcorp.in/nnwps/our-centers";
  };

  const handleSpecialtiesClick = () => {
    window.location.href = "https://kavintechcorp.in/nnwps/our-specialties";
  };
  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleMouseEnter = (menuItem) => {
    setHoveredMenu(menuItem);
  };

  // const handleMouseLeave = () => {
  //   setHoveredMenu(null);
  // };
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const sideBarMenuItems = [
    { label: "Home", path: "https://kavintechcorp.in/nnwps" },
    {
      label: "About",
      subItems: [
        { label: "About Us", path: "https://kavintechcorp.in/nnwps/about-us/" },
        {
          label: "Management Team",
          path: "https://kavintechcorp.in/nnwps/management-team/",
        },
      ],
      icon: <i className="pi pi-arrow-right" style={{ color: "#30A194" }}></i>,
    },
    {
      label: "Media",
      subItems: [
        {
          label: "Press",
          path: "https://kavintechcorp.in/nnwps/press-coverage/",
        },
        { label: "Reviews", path: "/reviewsPage" },
        {
          label: "Testimonials",
          path: "https://kavintechcorp.in/nnwps/testimonials/",
        },
        {
          label: "Covid-19 Videos",
          path: "https://kavintechcorp.in/nnwps/covid-19-videos/",
        },
      ],
      icon: <i className="pi pi-arrow-right" style={{ color: "#30A194" }}></i>,
    },
    {
      label: "Academics",
      subItems: [
        {
          label: "Fellowship",
          path: "https://kavintechcorp.in/nnwps/fellowship/",
        },
        {
          label: "Advanced PHACO Training Programme",
          path: "https://kavintechcorp.in/nnwps/cataract-fellowship/",
        },
        {
          label: " ACER Fellowship",
          path: "https://kavintechcorp.in/nnwps/acer/",
        },
        {
          label: " ROP Courses",
          path: "https://kavintechcorp.in/nnwps/rop-courses/",
        },
        {
          label: " International Fellowship",
          path: "https://kavintechcorp.in/nnwps/international-fellowship/",
        },
        {
          label: " NN Optometry",
          path: "https://kavintechcorp.in/nnwps/nn-optometry/",
        },
        {
          label: " PG Training",
          path: "https://kavintechcorp.in/nnwps/pg-training/",
        },
        {
          label: " CME Programs",
          path: "https://nneyefoundation.org/cme-programs/",
        },
      ],
      icon: <i className="pi pi-arrow-right" style={{ color: "#30A194" }}></i>,
    },
    { label: "Career", path: "https://kavintechcorp.in/nnwps/career/" },
    { label: "Blog", path: "https://kavintechcorp.in/nnwps/blogs/" },
    {
      label: "Contact Us",
      subItems: [
        {
          label: "Maps and Direction",
          path: "https://kavintechcorp.in/nnwps/contact-us/",
        },
        {
          label: " International Patients",
          path: "https://kavintechcorp.in/nnwps/international-patients/",
        },
        {
          label: " Privacy Policy",
          path: "https://kavintechcorp.in/nnwps/privacy-policy/",
        },
      ],
      icon: <i className="pi pi-arrow-right" style={{ color: "#30A194" }}></i>,
    },
    {
      label: "Laboratory",
      subItems: [
        {
          label: "General Laboratory",
          path: "https://kavintechcorp.in/nnwps/general-laboratory/",
        },
        {
          label: "Molecular Diagnostics & Laboratory Services",
          path: "https://kavintechcorp.in/nnwps/molecular-diagnostics-and-laboratory-services/",
        },
        {
          label: "Grow Lab",
          path: "http://narayananethralayafoundation.co.in/research",
        },
        {
          label: " Center for Ocular Pathology and Education (COPE)",
          path: "https://kavintechcorp.in/nnwps/center-for-ocular-pathology-and-education-cope/",
        },
      ],
      icon: <i className="pi pi-arrow-right" style={{ color: "#30A194" }}></i>,
    },
    {
      label: "Reports",
      subItems: [
        {
          label: "Biomedical Waste Management",
          path: "https://kavintechcorp.in/nnwps/biomedical-waste-management/",
        },
        { label: "MDX Reports", path: "http://122.185.108.114:8002/" },
        {
          label: "Lab Reports",
          path: "https://nnlabreports.narayananethralaya.in/",
        },
      ],
      icon: <i className="pi pi-arrow-right" style={{ color: "#30A194" }}></i>,
    },
    {
      label: "Download RDC Recipe Book",
      path: "https://kavintechcorp.in/nnwps/rdc-recipe-book/",
    },
    {
      label: "Holistic Wellness Research Center",
      path: "https://kavintech.com/hwrc/",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowAboveNav(false);
      } else {
        setShowAboveNav(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logo = (
    <div
      className="header-logo"
      style={{ cursor: "pointer" }}
      onClick={() => (window.location.href = "https://kavintechcorp.in/nnwps/")}
    >
      <img src="/WebPublic/nn-logo.png" alt="Narayana Nethralaya" />
    </div>
  );
  // const handleNavigation = (path) => {
  //   if (path) {
  //     navigate(path);
  //     setIsSidebarVisible(false); // Close sidebar after navigation
  //   }
  // };
  const handleNavigation = (path) => {
    console.log("Navigating to:", path); // Log the path for debugging
    if (path) {
      if (path.startsWith("https://")) {
        window.open(path, "_self");
      } else {
        navigate(path);
      }
      setIsSidebarVisible(false);
    }
  };

  const menuItems = [
    {
      label: (
        <span
          style={{ color: "white", textAlign: "center" }}
          // onMouseEnter={handleCentersMouseEnter}
          // onMouseLeave={handleCentersMouseLeave}
          // onClick={handleCentersClick}
        >
          <span>Our</span>
          <br />
          <span>Centers</span>
        </span>
      ),
      icon: (
        <img
          src="/WebPublic/hos-icon.svg"
          alt="Our Centers Icon"
          className="nav-icon"
        />
      ),
      root: true,

      // items: isCentersHovered
      // ? [
      //     {
      //       items: [
      //         {
      //           template: () => (
      //             <div
      //               className="dropdown-column-unique"
      //               onClick={() =>
      //                 (window.location.href =
      //                   "https://kavintechcorp.in/nnwps/narayana-nethralaya-at-rajajinagar/")
      //               }
      //               style={{ cursor: "pointer" }}
      //             >
      //               <img
      //                 src="/WebPublic/rajajinagar.jpg"
      //                 alt="NN Rajajinagar"
      //                 className="center-image-unique"
      //               />
      //               <span className="center-name-unique">NN Rajajinagar</span>
      //             </div>
      //           ),
      //         },
      //         {
      //           template: () => (
      //             <div
      //               className="dropdown-column-unique"
      //               onClick={() =>
      //                 (window.location.href =
      //                   "https://kavintechcorp.in/nnwps/narayana-nethralaya-at-indiranagar/")
      //               }
      //               style={{ cursor: "pointer" }}
      //             >
      //               <img
      //                 src="/WebPublic/indiranagar.jpg"
      //                 alt="NN Indiranagar"
      //                 className="center-image-unique"
      //               />
      //               <span className="center-name-unique">NN Indiranagar</span>
      //             </div>
      //           ),
      //         },
      //       ],
      //     },
      //     {
      //       items: [
      //         {
      //           template: () => (
      //             <div
      //               className="dropdown-column-unique"
      //               onClick={() =>
      //                 (window.location.href =
      //                   "https://kavintechcorp.in/nnwps/narayana-nethralaya-electronic-city")
      //               }
      //               style={{ cursor: "pointer" }}
      //             >
      //               <img
      //                 src="/WebPublic/bommasandra.jpg"
      //                 alt="NN Bommasandra"
      //                 className="center-image-unique"
      //               />
      //               <span className="center-name-unique">NN Bommasandra</span>
      //             </div>
      //           ),
      //         },
      //         {
      //           template: () => (
      //             <div
      //               className="dropdown-column-unique"
      //               onClick={() =>
      //                 (window.location.href =
      //                   "https://kavintechcorp.in/nnwps/narayana-nethralaya-bannerghatta/")
      //               }
      //               style={{ cursor: "pointer" }}
      //             >
      //               <img
      //                 src="/WebPublic/bannerghatta.jpg"
      //                 alt="NN Bannerghatta Road"
      //                 className="center-image-unique"
      //               />
      //               <span className="center-name-unique">
      //                 NN Bannerghatta Road
      //               </span>
      //             </div>
      //           ),
      //         },
      //       ],
      //     },
      //   ]
      // : [],
      items: [
        [
          {
            items: [
              {
                template: () => (
                  <div
                    className="dropdown-column-unique"
                    onClick={() =>
                      (window.location.href =
                        "https://kavintechcorp.in/nnwps/narayana-nethralaya-at-rajajinagar/")
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src="/WebPublic/rajajinagar.jpg"
                      alt="NN Rajajinagar"
                      className="center-image-unique"
                    />
                    <span className="center-name-unique">NN Rajajinagar</span>
                  </div>
                ),
              },
              {
                template: () => (
                  <div
                    className="dropdown-column-unique"
                    onClick={() =>
                      (window.location.href =
                        "https://kavintechcorp.in/nnwps/narayana-nethralaya-at-indiranagar/")
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src="/WebPublic/indiranagar.jpg"
                      alt="NN Indiranagar"
                      className="center-image-unique"
                    />
                    <span className="center-name-unique">NN Indiranagar</span>
                  </div>
                ),
              },
            ],
          },
        ],
        [
          {
            items: [
              {
                template: () => (
                  <div
                    className="dropdown-column-unique"
                    onClick={() =>
                      (window.location.href =
                        "https://kavintechcorp.in/nnwps/narayana-nethralaya-electronic-city")
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src="/WebPublic/bommasandra.jpg"
                      alt="NN Bommasandra"
                      className="center-image-unique"
                    />
                    <span className="center-name-unique">NN Bommasandra</span>
                  </div>
                ),
              },
              {
                template: () => (
                  <div
                    className="dropdown-column-unique"
                    onClick={() =>
                      (window.location.href =
                        "https://kavintechcorp.in/nnwps/narayana-nethralaya-bannerghatta/")
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src="/WebPublic/bannerghatta.jpg"
                      alt="NN Bannerghatta Road"
                      className="center-image-unique"
                    />
                    <span className="center-name-unique">
                      NN Bannerghatta Road
                    </span>
                  </div>
                ),
              },
            ],
          },
        ],
      ],
    },
    {
      label: (
        <span style={{ color: "white", textAlign: "center" }}>
          <span>Our</span>
          <br />
          <span>Specialties</span>
        </span>
      ),

      icon: (
        <img
          src="/WebPublic/o-specicn.svg"
          alt="Our Specialties Icon"
          className="nav-icon"
        />
      ),
      root: true,
      items: [
        [
          {
            items: [
              {
                label: "Cataract Surgery",
                icon: "pi pi-eye",
                template: () => (
                  <div
                    className="dropdown-item"
                    onClick={() =>
                      window.open(
                        "https://kavintechcorp.in/nnwps/cataract-refractive-surgery/",
                        "_self"
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src="/WebPublic/cataract.png"
                      alt="Icon"
                      className="eye-img"
                    />
                    Cataract Surgery
                  </div>
                ),
              },
              {
                label: "Cornea",
                icon: "pi pi-eye",
                template: () => (
                  <div
                    className="dropdown-item"
                    onClick={() =>
                      window.open(
                        "https://kavintechcorp.in/nnwps/corneal-services/",
                        "_self"
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src="/WebPublic/cornea.png"
                      alt="Icon"
                      className="eye-img"
                    />
                    Cornea
                  </div>
                ),
              },
              {
                label: "Vitreoretinal Services",
                icon: "pi pi-eye",
                template: () => (
                  <div
                    className="dropdown-item"
                    onClick={() =>
                      window.open(
                        "https://kavintechcorp.in/nnwps/retina-eye-care/",
                        "_self"
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src="/WebPublic/vitreo.png"
                      alt="Icon"
                      className="eye-img"
                    />
                    Vitreo Retinal Services
                  </div>
                ),
              },
              {
                label: "Dry Eye",
                icon: "pi pi-eye",
                template: () => (
                  <div
                    className="dropdown-item"
                    onClick={() =>
                      window.open(
                        "https://kavintechcorp.in/nnwps/dry-eyes/",
                        "_self"
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src="/WebPublic/dry-eye.png"
                      alt="Icon"
                      className="eye-img"
                    />
                    Dry Eye
                  </div>
                ),
              },
              {
                label: "Aesthetics Studio",
                icon: "pi pi-eye",
                template: () => (
                  <div
                    className="dropdown-item"
                    onClick={() =>
                      window.open(
                        "https://kavintechcorp.in/nnwps/nn-aesthetics/",
                        "_self"
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src="/WebPublic/aesthetics.png"
                      alt="Icon"
                      className="eye-img"
                    />
                    Aesthetics Studio
                  </div>
                ),
              },
            ],
          },
        ],
        [
          {
            items: [
              {
                label: "Refractive Surgery",
                icon: "pi pi-eye",
                template: () => (
                  <div
                    className="dropdown-item"
                    onClick={() =>
                      window.open(
                        "https://kavintechcorp.in/nnwps/refractive-surgery/",
                        "_self"
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src="/WebPublic/refractive.png"
                      alt="Icon"
                      className="eye-img"
                    />
                    Refractive Surgery
                  </div>
                ),
              },
              {
                label: "Glaucoma",
                icon: "pi pi-eye",
                template: () => (
                  <div
                    className="dropdown-item"
                    onClick={() =>
                      window.open(
                        "https://kavintechcorp.in/nnwps/glaucoma/",
                        "_self"
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src="/WebPublic/glaucoma.png"
                      alt="Icon"
                      className="eye-img"
                    />
                    Glaucoma
                  </div>
                ),
              },
              {
                label: "Pediatric",
                icon: "pi pi-eye",
                template: () => (
                  <div
                    className="dropdown-item"
                    onClick={() =>
                      window.open(
                        "https://kavintechcorp.in/nnwps/pediatric-ophthalmology/",
                        "_self"
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src="/WebPublic/pediatric.png"
                      alt="Icon"
                      className="eye-img"
                    />
                    Pediatric
                  </div>
                ),
              },
              {
                label: "Oculoplasty, Orbit & Ocular Oncology",
                icon: "pi pi-eye",
                template: () => (
                  <div
                    className="dropdown-item"
                    onClick={() =>
                      window.open(
                        "https://kavintechcorp.in/nnwps/oculoplasty/",
                        "_self"
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src="/WebPublic/ocu.png"
                      alt="Icon"
                      className="eye-img"
                    />
                    Oculoplasty, Orbit & Ocular Oncology
                  </div>
                ),
              },
              {
                label: "Neuro Ophthalmology",
                icon: "pi pi-eye",
                template: () => (
                  <div
                    className="dropdown-item"
                    onClick={() =>
                      window.open(
                        "https://kavintechcorp.in/nnwps/neuro-ophthalmology/",
                        "_self"
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src="/WebPublic/neuro.png"
                      alt="Icon"
                      className="eye-img"
                    />
                    Neuro Ophthalmology
                  </div>
                ),
              },
            ],
          },
        ],
        [
          {
            items: [
              {
                label: "Uveitis",
                icon: "pi pi-eye",
                template: () => (
                  <div
                    className="dropdown-item"
                    onClick={() =>
                      window.open(
                        "https://kavintechcorp.in/nnwps/uveitis-treatment/",
                        "_self"
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src="/WebPublic/uveitis.png"
                      alt="Icon"
                      className="eye-img"
                    />
                    Uveitis
                  </div>
                ),
              },
              {
                label: "Keratoconus",
                icon: "pi pi-eye",
                template: () => (
                  <div
                    className="dropdown-item"
                    onClick={() =>
                      window.open(
                        "https://kavintechcorp.in/nnwps/keratoconus-treatment/",
                        "_self"
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src="/WebPublic/keratoconus.png"
                      alt="Icon"
                      className="eye-img"
                    />
                    Keratoconus
                  </div>
                ),
              },
              {
                label: "Kidrop",
                icon: "pi pi-eye",
                template: () => (
                  <div
                    className="dropdown-item"
                    onClick={() =>
                      window.open(
                        "https://kavintechcorp.in/nnwps/kidrop/",
                        "_self"
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src="/WebPublic/kidrop.png"
                      alt="Icon"
                      className="eye-img"
                    />
                    Kidrop
                  </div>
                ),
              },
              {
                label: "Reversing Diabetes Clinic",
                icon: "pi pi-eye",
                template: () => (
                  <div
                    className="dropdown-item"
                    onClick={() =>
                      window.open(
                        "https://kavintechcorp.in/nnwps/reversing-diabetes-clinic/",
                        "_self"
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src="/WebPublic/reverse.png"
                      alt="Icon"
                      className="eye-img"
                    />
                    Reversing Diabetes Clinic
                  </div>
                ),
              },
              {
                label: "ABC Clinic",
                icon: "pi pi-eye",
                template: () => (
                  <div
                    className="dropdown-item"
                    onClick={() =>
                      window.open(
                        "https://kavintechcorp.in/nnwps/abc-clinic/",
                        "_self"
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src="/WebPublic/abc.png"
                      alt="Icon"
                      className="eye-img"
                    />
                    ABC Clinic
                  </div>
                ),
              },
            ],
          },
        ],
      ],
    },
    {
      label: (
        <span style={{ color: "white", textAlign: "center" }}>
          <span>Our</span>
          <br />
          <span>Doctors</span>
        </span>
      ),
      icon: (
        <img
          src="/WebPublic/doc-icon.svg"
          alt="Our Doctors Icon"
          className="nav-icon"
        />
      ),
      command: () => {
        navigate("/doctors-nn1-rajaji-nagar");
      },
    },
    {
      label: (
        <span style={{ color: "white", textAlign: "center" }}>
          <span> Book an</span>
          <br />
          <span>Appointment</span>
        </span>
      ),
      icon: (
        <img
          src="/WebPublic/material-symbols_calendar-month-outline.png"
          alt="Book an Appointment Icon"
          className="nav-icon"
        />
      ),
      template: () => (
        <div
          className="book-apt"
          onClick={() =>
            (window.location.href =
              "https://kavintechcorp.in/nnwps/appointment/")
          }
          style={{ cursor: "pointer" }}
        >
          <img
            src="/WebPublic/material-symbols_calendar-month-outline.png"
            alt="Book an Appointment Icon"
            className="nav-icon"
            style={{ marginRight: "10px" }}
          />
          <span style={{ color: "white", textAlign: "center" }}>
            <span> Book an</span>
            <br />
            <span>Appointment</span>
          </span>
        </div>
      ),
    },

    {
      label: "",
      icon: "pi pi-bars",
      style: { fontSize: "1.5rem" },
      command: toggleSidebar,
    },
  ];

  const mobileMenuItems = [
    {
      label: (
        <span style={{ color: "white", textAlign: "center" }}>
          <span>Our</span>
          <br />
          <span>Centers</span>
        </span>
      ),
      icon: (
        <img
          src="/WebPublic/hos-icon.svg"
          alt="Our Centers Icon"
          className="nav-icon"
        />
      ),
      root: true,
      items: [
        [
          {
            items: [
              {
                label: "NN Rajajinagar",
                url: "https://kavintechcorp.in/nnwps/narayana-nethralaya-at-rajajinagar/",
                target: "_self",
              },
              {
                label: "NN Bommasandra",
                url: "https://kavintechcorp.in/nnwps/narayana-nethralaya-electronic-city",
                target: "_self",
              },
              {
                label: "NN Indiranagar",
                url: "https://kavintechcorp.in/nnwps/narayana-nethralaya-at-indiranagar/",
                target: "_self",
              },
              {
                label: "NN Bannerghatta Road",
                url: "https://kavintechcorp.in/nnwps/narayana-nethralaya-bannerghatta/",
                target: "_self",
              },
            ],
          },
        ],
      ],
    },
    {
      label: (
        <span style={{ color: "white", textAlign: "center" }}>
          <span>Our</span>
          <br />
          <span>Specialties</span>
        </span>
      ),

      icon: (
        <img
          src="/WebPublic/o-specicn.svg"
          alt="Our Specialties Icon"
          className="nav-icon"
        />
      ),
      root: true,
      items: [
        [
          {
            items: [
              {
                label: "Cataract Surgery",
                url: "https://kavintechcorp.in/nnwps/cataract-refractive-surgery/",
                target: "_self",
              },
              {
                label: "Cornea",
                url: "https://kavintechcorp.in/nnwps/corneal-services/",
                target: "_self",
              },
              {
                label: "Vitreoretinal Services",
                url: "https://kavintechcorp.in/nnwps/retina-eye-care/",
                target: "_self",
              },
              {
                label: "Dry Eye",
                url: "https://kavintechcorp.in/nnwps/dry-eyes/",
                target: "_self",
              },
              {
                label: "Aesthetics Studio",
                url: "https://kavintechcorp.in/nnwps/nn-aesthetics/",
                target: "_self",
              },
              {
                label: "Refractive Surgery",
                url: "https://kavintechcorp.in/nnwps/refractive-surgery/",
                target: "_self",
              },
              {
                label: "Glaucoma",
                url: "https://kavintechcorp.in/nnwps/glaucoma/",
                target: "_self",
              },
              {
                label: "Pediatric",
                url: "https://kavintechcorp.in/nnwps/pediatric-ophthalmology/",
                target: "_self",
              },
              {
                label: "Oculoplasty, Orbit & Ocular Oncology",
                url: "https://kavintechcorp.in/nnwps/oculoplasty/",
                target: "_self",
              },
              {
                label: "Neuro Ophthalmology",
                url: "https://kavintechcorp.in/nnwps/neuro-ophthalmology/",
                target: "_self",
              },
              {
                label: "Uveitis",
                url: "https://kavintechcorp.in/nnwps/uveitis-treatment/",
                target: "_self",
              },
              {
                label: "Keratoconus",
                url: "https://kavintechcorp.in/nnwps/keratoconus-treatment/",
                target: "_self",
              },
              {
                label: "Kidrop",
                url: "https://kavintechcorp.in/nnwps/kidrop/",
                target: "_self",
              },
              {
                label: "Reversing Diabetes Clinic",
                url: "https://kavintechcorp.in/nnwps/reversing-diabetes-clinic/",
                target: "_self",
              },
              {
                label: "ABC Clinic",
                url: "https://kavintechcorp.in/nnwps/abc-clinic/",
                target: "_self",
              },
            ],
          },
        ],
      ],
    },
    {
      label: (
        <span
          style={{ color: "white", textAlign: "center", paddingRight: "10px" }}
        >
          <span>Our</span>
          <br />
          <span>Doctors</span>
        </span>
      ),
      icon: (
        <img
          src="/WebPublic/doc-icon.svg"
          alt="Our Doctors Icon"
          className="nav-icon"
        />
      ),
      command: () => {
        navigate("/doctors-nn1-rajaji-nagar");
      },
    },
  ];

  return (
    <>
      {isMobileView ? (
        <div className="profile-container">
          <div className="profile-header-mobile">
            <div className="flex justify-content-between align-items-center">
              <img
                src="/WebPublic/nn-logo.png"
                alt="Narayana Nethralaya"
                style={{ padding: "10px", width: "150px" }}
                onClick={() =>
                  (window.location.href = "https://kavintechcorp.in/nnwps/")
                }
              />
              <Button
                icon="fa-solid fa-bars"
                className="transparent-button "
                onClick={() => setIsSidebarVisible(true)}
              />
              <Sidebar
                visible={isSidebarVisible}
                onHide={() => setIsSidebarVisible(false)}
                position="right"
                className="hamburger-menu-sidebar"
              >
                <ul className="menu-list">
                  {sideBarMenuItems.map((item, index) => (
                    <li key={item.label} className="menu-item">
                      <div
                        // onClick={() => handleToggle(index)}

                        onClick={() => {
                          // console.log("Clicked on:", item.label);
                          if (!item.subItems) {
                            handleNavigation(item.path);
                          } else {
                            handleToggle(index);
                          }
                        }}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          gap: "12px",
                          marginBottom: "30px",
                          color: activeIndex === index ? "#ffa701" : "#006A4E",
                        }}
                      >
                        {item.label}
                        {item.subItems && (
                          <i
                            className={`pi pi-chevron-down
                    }`}
                            style={{ color: "#006A4E" }}
                          ></i>
                        )}
                      </div>

                      {activeIndex === index && item.subItems && (
                        <ul className="sub-menu">
                          {item.subItems.map((subItem) => (
                            <li
                              key={subItem.label}
                              className="sub-menu-item"
                              style={{ marginTop: "0", marginBottom: "20px" ,marginLeft:"15px"}}
                              onClick={() => handleNavigation(subItem.path)}
                            >
                              {subItem.label}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </Sidebar>
            </div>
            <MegaMenu className="mobilemenu" model={mobileMenuItems} />
          </div>
        </div>
      ) : (
        <div className="profile-container">
          {showAboveNav && (
            <div className="aboveNav">
              <a
                href="https://nneyefoundation.org/eye-donation-form/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <span className="list-text">Pledge your eyes</span>
              </a>
              <a
                href="https://kavintechcorp.in/nnwps/career/"
                style={{ textDecoration: "none" }}
              >
                <span className="list-text">Careers</span>
              </a>
              <a
                href="https://kavintechcorp.in/nnwps/contact-us/"
                style={{ textDecoration: "none" }}
              >
                <span className="list-text">Contact Us</span>
              </a>
            </div>
          )}

          <div className="profile-header">
            <MegaMenu model={menuItems} start={logo} orientation="horizontal" />
            <Sidebar
              visible={isSidebarVisible}
              onHide={() => setIsSidebarVisible(false)}
              position="right"
              className="hamburger-menu-sidebar"
            >
              <div className="hamburger-menu-items">
                <div className="grid">
                  <div className="col-5">
                    <ul
                      style={{
                        fontSize: "18px",
                        fontWeight: "500",
                        color: "#808080",
                      }}
                    >
                      {sideBarMenuItems.map((item) => (
                        <li
                          key={item.label}
                          onMouseEnter={() => handleMouseEnter(item.label)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "12px",
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.color = "#ffa701")
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.color = "#808080")
                          }
                          onClick={() => {
                            if (!item.subItems) {
                              handleNavigation(item.path);
                            }
                          }}
                        >
                          {item.label}
                          {item.icon && item.icon}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="col-6"
                    style={{ backgroundColor: "#E7F4F3", height: "90vh" }}
                  >
                    {hoveredMenu === "About" && (
                      <ul>
                        <li
                          onClick={() =>
                            handleNavigation(
                              "https://kavintechcorp.in/nnwps/about-us/"
                            )
                          }
                        >
                          About Us
                        </li>
                        <li
                          onClick={() =>
                            handleNavigation(
                              "https://kavintechcorp.in/nnwps/management-team/"
                            )
                          }
                        >
                          Management Team
                        </li>
                      </ul>
                    )}
                    {hoveredMenu === "Media" && (
                      <ul>
                        <li
                          onClick={() =>
                            handleNavigation(
                              "https://kavintechcorp.in/nnwps/press-coverage/"
                            )
                          }
                        >
                          Press
                        </li>
                        <li
                          onClick={() => navigate("/reviewsPage")}
                          style={{ cursor: "pointer" }}
                        >
                          Reviews
                        </li>
                        <li
                          onClick={() =>
                            handleNavigation(
                              "https://kavintechcorp.in/nnwps/testimonials/"
                            )
                          }
                        >
                          Testimonials
                        </li>
                        <li
                          onClick={() =>
                            handleNavigation(
                              "https://kavintechcorp.in/nnwps/covid-19-videos/"
                            )
                          }
                        >
                          Covid-19 Videos
                        </li>
                      </ul>
                    )}
                    {hoveredMenu === "Academics" && (
                      <ul>
                        <li
                          onClick={() =>
                            handleNavigation(
                              "https://kavintechcorp.in/nnwps/fellowship/"
                            )
                          }
                        >
                          Fellowship
                        </li>
                        <li
                          onClick={() =>
                            handleNavigation(
                              "https://kavintechcorp.in/nnwps/cataract-fellowship/"
                            )
                          }
                        >
                          Advanced PHACO Training Programme
                        </li>
                        <li
                          onClick={() =>
                            handleNavigation(
                              "https://kavintechcorp.in/nnwps/acer/"
                            )
                          }
                        >
                          ACER Fellowship
                        </li>
                        <li
                          onClick={() =>
                            handleNavigation(
                              "https://kavintechcorp.in/nnwps/rop-courses/"
                            )
                          }
                        >
                          ROP Courses
                        </li>
                        <li
                          onClick={() =>
                            handleNavigation(
                              "https://kavintechcorp.in/nnwps/international-fellowship/"
                            )
                          }
                        >
                          International Fellowship
                        </li>
                        <li
                          onClick={() =>
                            handleNavigation(
                              "https://kavintechcorp.in/nnwps/nn-optometry/"
                            )
                          }
                        >
                          NN Optometry
                        </li>
                        <li
                          onClick={() =>
                            handleNavigation(
                              "https://kavintechcorp.in/nnwps/pg-training/"
                            )
                          }
                        >
                          PG Training
                        </li>
                        <li
                          onClick={() =>
                            handleNavigation(
                              "https://nneyefoundation.org/cme-programs/"
                            )
                          }
                        >
                          CME Programs
                        </li>
                      </ul>
                    )}
                    {hoveredMenu === "Contact Us" && (
                      <ul>
                        <li
                          onClick={() =>
                            handleNavigation(
                              "https://kavintechcorp.in/nnwps/contact-us/"
                            )
                          }
                        >
                          Maps and Direction
                        </li>
                        <li
                          onClick={() =>
                            handleNavigation(
                              "https://kavintechcorp.in/nnwps/international-patients/"
                            )
                          }
                        >
                          International Patients
                        </li>
                        <li
                          onClick={() =>
                            handleNavigation(
                              "https://kavintechcorp.in/nnwps/privacy-policy/"
                            )
                          }
                        >
                          Privacy Policy
                        </li>
                      </ul>
                    )}
                    {hoveredMenu === "Laboratory" && (
                      <ul>
                        <li
                          onClick={() =>
                            handleNavigation(
                              "https://kavintechcorp.in/nnwps/general-laboratory/"
                            )
                          }
                        >
                          General Laboratory
                        </li>
                        <li
                          onClick={() =>
                            handleNavigation(
                              "https://kavintechcorp.in/nnwps/molecular-diagnostics-and-laboratory-services/"
                            )
                          }
                        >
                          Molecular Diagnostics & Laboratory Services
                        </li>
                        <li
                          onClick={() =>
                            handleNavigation(
                              "http://narayananethralayafoundation.co.in/research"
                            )
                          }
                        >
                          Grow Lab
                        </li>
                        <li
                          onClick={() =>
                            handleNavigation(
                              "https://kavintechcorp.in/nnwps/center-for-ocular-pathology-and-education-cope/"
                            )
                          }
                        >
                          Center for Ocular Pathology and Education (COPE)
                        </li>
                      </ul>
                    )}
                    {hoveredMenu === "Reports" && (
                      <ul>
                        <li
                          onClick={() =>
                            handleNavigation(
                              "https://kavintechcorp.in/nnwps/biomedical-waste-management/"
                            )
                          }
                        >
                          Biomedical Waste Management
                        </li>
                        <li
                          onClick={() =>
                            handleNavigation("http://122.185.108.114:8002/")
                          }
                        >
                          MDX Reports
                        </li>
                        <li
                          onClick={() =>
                            handleNavigation(
                              "https://nnlabreports.narayananethralaya.in/"
                            )
                          }
                        >
                          Lab Reports
                        </li>
                      </ul>
                    )}
                  </div>
                  <div className="col-1 hamburger-menu-social">
                    <i
                      className="pi pi-facebook"
                      style={{
                        fontSize: "32px",
                        color: "#129485",
                        marginBottom: "45px",
                      }}
                    />
                    <i
                      className="pi pi-instagram"
                      style={{
                        fontSize: "32px",
                        color: "#129485",
                        marginBottom: "45px",
                      }}
                    />
                    <i
                      className="pi pi-twitter"
                      style={{ fontSize: "32px", color: "#129485" }}
                    />
                  </div>
                </div>
              </div>
            </Sidebar>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderBar;
