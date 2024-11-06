import React from "react";
import { Button } from "primereact/button";
import './ReviewsContainer.css'
const reviewsData = [
  {
    name: "KAUSALYA ASHOK",
    text: "Dr Tejal, Dr Ravikrishna, Dr Keerthy Shetty, and Dr Poornachandra are very good and best doctors in NN. Staff are best.",
    source: "Google",
    rating: 5,
    link: "#",
  },
  {
    name: "ALICE DIXAN",
    text: "Dr Tejal, I recently consented Dr. Tejal for contract surgery. Good approach and I am very happy 😊 thank you all for your care and treatment.",
    source: "Google",
    rating: 5,
    link: "#",
  },
  {
    name: "GK HONNAPPA",
    text: "Dr Tejal, she is a very good surgeon. Yesterday's operation was done and I am very happy with the service, and all staff is very helpful and responsive. Thank you all.",
    source: "Google",
    rating: 5,
    link: "#",
  },
  {
    name: "SRINIVAS MURTHY",
    text: "Dr Tejal madam has performed both left and right eye cataract surgery of my Father perfectly, the only downside is the waiting time due to many people visiting the hospital.",
    source: "Google",
    rating: 5,
    link: "#",
  },
  {
    name: "NUTAN KAUSHIK",
    text: "Dr Tejal is a brilliant, reassuring doctor and very supportive before, during, and after surgery. I am going to have my other eye surgery with her.",
    source: "Google",
    rating: 5,
    link: "#",
  },
  {
    name: "PRIYA SRIKANTH",
    text: "Dr. Tejal handled cataract surgery of both eyes of my mother. Extremely efficient and professional care by the doctor. The hospital, staff, and procedures are well organized. Thank you.",
    source: "Google",
    rating: 5,
    link: "#",
  },
];

const ReviewsContainer = () => {
  return (
    <>
      <h2 className="reviews-title">
        <span style={{ fontSize: "3.5rem" }}>R</span>EVIEWS
      </h2>
      <div className="reviews-container">
        <div className="reviews-list">
          {reviewsData.map((review, index) => (
            <div key={index}>
              <div className="review-card">
                <h3 className="review-name">{review.name}</h3>
                <p className="review-text">{review.text}</p>
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
                    onClick={() => window.open(review.link, "_blank")}
                  />
                </div>
              </div>
              {/* {index < reviewsData.length - 1 && (
                <hr className="review-divider" />
              )} */}
            </div>
          ))}
        </div>
      </div>
      <div className="loadbtnContainer">
      <Button
        label="Load More..."
        className="loadMore"
      />
      </div>
    </>
  );
};

export default ReviewsContainer;
