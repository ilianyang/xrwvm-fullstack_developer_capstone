import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Dealers.css";
import "../assets/style.css";
import positive_icon from "../assets/positive.png";
import neutral_icon from "../assets/neutral.png";
import negative_icon from "../assets/negative.png";
import review_icon from "../assets/reviewbutton.png";
import Header from "../Header/Header";

const Dealer = () => {
  const [dealer, setDealer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unreviewed, setUnreviewed] = useState(false);
  const [postReview, setPostReview] = useState(null);

  const { id } = useParams();

  // URL Construction
  const root_url = window.location.origin + "/";
  const dealer_url = `${root_url}djangoapp/dealer/${id}`;
  const reviews_url = `${root_url}djangoapp/reviews/dealer/${id}`;
  const post_review_url = `${root_url}postreview/${id}`;

  useEffect(() => {
    const getDealer = async () => {
      try {
        const res = await fetch(dealer_url);
        const data = await res.json();
        console.log("Dealer response:", data);

        if (data.status === 200 && data.dealer) {
          const dealerData = Array.isArray(data.dealer)
            ? data.dealer[0]
            : data.dealer;
          setDealer(dealerData);
        } else {
          console.warn("Dealer response missing or invalid");
        }
      } catch (error) {
        console.error("Error fetching dealer:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const getReviews = async () => {
      try {
        const res = await fetch(reviews_url);
        const data = await res.json();
        if (data.status === 200 && Array.isArray(data.reviews)) {
          if (data.reviews.length > 0) {
            setReviews(data.reviews);
          } else {
            setUnreviewed(true);
          }
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    getDealer();
    getReviews();

    const username = sessionStorage.getItem("username");
    if (username) {
      setPostReview(
        <a href={post_review_url}>
          <img
            src={review_icon}
            style={{ width: "10%", marginLeft: "10px", marginTop: "10px" }}
            alt="Post Review"
          />
        </a>
      );
    }
  }, [dealer_url, reviews_url, post_review_url]);

  const senti_icon = (sentiment) => {
    return sentiment === "positive"
      ? positive_icon
      : sentiment === "negative"
      ? negative_icon
      : neutral_icon;
  };

  return (
    <div>
      <Header />
      <div style={{ marginTop: "10px" }}>
        {isLoading ? (
          <p style={{ color: "gray" }}>Loading dealer information...</p>
        ) : dealer ? (
          <>
            <h1 style={{ color: "grey" }}>
              {dealer.full_name} {postReview}
            </h1>
            <h4 style={{ color: "grey" }}>
              {dealer.city}, {dealer.address}, Zip - {dealer.zip},{" "}
              {dealer.state}
            </h4>
          </>
        ) : (
          <p style={{ color: "darkred" }}>Dealer not found.</p>
        )}
      </div>

      <div className="reviews_panel">
        {isLoading ? (
          <p>Loading Reviews....</p>
        ) : unreviewed ? (
          <div>No reviews yet! </div>
        ) : (
          reviews.map((review, i) => (
            <div className="review_panel" key={i}>
              <img
                src={senti_icon(review.sentiment)}
                className="emotion_icon"
                alt="Sentiment"
              />
              <div className="review">{review.review}</div>
              <div className="reviewer">
                {review.name} {review.car_make} {review.car_model}{" "}
                {review.car_year}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dealer;
