import React, { useState, useEffect } from "react";
import HeaderBar from "../../WebLayout/HeaderBar";
import Footer from "../../WebLayout/FooterNaNe";
import { Button } from "primereact/button";
import ReviewsContainer from "../doctorprofile/ReviewsContainer";
import WebApi from "../../WebApi/WebApi";
import "./RajajinagarReviews.css";
const IndiranagarReviews = () => {
  const [locationReviews, setLocationReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleReviews, setVisibleReviews] = useState(6);
  const loadMoreReviews = () => {
    setVisibleReviews((prevCount) => prevCount + 6);
  };
  useEffect(() => {
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
          fld_place_id: "ChIJxdkpGioXrjsR-rB9aegF3bc",
        };
        const result = await WebApi.getLocationReviews(requestData);
        setLocationReviews(result.responsemessage);
        console.log("res rev", result.responsemessage);
        console.log("Location reviews:", result);
      } catch (error) {
        console.error("Error fetching location reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorReviews();
  }, []);
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
    <>
      <HeaderBar />
      <div className="list-doc">
        <div className="headerBanner">
          <img src="/WebPublic/bg-blck.webp" alt="banner" />
          <div className="centreReviews"  style={{marginRight:"136px"}}>
            <h1 style={{ paddingTop: "20px" }}>
              <span>Indiranagar Reviews</span>
            </h1>
          </div>
        </div>
        <div style={{ marginTop: "120px" }}>
          <div className="breadcrumbs1">
            <a href="https://kavintechcorp.in/nnwps/media">Media</a> &gt; <a href="/reviewsPage">Reviews</a>{" "}
            &gt;Indiranagar Reviews
          </div>
          <div className="reviews-container">
            <div className="reviews-list">
              {locationReviews && locationReviews.length > 0 ? (
                locationReviews
                  .slice(0, visibleReviews)
                  .map((review, index) => (
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

            {locationReviews && visibleReviews < locationReviews.length && (
              <div className="loadbtnContainer">
                <Button
                  label="Load More..."
                  className="loadMore"
                  onClick={loadMoreReviews}
                />
              </div>
            )}
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
    </>
  );
};

export default IndiranagarReviews;
