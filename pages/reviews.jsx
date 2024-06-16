// pages/allReviews.js
import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { onSnapshot, collection } from "firebase/firestore";
import styles from "../styles/Rating.module.css";
import Link from "next/link";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedActivityLevel, setSelectedActivityLevel] = useState("");

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

    setReviews(sorted);
  }, [reviews, selectedActivityLevel]);

  return (
    <div className={styles.allReviewsWrapper}>
      <h1>back</h1>
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
      <ul className={styles.reviewList}>
        {reviews.map((review) => (
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
      <Link href="/" className={styles.button}>
        Back to reviews
      </Link>
    </div>
  );
};

export default AllReviews;
