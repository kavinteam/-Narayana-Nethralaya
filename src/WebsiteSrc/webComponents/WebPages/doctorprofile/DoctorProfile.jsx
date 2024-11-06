import { Button } from "primereact/button";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../WebLayout/FooterNaNe";
import { Carousel } from "primereact/carousel";
import { ProgressSpinner } from "primereact/progressspinner";
import { BASE_URL } from "../../../../config";
import HeaderBar from "../../WebLayout/HeaderBar";
import WebApi from "../../WebApi/WebApi";
import "./DoctorProfile.css";

import axios from "axios";
const DoctorProfile = () => {
  const { rf_id } = useParams();
  // console.log("rf id", rf_id);

  const [doctorData, setDoctorData] = useState(null);
  const [doctorReviews, setDoctorReviews] = useState(null);
  // console.log("reviews", doctorReviews);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(6);

  const loadMoreReviews = () => {
    setVisibleReviews((prevCount) => prevCount + 6);
  };

  useEffect(() => {
    // Function to check if screen is mobile-sized
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // You can adjust this breakpoint
    };

    // Initial check
    handleResize();

    // Event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const fetchDoctorData = async () => {
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
          fld_rf_id: rf_id,
        };
        const result = await WebApi.getDoctorById(requestData);
        setDoctorData(result.responsemessage);
        // console.log("res", result);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [rf_id]);
  useEffect(() => {
    if (doctorData && doctorData[0]?.fld_doc_id) {
      const fetchDoctorReviews = async () => {
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
            fld_doc_id: doctorData[0].fld_doc_id,
          };
          const result = await WebApi.getDoctorReviews(requestData);
          setDoctorReviews(result.responsemessage);
          // console.log("res rev", result.responsemessage);
          // console.log("Doctor reviews:", result);
        } catch (error) {
          console.error("Error fetching doctor reviews:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchDoctorReviews();
    }
  }, [doctorData]);
  // Show loading spinner while fetching doctor data
  if (loading) {
    return (
      <div className="backdrop">
        <ProgressSpinner
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    );
  }

  if (!doctorData) {
    return <p>No doctor data found.</p>;
  }

  const getYouTubeTitle = async (videoId) => {
    const apiKey = "AIzaSyAD9UCS7HS1tY5J6OlV0S7tgp87j5P3iok";
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      const data = response.data;
      return data.items[0]?.snippet?.title || "Unknown Title";
    } catch (error) {
      console.error("Error fetching video title:", error);
      return "Unknown Title";
    }
  };

  const TestimonialsComponent = ({ doctorData }) => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
      const fetchTestimonials = async () => {
        if (doctorData[0]?.fld_video_testimonials) {
          const videoUrls = doctorData[0]?.fld_video_testimonials.split("$");

          const testimonialPromises = videoUrls.map(async (url, index) => {
            const videoId = url.includes("v=")
              ? url.split("v=")[1].split("&")[0]
              : url.split("/").pop();
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; // Generate YouTube thumbnail URL

            const title = await getYouTubeTitle(videoId); // Fetch exact YouTube video title

            return {
              id: index + 1,
              thumbnail: thumbnailUrl,
              videoUrl: url,
              title,
            };
          });

          const fetchedTestimonials = await Promise.all(testimonialPromises);
          setTestimonials(fetchedTestimonials);
        }
      };

      fetchTestimonials();
    }, [doctorData]);

    const handleVideoClick = (videoUrl) => {
      window.open(videoUrl, "_blank");
    };

    const testimonialTemplate = (testimonial) => {
      return (
        <div key={testimonial.id} className="testimonial-card">
          <div
            className="thumbnail-container"
            onClick={() => handleVideoClick(testimonial.videoUrl)}
          >
            <img
              src={testimonial.thumbnail}
              alt="Video Thumbnail"
              className="thumbnail-image"
            />
            <div className="play-button">▶</div>
          </div>
          <div className="testimonial-text">
            <p>{testimonial.title}</p>
          </div>
        </div>
      );
    };

    return (
      <div className="vid-test">
        <h1 className="vid-h2">Video Testimonials</h1>
        {testimonials && testimonials.length > 0 ? (
          <Carousel
            value={testimonials}
            itemTemplate={testimonialTemplate}
            numVisible={isMobile ? 1 : 3}
            numScroll={1}
            autoplayInterval={3000}
          />
        ) : (
          <p style={{ color: "#ffffff" }}>No video testimonials available.</p>
        )}
      </div>
    );
  };
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Number of full stars
    const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Half star condition
    const emptyStars = 5 - fullStars - halfStar; // Remaining empty stars

    return (
      <>
        {"★".repeat(fullStars)}
        {/* {halfStar ? "⯨" : ""} */}
        {halfStar ? (
          <span style={{ lineHeight: "24px" }}>
            <img
              src={`/WebPublic//star-half.svg`}
              alt="Half Star"
              style={{ marginTop: "-3px" }}
              className="svgStar"
            />
          </span>
        ) : (
          ""
        )}
        {"☆".repeat(emptyStars)}
      </>
    );
  };
  return (
    <div className="profile-container">
      <HeaderBar />
      <div className="headerBanner">
        <img src="/WebPublic/bg-blck.webp" alt="banner" />
        <div className="reviews-banner">
          <h1>
            <span style={{ fontSize: "4rem" }}>D</span>octors
          </h1>
        </div>
      </div>
      <div className="profile-content">
        <div className="doctor-info">
          <img
            src={`${BASE_URL}${doctorData[0]?.fld_image_of_doctor}`}
            alt={doctorData.fld_doc_name}
            className="doctor-infoimg"
          />
          <div className="doctor-details">
            <h2>{doctorData[0]?.fld_doc_name}</h2>
            <div className="rating">
              {/* <div className="stars-container">
                <span className="stars">
                  {" "}
                  {renderStars(doctorData[0]?.average_rating)}
                </span>
              </div> */}
              <span className="rating-info">
                Average rating: {doctorData[0]?.average_rating?.toFixed(1)} |{" "}
                {doctorData[0]?.total_review} reviews
              </span>
            </div>
            <ul className="details-list">
              <li>
                <img
                  src="/WebPublic/mdi_tick-circle.png"
                  alt="tick"
                  className="tick-icon"
                />{" "}
                Designation: {doctorData[0]?.fld_designation}
              </li>
              <li>
                <img
                  src="/WebPublic/mdi_tick-circle.png"
                  alt="tick"
                  className="tick-icon"
                />{" "}
                Specialization: {doctorData[0]?.fld_specialization}
              </li>
              <li>
                <img
                  src="/WebPublic/mdi_tick-circle.png"
                  alt="tick"
                  className="tick-icon"
                />{" "}
                Work Experience: {doctorData[0]?.fld_work_experience} years
              </li>
              <li>
                <img
                  src="/WebPublic/mdi_tick-circle.png"
                  alt="tick"
                  className="tick-icon"
                />{" "}
                Days & timing of availability for each centre:{" "}
                {doctorData[0]?.fld_doc_availability}
              </li>
            </ul>
            <Button
              className="btn-call"
              onClick={() =>
                (window.location.href =
                  "https://kavintechcorp.in/nnwps/appointment/")
              }
            >
              <img
                src="/WebPublic/material-symbols_calendar-month-outline.png"
                alt="Book an Appointment Icon"
                className="btn-icon" //changed
              />
              <span className="btn-text">Book Appointment</span>
            </Button>
            <Button className="btn-book" style={{ color: "black" }}>
              <i className="pi pi-phone" />
              <span className="btn-book-text">
                {" "}
                Call us to Book
                <br /> Appointment{" "}
              </span>
            </Button>
          </div>
        </div>
      </div>
      <div className="about-doc">
        <h1 style={{ fontFamily: "Cormorant SC, Sans-serif" }}>About</h1>
        <p className="content-ptag">{doctorData[0]?.fld_description}</p>

        <strong style={{ fontFamily: "Poppins, Sans-serif" }}>
          Education &amp; Training
        </strong>
        <p className="content-ptag">{doctorData[0]?.fld_edu_training}</p>
        <strong style={{ fontFamily: "Poppins, Sans-serif" }}>
          Achievements &amp; Awards
        </strong>
        <p className="content-ptag">{doctorData[0]?.fld_achievment_awards}</p>
      </div>
      {/* <VideoTestimonials /> */}

      <TestimonialsComponent doctorData={doctorData} />
      {/* <VideoTestimonial/> */}
      <h2 className="reviews-title">
        <span style={{ fontSize: "3.5rem" }}>R</span>EVIEWS
      </h2>
      {/* <div className="reviews-container">
        <div className="reviews-list">
          {doctorReviews?.map((review, index) => (
            <div key={index}>
              <div className="review-card">
                <h3 className="review-name">{review.fld_author_name}</h3>
                <p className="review-text">{review.fld_review_text}</p>
                <div className="review-footer">
                  <span className="review-source">
                    Source :{" "}
                    <img
                      src="/WebPublic/googlerw.png"
                      alt="Google"
                      className="review-source-img"
                    />
                  </span>
                  <Button
                    label="View Original Review"
                    className="view-review-button"
                    onClick={() => window.open(review.fld_review_link, "_blank","noopener,noreferrer")}
                  />
                </div>
              </div>
              {index < reviewsData.length - 1 && (
                <hr className="review-divider" />
              )}
            </div>
          ))}
        </div>
      </div> */}
      {/* <div className="reviews-container">
        <div className="reviews-list">
          {doctorReviews && doctorReviews.length > 0 ? (
            doctorReviews.map((review, index) => (
              <div key={index}>
                <div className="review-card">
                  <h3 className="review-name">{review.fld_author_name}</h3>
                  <p className="review-text">{review.fld_review_text}</p>
                  <div className="review-footer">
                    <span className="review-source">
                      Source :{" "}
                      <img
                        src="/WebPublic/googlerw.png"
                        alt="Google"
                        className="review-source-img"
                      />
                    </span>
                    <Button
                      label="View Original Review"
                      className="view-review-button"
                      onClick={() =>
                        window.open(
                          review.fld_review_link,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                    />
                  </div>
                </div>
                {index < doctorReviews.length - 1 && (
                  <hr className="review-divider" />
                )}
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center" }}>No reviews yet</div>
          )}
        </div>
      </div> */}
      <div className="reviews-container">
        <div className="reviews-list">
          {doctorReviews && doctorReviews.length > 0 ? (
            doctorReviews.slice(0, visibleReviews).map((review, index) => (
              <div key={index} className="review-card">
                <h3 className="review-name">{review.fld_author_name}</h3>
                <div className="rating">
                  <div className="stars-container">
                    <span className="stars">
                      {" "}
                      {renderStars(review.fld_rating)}
                    </span>
                  </div>
                </div>
                <p className="review-text">{review.fld_review_text}</p>
                <div className="review-footer">
                  <span className="review-source">
                    Source:
                    <img
                      src="/WebPublic/googlerw.png"
                      alt="Google"
                      className="review-source-img"
                    />
                  </span>
                  <Button
                    label="View Original Review"
                    className="view-review-button"
                    onClick={() =>
                      window.open(
                        review.fld_review_link,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                  />
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center" }}>No reviews yet</div>
          )}
        </div>

        {doctorReviews && visibleReviews < doctorReviews.length && (
          <div className="loadbtnContainer">
            <Button
              label="Load More..."
              className="loadMore"
              onClick={loadMoreReviews}
            />
          </div>
        )}
      </div>
      <Footer />
      <div className="floating-buttons">
        <Button
          icon="pi pi-phone"
          className="p-button-rounded p-button-help floating-button phone-button"
          onClick={() => (window.location.href = "tel:+918066121643")}
        />
        {/* <div> */}
        <Button
          icon="pi pi-whatsapp"
          className="p-button-rounded p-button-success floating-button whatsapp-button"
          onClick={() => window.open("https://wa.me/918066121643", "_blank")}
        />
        {/* <Badge style={{position:"relative"}} size="small" severity="danger"/> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default DoctorProfile;
