import styles from "../../styles/Rating.module.css";
import { IoMdClose } from "react-icons/io";
import { db } from "@/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import Link from "next/link";

const StarRating = ({ rating }) => {
  // Function to generate star icons based on the rating value
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // If the current star is less than or equal to the rating, render a filled star
        stars.push(<span key={i} className={styles.ratingStarFilled}>&#9733;</span>);
      } else {
        // Otherwise, render an empty star
        stars.push(<span key={i} className={styles.ratingStarEmpty}>&#9734;</span>);
      }
    }
    return stars;
  };

  return (
    <div>
      {renderStars()}
    </div>
  );
};

export default function Rating() {
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [clicked, setClicked] = useState(false);

  const handleRatingClick = (value) => {
    const newRating = value === rating ? 0 : value;
    setRating(newRating);
  };

  const handleSubmit = async () => {
    const reviewData = {
      name: name,
      rating: rating,
      message: message,
    };

    try {
      const docRef = await addDoc(collection(db, "reviews"), reviewData);
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

  return (
    <div className={styles.ratingWrapper}>
      <div className={styles.reviewWrapper}>
        <h1 className="blue reviewTitle">Reviews</h1>
        <ul className={styles.reviewList}>
          {reviews.map((review) => (
            <li key={review.id} className={styles.reviewItem}>
              <p>{review.name}</p>
              <p className={styles.ratingStars}><StarRating rating={review.rating} /></p> 
              <p>{review.message}</p>
            </li>
          ))}
        </ul>
        <button className={styles.button} onClick={() => setClicked(true)}>Give your review!</button>
      </div>  
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
