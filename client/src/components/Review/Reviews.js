import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Reviews.css";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        fetch("reviews.json")
            .then((response) => response.json())
            .then((data) => setReviews(data));
    }, []);

    const truncateText = (text, wordLimit) => {
        const words = text.split(" ");
        return words.length > wordLimit
            ? words.slice(0, wordLimit).join(" ") + "..."
            : text;
    };

    const openModal = (content) => setModalContent(content);
    const closeModal = () => setModalContent(null);

    return (
        <div className="reviews-container">
            <h2 className="reviews-title">
                See what others are achieving through learning
            </h2>

            {reviews.length > 0 && (
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={100} // Adjust spacing between slides
                    slidesPerView={1.7} // Display partial views of adjacent slides
                    centeredSlides={true} // Center the active slide
                    loop={true} // Infinite looping
                    breakpoints={{
                        768: { slidesPerView: 1.7 },
                        1024: { slidesPerView: 1.7 },
                    }}
                >
                    {reviews.map((review, index) => (
                        <SwiperSlide key={index}>
                            <div className="review-card">
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="review-avatar"
                                />
                                <h3 className="review-name">{review.name}</h3>
                                <p className="review-text">
                                    {truncateText(review.review, 100)}
                                </p>
                                <button
                                    className="read-more-btn"
                                    onClick={() => openModal(review)}
                                >
                                    Read More
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
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            {/* Modal */}
            {modalContent && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-btn" onClick={closeModal}>
                            &times;
                        </button>
                        <img
                            src={modalContent.image}
                            alt={modalContent.name}
                            className="modal-review-avatar"
                        />
                        <div className="modal-below">
                            <h3 className="review-name">{modalContent.name}</h3>
                            <p className="review-text">{modalContent.review}</p>
                            <div className="review-details">
                                <p className="review-location">
                                    <i className="fas fa-city"></i> {modalContent.city}
                                </p>
                                <p className="review-state">
                                    <i className="fas fa-map-marker-alt"></i> {modalContent.state}
                                </p>
                                <p className="review-profession">
                                    <i className="fas fa-user-tie"></i> {modalContent.profession}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reviews;
