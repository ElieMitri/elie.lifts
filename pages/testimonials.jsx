import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/router";
import styles from "../styles/Testimonials.module.css";
import React, { useRef } from "react";
import { MdArrowBack, MdCheck } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

export default function Testimonials() {
  const router = useRouter();

  const basicFeatures = [
    // "1 Hour Session",
    "Customized Workout Plan ",
    "Diet Recommendations",
    "24/7 WhatsApp Support",
    "Progress Tracking",
  ];

  const premiumFeatures = [
    // "2 Hour Initial Session",
    "Customized Workout Plan",
    "Personalized Meal Plans",
    "24/7 WhatsApp Support",
    "Advanced Progress Tracking",
  ];

  return (
    <div className={styles.container}>
      <button 
        onClick={() => router.push("/")}
        className={styles.backButton}
      >
        <MdArrowBack size={24} />
      </button>

      <div className={styles.grid}>
        {/* Basic Plan */}
        <div className={styles.card}>
          <div className={styles.planTitle}>Basic Plan</div>
          <div className={styles.price}>$20</div>
          <div className={styles.duration}>per month</div>
          <div className={styles.featuresList}>
            {basicFeatures.map((feature, i) => (
              <div key={i} className={styles.feature}>
                <MdCheck className={styles.checkIcon} />
                {feature}
              </div>
            ))}
          </div>
          {/* <button 
            onClick={() => router.push("https://buy.stripe.com/test_3cs5kzfr8ft49POfZ0")}
            className={styles.button}
          >
            Get Started
          </button> */}
        </div>

        {/* Premium Plan */}
        <div className={`${styles.card} ${styles.premium}`}>
          <div className={styles.popularBadge}>Most Popular</div>
          <div className={styles.planTitle}>Premium Plan</div>
          <div className={styles.price}>$30</div>
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
        <p className={styles.bookingText}>Want further information?</p>
        <a 
          href="https://wa.me/81107752" target="_blank"
          className={styles.bookingButton}
        >
          Text Me
        </a>
      </div>
    </div>
  )
}
