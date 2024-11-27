import React, { useState, useEffect } from "react";
import "./Reviews.css";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [expandedReview, setExpandedReview] = useState(null); // State to track which review is expanded

    useEffect(() => {
        fetch("reviews.json")
            .then((response) => response.json())
            .then((data) => setReviews(data));
    }, []);

    const toggleReadMore = (id) => {
        setExpandedReview(expandedReview === id ? null : id);
    };

    return (
        <div className="reviews-container">
            <h2 className="reviews-title">See what others are achieving through learning</h2>
            <p className="reviews-description">
            Thousands of satisfied customers across the globe—find out why they trust us! </p>
            <div className="reviews-list">
                {reviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="review-card">
                        <img src={review.image} alt={review.name} className="review-avatar" />
                        <h3 className="review-name">{review.name}</h3>
                        <p className="review-text">
                            {expandedReview === review.id
                                ? review.review // Show full review if expanded
                                : review.review.substring(0, 100) + "..."} {/* Show truncated review */}
                        </p>
                        <button
                            className="read-more-btn"
                            onClick={() => toggleReadMore(review.id)}
                        >
                            {expandedReview === review.id ? "Read Less" : "Read More"}
                        </button>
                        <div className="review-details">
                            <p className="review-location">
                                <i className="fas fa-city"></i> {review.city}
                            </p>
                            <p className="review-state">
                                <i className="fas fa-map-marker-alt"></i> {review.state}
                            </p>
                            <p className="review-profession">
                                <i className="fas fa-user-tie"></i> {review.profession}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="reviews-navigation">
                <button className="reviews-nav-btn">❮</button>
                <button className="reviews-nav-btn">❯</button>
            </div>
        </div>
    );
};

export default Reviews;
