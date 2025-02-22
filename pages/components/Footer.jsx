import styles from "../../styles/Footer.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Logo from "../../src/assets/elie.lifts.png";
import { IoLogoInstagram } from "react-icons/io";
import { FaTiktok } from "react-icons/fa";
import Navbar from "../components/Navbar.jsx";

export default function Introduction({ scrollToSection, about }) {
  const router = useRouter();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerGradient} />
      <div className={styles.footerContent}>
        {/* Brand Section */}
        <div className={styles.brandSection}>
          <h1 className={styles.brandTitle}>
            ELIE MITRI
            <span className={styles.brandSubtitle}>PERSONAL COACHING</span>
          </h1>
          <p className={styles.brandDescription}>
            Transforming lives through personalized fitness coaching and
            dedicated mentorship.
          </p>
          <div className={styles.contactInfo}>
            <a href="mailto:eliegmitri7@gmail.com" className={styles.emailLink}>
              eliegmitri7@gmail.com
            </a>
            <div className={styles.socialLinks}>
              <button
                className={styles.socialButton}
                onClick={() =>
                  router.push("https://www.instagram.com/elie.lifts/")
                }
                aria-label="Instagram"
              >
                <IoLogoInstagram />
              </button>
              <button
                className={styles.socialButton}
                onClick={() =>
                  router.push("https://www.tiktok.com/@elielifts2/")
                }
                aria-label="TikTok"
              >
                <FaTiktok />
              </button>
            </div>
          </div>
        </div>

        {/* Hours Section */}
        <div className={styles.hoursSection}>
          <h2 className={styles.sectionTitle}>Training Hours</h2>
          <div className={styles.hoursGrid}>
            <div className={styles.hourRow}>
              <span className={styles.dayLabel}>MON</span>
              <span className={styles.timeRange}>5:00PM-8:00PM</span>
            </div>
            <div className={styles.hourRow}>
              <span className={styles.dayLabel}>TUES</span>
              <span className={styles.timeRange}>5:00PM-8:00PM</span>
            </div>
            <div className={styles.hourRow}>
              <span className={styles.dayLabel}>WED</span>
              <span className={styles.timeRange}>5:00PM-8:00PM</span>
            </div>
            <div className={styles.hourRow}>
              <span className={styles.dayLabel}>THURS</span>
              <span className={styles.timeRange}>5:00PM-8:00PM</span>
            </div>
            <div className={styles.hourRow}>
              <span className={styles.dayLabel}>FRI</span>
              <span className={styles.timeRange}>5:00PM-8:00PM</span>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className={styles.navSection}>
          <h2 className={styles.sectionTitle}>Quick Links</h2>
          <nav className={styles.navGrid}>
            <button
              onClick={() => scrollToSection(about)}
              className={styles.navLink}
            >
              About Me
            </button>
            {/* <button
              onClick={() => router.push("/calorie-calculator")}
              className={styles.navLink}
            >
              Calorie Calculator
            </button> */}
            {/* <button
              onClick={() => router.push("/contact")}
              className={styles.navLink}
            >
              Contact
            </button> */}
            <button
              onClick={() => router.push("/program")}
              className={styles.navLink}
            >
              Program
            </button>
            <button
              onClick={() => router.push("/testimonials")}
              className={styles.navLink}
            >
              Testimonials
            </button>
          </nav>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.footerCopy}>
          © {new Date().getFullYear()} Elie Mitri Personal Coaching. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
