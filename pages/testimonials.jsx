import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/router";
import styles from "../styles/Testimonials.module.css";
import React, { useRef } from "react";
import { MdArrowBack } from "react-icons/md";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.testimonialsWrapper}>
      <MdArrowBack onClick={() => router.push("/")} className="back" />
      <div className={styles.testimonials}>
        <div className={styles.testimonial}>
          <div className={styles.testimonialPrice}>49.99$</div>
          <div className={styles.testimonialDetails}>
            <div className={styles.testimonialDetail}>test</div>
            <div className={styles.testimonialDetail}>test</div>
            <div className={styles.testimonialDetail}>test</div>
            <div className={styles.testimonialDetail}>test</div>
            <div className={styles.testimonialDetail}>test</div>
            <div className={styles.testimonialDetail}>test</div>
          </div>
          <div className={styles.testimonialButtonWrapper}>
            <button className={styles.testimonialButton}>Buy now!</button>
          </div>
        </div>
        <div className={styles.testimonial}>
          <div className={styles.testimonialPrice}>99.99$</div>
          <div className={styles.testimonialDetails}>
            <div className={styles.testimonialDetail}>test</div>
            <div className={styles.testimonialDetail}>test</div>
            <div className={styles.testimonialDetail}>test</div>
            <div className={styles.testimonialDetail}>test</div>
            <div className={styles.testimonialDetail}>test</div>
            <div className={styles.testimonialDetail}>test</div>
          </div>
          <div className={styles.testimonialButtonWrapper}>
            <button className={styles.testimonialButton}>Buy now!</button>
          </div>
        </div>
      </div>
    </div>
  );
}
