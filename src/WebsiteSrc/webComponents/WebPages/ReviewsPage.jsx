import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderBar from "../WebLayout/HeaderBar";
import Footer from "../WebLayout/FooterNaNe";
import { Button } from "primereact/button";
import RajajinagarReviews from "./locations/RajajinagarReviews";
import BommasandraReviews from "./locations/BommasandraReviews";
import IndiranagarReviews from "./locations/IndiranagarReviews";
import BannerghattaReviews from "./locations/BannerghattaReviews";
import "./ReviewsPage.css";
const ReviewsPage = () => {
  // const [currentPage, setCurrentPage] = useState("reviewsPage");
  const navigate = useNavigate();
  const { location } = useParams();

  const locationComponents = {
    nn1: <RajajinagarReviews />,
    nn2: <BommasandraReviews />,
    nn3: <IndiranagarReviews />,
    nn4: <BannerghattaReviews />,
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  if (location && locationComponents[location]) {
    return locationComponents[location];
  }
  // const handleLocationClick = () => {
  //   setCurrentPage("rajajinagar");
  //   window.scrollTo(0, 0);
  // };

  // if (currentPage === "rajajinagar") {
  //   return <RajajinagarReviews />;
  // }
  return (
    <div className="profile-container">
      <HeaderBar />
      <div  className="list-doc">
        <div className="headerBanner">
          <img src="/WebPublic/bg-blck.webp" alt="banner" />
          <div className="reviews-banner">
            <h1>
              <span style={{ fontSize: "4rem" }}>R</span>eviews
            </h1>
          </div>
        </div>
        <div className="reviews-page-container">
          <div className="breadcrumbs">
            <a href="https://kavintechcorp.in/nnwps">Home</a> &gt; <a href="https://kavintechcorp.in/nnwps/media">Media</a> &gt; Reviews
          </div>

          <h1 className="review-title">Narayana Nethralaya Reviews</h1>

          <div className="review-section">
            <div className="review-item">
              <img
                src="/WebPublic/Narayana-Nethralaya-Reviews.webp"
                alt="Google Reviews"
                className="google-logo"
              />
            </div>
            <div className="review-item">
              <img
                src="/WebPublic/FB_Reviews.webp"
                alt="Facebook Reviews"
                className="fb-logo"
              />
            </div>
          </div>
        </div>
        <div className="grid mb-3 flex justify-content-center align-items-center image-text-section">
          <div className="col-4">
            <img
              src="/WebPublic/Reviews_img.webp"
              alt="Image"
              className="left-image"
            />
          </div>
          <div className="col-5 textContent">
            <p>
              Patient satisfaction is an important and commonly used indicator
              for measuring the quality in health care. It is thus a very
              effective indicator to measure the success of doctors and
              hospitals. According to a survey, satisfied patients share their
              experience with five others while the average patient with an
              unresolved complaint will share to nine to ten people.
            </p>
            <p>
              We at Narayana Nethralaya use patient satisfaction as a
              performance tool to measure quality of health care services. The
              patient feedbacks coming from various sources on monthly basis are
              evaluated, results are analyzed & patient satisfaction index is
              been calculated. For year 2021, the patient satisfaction benchmark
              number set is 92%. The feedback received is analyzed thoroughly
              and helps to improve the service standards and processes within
              the organization. Our current rating on social media platforms are
              (Google - 4.8 and Facebook - 4.9). Patient satisfaction affects
              clinical outcomes, patient retention, and medical malpractice
              claims. It affects the timely, efficient, and patient-centered
              delivery of quality health care.
            </p>
          </div>
        </div>
        <div className="locations-page-container">
          <h1 className="locations-title">NN Reviews by Centre</h1>
          <div className="locations-grid">
            <div
              className="location-item"
              onClick={() => navigate("/reviewsPage/nn1")}
            >
              <img
                src="/WebPublic/rajajinagar.jpg"
                alt="Rajajinagar"
                className="location-image"
              />
              <div className="location-info">
                <h3>Rajajinagar</h3>
                <p>Narayana Nethralaya</p>
              </div>
            </div>

            <div
              className="location-item"
              onClick={() => navigate("/reviewsPage/nn2")}
            >
              <img
                src="/WebPublic/bommasandra.jpg"
                alt="Bommasandra"
                className="location-image"
              />
              <div className="location-info">
                <h3>Bommasandra</h3>
                <p>Narayana Nethralaya</p>
              </div>
            </div>
            <div
              className="location-item"
              onClick={() => navigate("/reviewsPage/nn3")}
            >
              <img
                src="/WebPublic/indiranagar.jpg"
                alt="Indiranagar"
                className="location-image"
              />
              <div className="location-info">
                <h3>Indiranagar</h3>
                <p>Narayana Nethralaya</p>
              </div>
            </div>
            <div
              className="location-item"
              onClick={() => navigate("/reviewsPage/nn4")}
            >
              <img
                src="/WebPublic/bannerghatta.jpg"
                alt="Bannerghatta Road"
                className="location-image"
              />
              <div className="location-info">
                <h3>Bannerghatta Road</h3>
                <p>Narayana Nethralaya</p>
              </div>
            </div>
          </div>
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
    </div>
  );
};

export default ReviewsPage;
