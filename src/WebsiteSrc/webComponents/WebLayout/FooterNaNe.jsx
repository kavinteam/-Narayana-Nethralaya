import React from "react";
import { Button } from "primereact/button";
import "./Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="protect-vis">
        <h2 className="pro-h2">
          Protect Your Vision with Top-Quality Eye Care
        </h2>
        <div className="appointment-buttons">
          <Button className="req-call" onClick={() => window.open("https://kavintechcorp.in/nnwps/appointment/", "_self")}>
            <span>Book Appointment</span>
          </Button>
          <Button className="talk-what">
            <span>Call us to Book Appointment</span>
          </Button>
        </div>
      </div>

      <footer className="footer">
        <div className="footergrid">
          <div className="col">
            <div className="footer-section">
              <div className="footer-info">
                <img
                  src="/WebPublic/nn-logo.png"
                  alt="Narayana Nethralaya"
                  className="footer-logo"
                />
                <div className="footer-contact">
                  <p>
                    <i className="pi pi-phone"></i> +91 8066121643
                  </p>
                  <p>
                    <i className="pi pi-map-marker"></i> #121/C Chord Road, 1st
                    ‘R’ Block, Rajaji Nagar, Bangalore -560 010, India.
                  </p>
                  <p>
                    <i className="pi pi-envelope"></i>{" "}
                    info@narayananethralaya.com
                  </p>
                </div>
                <div className="footer-social">
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="pi pi-instagram"></i>
                  </a>
                  <a
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="pi pi-twitter"></i>
                  </a>
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="pi pi-facebook"></i>
                  </a>
                  <a
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="pi pi-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="col">
            <div className="footer-column">
              <h3>Fellowship</h3>
              <ul>
                <li>
                  Explore fellowships, residencies, internships and other
                  educational opportunities.
                </li>
              </ul>
              <hr />
              <h3>Career</h3>
              <ul>
                <li>
                  Learn about career opportunities, search for positions, and
                  apply for a job.
                </li>
              </ul>
              <hr />
              <h3>Laboratory</h3>
              <ul>
                <li>Learn more about laboratory services.</li>
              </ul>
              <hr />
              <h3>Reports</h3>
              <ul>
                <li>Get the latest and year-wise reports.</li>
              </ul>
            </div>
          </div>

          <div className="col">
            <div className="footer-column">
              <h3>Reports</h3>
              <ul>
                <li>
                  <a
                    href="https://kavintechcorp.in/nnwps/fellowship/"
                    target="_self"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Fellowship
                  </a>
                </li>
                <li>
                  <a
                    href="https://kavintechcorp.in/nnwps/cataract-fellowship/"
                    target="_self"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Advanced PHACO Training Programme
                  </a>
                </li>
                <li>
                  <a
                    href="https://kavintechcorp.in/nnwps/acer/"
                    target="_self"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    ACER Fellowship
                  </a>
                </li>
                <li>
                  <a
                    href="https://kavintechcorp.in/nnwps/rop-courses/"
                    target="_self"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    ROP Courses
                  </a>
                </li>
                <li>
                  <a
                    href="https://kavintechcorp.in/nnwps/international-fellowship/"
                    target="_self"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    International Fellowship
                  </a>
                </li>
                <li>
                  <a
                    href="https://kavintechcorp.in/nnwps/nn-optometry/"
                    target="_self"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    NN Optometry
                  </a>
                </li>
                <li>
                  <a
                    href="https://kavintechcorp.in/nnwps/pg-training/"
                    target="_self"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    PG Training
                  </a>
                </li>
                <li>
                  <a
                    href="https://nneyefoundation.org/cme-programs/"
                    target="_self"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    CME Programs
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col">
            <div className="footer-column">
              <h3>Specialities</h3>
              <ul>
                <li>
                  {" "}
                  <a
                    href="https://kavintechcorp.in/nnwps/cataract-refractive-surgery/"
                    target="_self"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Cataract
                  </a>
                </li>
                <li>
                  {" "}
                  <a
                    href="https://kavintechcorp.in/nnwps/corneal-services/"
                    target="_self"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Cornea
                  </a>
                </li>
                <li>
                  <a
                    href="https://kavintechcorp.in/nnwps/refractive-surgery/"
                    target="_self"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Refractive Surgery
                  </a>
                </li>
                <li>
                  <a
                    href="https://kavintechcorp.in/nnwps/dry-eyes/"
                    target="_self"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Dry Eye
                  </a>
                </li>
                <li>
                  <a
                    href="https://kavintechcorp.in/nnwps/nn-aesthetics/"
                    target="_self"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Aesthetics Studio
                  </a>
                </li>
                <li>
                  <a
                    href="https://kavintechcorp.in/nnwps/retina-eye-care/"
                    target="_self"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Vitreo-retinal Services
                  </a>
                </li>
                <li>
                  <a
                    href="https://kavintechcorp.in/nnwps/glaucoma/"
                    target="_self"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Glaucoma
                  </a>
                </li>
                <li>
                  <a
                    href="https://kavintechcorp.in/nnwps/pediatric-ophthalmology/"
                    className="footer-link"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Pediatric
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col">
            <div className="footer-column">
              <h3>Other Links</h3>
              <ul>
                <li>
                  <a
                    href="https://nneyefoundation.org/eye-donation-form/"
                    target="_self"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Pledge your eyes
                  </a>
                </li>
                <li>
                  <a
                    href="https://kavintechcorp.in/nnwps/rdc-recipe-book/"
                    target="_self"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Download RDC Recipe
                  </a>
                </li>
                <li>
                  {" "}
                  <span
                    onClick={() => navigate("/reviewsPage")}
                    style={{ cursor: "pointer", color: "inherit" }}
                  >
                    Reviews
                  </span>
                </li>
                <li>Testimonials</li>
                <li>
                  <a
                    href="https://kavintechcorp.in/nnwps/covid-19-videos/"
                    target="_self"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Covid19
                  </a>
                </li>
                <li>
                  <a
                    href="https://kavintechcorp.in/nnwps/career/"
                    target="_self"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Career
                  </a>
                </li>
                <li>
                  <a
                    href="https://kavintechcorp.in/nnwps/contact-us/"
                    className="footer-link"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        {/* Location Info */}
        <div className="footer-locations">
          <div className="location-item">
            <i className="pi pi-map-marker"></i>{" "}
            <span className="location-name">Rajajinagar</span>
            <p className="loc-address">
              #121/C Chord Road, 1st ‘R’ Block, Rajaji Nagar, Bangalore-560 010,
              India.
            </p>
          </div>
          <div className="location-item">
            <i className="pi pi-map-marker"></i>{" "}
            <span className="location-name">Bommasandra</span>
            <p className="loc-address">
              #258/A, Bommasandra, Hosur Road, Bangalore – 560 099, India.
            </p>
          </div>
          <div className="location-item">
            <i className="pi pi-map-marker"></i>{" "}
            <span className="location-name">Indiranagar</span>
            <p className="loc-address">
              #1/1, 1st main, Binnamangala, Defence Colony, 100 feet road,
              Indiranagar, Bangalore 560038, India.
            </p>
          </div>
          <div className="location-item">
            <i className="pi pi-map-marker"></i>{" "}
            <span className="location-name">Bannerghatta Road</span>
            <p className="loc-address">
              #63, Next to Royal Meenakshi Mall, Bannerghatta Road, Hulimavu,
              Bangalore – 560 076, India.
            </p>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-credits">
          <p>Copyright ©2024. The General Hospital Corporation.</p>
          <p>Designed and Maintained by | KavinTech Corporation</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
