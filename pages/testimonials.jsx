import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/router";
import styles from "../styles/Testimonials.module.css";
import React, { useRef } from "react";
import { MdArrowBack, MdCheck } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

export default function Testimonials() {
  const router = useRouter();

  const basicFeatures = [
    "Fully customized workout.",
    "Diet Recommendations.",
    "24/7 WhatsApp Support",
    "Monthly progress tracking.",
    "Monthly 1-on-1 consultation.",
  ];

  const premiumFeatures = [
    // "2 Hour Initial Session",
    "Fully customized workout.",
    "Diet Recommendations.",
    "24/7 WhatsApp Support",
    "Monthly progress tracking.",
    "Monthly 1-on-1 consultation.",
  ];

  return (
    <div className={styles.container}>
      <button onClick={() => router.push("/")} className={styles.backButton}>
        <MdArrowBack size={24} />
      </button>

      <div className={styles.grid}>
        {/* Premium Plan */}
        <div className={`${styles.card} ${styles.premium}`}>
          {/* <div className={styles.popularBadge}>Most Popular</div> */}
          <div className={styles.planTitle}>Premium Plan</div>
          <div className={styles.price}>$40</div>
          <div className={styles.duration}>per month</div>
          <div className={styles.featuresList}>
            {premiumFeatures.map((feature, i) => (
              <div key={i} className={styles.feature}>
                <MdCheck className={styles.checkIcon} />
                {feature}
              </div>
            ))}
          </div>
          {/* <button 
            onClick={() => router.push("https://buy.stripe.com/test_dR6cN13Iq1Cee646or")}
            className={`${styles.button} ${styles.premiumButton}`}
          >
            Get Premium
          </button> */}
        </div>
      </div>

      <div className={styles.bookingWrapper}>
        {/* <p className={styles.bookingText}>Want further information?</p> */}
        <a 
          href="https://wa.me/81107752" target="_blank"
          className={styles.bookingButton}
        >
          Want further information?
        </a>
      </div>
    </div>
  );
}
