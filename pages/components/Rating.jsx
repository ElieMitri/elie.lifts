import styles from "../../styles/Rating.module.css";
import { IoMdClose } from "react-icons/io";
import { db } from "@/firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import Link from "next/link";

const StarRating = ({ rating }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <span key={i} className={styles.ratingStarFilled}>
            &#9733;
          </span>
        );
      } else {
        stars.push(
          <span key={i} className={styles.ratingStarEmpty}>
            &#9734;
          </span>
        );
      }
    }
    return stars;
  };

  return <div>{renderStars()}</div>;
};

export default function Rating() {
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [zeroReviewsMessage, setZeroReviewsMessage] = useState("");
  const [selectedActivityLevel, setSelectedActivityLevel] = useState("");
  const [sortedReviews, setSortedReviews] = useState([]);

  const handleRatingClick = (value) => {
    const newRating = value === rating ? 0 : value;
    setRating(newRating);
  };

  const handleSubmit = async () => {
    setZeroReviewsMessage("");
    const data = Date(serverTimestamp());
    const reviewData = {
      name: name,
      rating: rating,
      message: message,
      time: data.substring(0, 33),
    };

    try {
      await addDoc(collection(db, "reviews"), reviewData);
      setName("");
      setMessage("");
      setRating(0);
      setClicked(false);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "reviews"), (snapshot) => {
      const reviewsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(reviewsData);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (reviews.length === 0) {
      setZeroReviewsMessage("Be the first review!!!");
    } else {
      setZeroReviewsMessage("");
    }
  }, [reviews]);

  const handleActivityLevelChange = (event) => {
    setSelectedActivityLevel(event.target.value);
  };

  useEffect(() => {
    let sorted = [...reviews];

    switch (selectedActivityLevel) {
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        sorted.sort((a, b) => new Date(b.time) - new Date(a.time));
        break;
      case "latest":
        sorted.sort((a, b) => new Date(a.time) - new Date(b.time));
        break;
      default:
        break;
    }

    setSortedReviews(sorted);
  }, [reviews, selectedActivityLevel]);

  return (
    <div className={styles.ratingWrapper}>
      <div className={styles.reviewWrapper}>
        <h1 className="blue reviewTitle">Reviews</h1>
        <ul className={styles.reviewList}>
          <h1>{zeroReviewsMessage}</h1>
          {sortedReviews.slice(0, 2).map((review) => (
            <li key={review.id} className={styles.reviewItem}>
              <p className={styles.reviewName}>{review.name}</p>
              <p className={styles.ratingStars}>
                <StarRating rating={review.rating} />
              </p>
              <p className={styles.reviewMessage}>{review.message}</p>
              <p className={styles.reviewDate}>{review.time}</p>
            </li>
          ))}
        </ul>
        <button className={styles.button} onClick={() => setClicked(true)}>
          Give your review!
        </button>
        <button className={styles.button} onClick={() => setShowAll(true)}>
          Show all reviews!
        </button>
      </div>
      {showAll ? (
        <div className={styles.modalOpenRating}>
          <div className={styles.modalOpenWrapper}>
            <select
              className="activity-level-reviews-select"
              value={selectedActivityLevel}
              onChange={handleActivityLevelChange}
            >
              <option value="">Select...</option>
              <option value="rating">Sort by rating</option>
              <option value="newest">Sort by newest</option>
              <option value="latest">Sort by latest</option>
            </select>
            <IoMdClose
              className="close__modal"
              onClick={() => setShowAll(false)}
            />
            {sortedReviews.map((review) => (
              <li key={review.id} className={styles.reviewItem}>
                <p className={styles.reviewName}>{review.name}</p>
                <p className={styles.ratingStars}>
                  <StarRating rating={review.rating} />
                </p>
                <p className={styles.reviewMessage}>{review.message}</p>
                <p className={styles.reviewDate}>{review.time}</p>
              </li>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
      {clicked ? (
        <div className={styles.modalOpenRating}>
          <IoMdClose
            className="close__modal"
            onClick={() => setClicked(false)}
          />
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
            placeholder="Your Name"
            className={styles.name}
          />
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                className={styles.ratingStar}
                key={value}
                onClick={() => handleRatingClick(value)}
                style={{
                  cursor: "pointer",
                  color: value <= rating ? "gold" : "gray",
                }}
              >
                &#9733;
              </span>
            ))}
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            name=""
            id=""
            cols="20"
            rows="2"
            placeholder="Your Message"
            className={styles.message}
            maxLength={211}
          ></textarea>
          <button className={styles.button} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
