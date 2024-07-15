import styles from "../../styles/Footer.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Logo from "../../src/assets/elie.lifts.png";
import { IoLogoInstagram } from "react-icons/io";
import { FaTiktok } from "react-icons/fa";
import Navbar from "../components/Navbar.jsx";

export default function Introduction({ scrollToSection, about}) {
  const router = useRouter();

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerContentWrapper}>
          <div className={styles.footerSocials}>
            <h1 className={styles.footerSocialsTitle}>
              ELIE MITRI PERSONAL COACHING
            </h1>
            <div className={styles.footerSocialsEmail}>
              eliegmitri7@gmail.com
            </div>
            <div className={styles.socialMedia}>
              <a
                className={styles.instaLogoModal}
                onClick={() => {
                  router.push("https://www.instagram.com/elie.lifts/");
                }}
              >
                <IoLogoInstagram />
              </a>
              <a
                className={styles.tiktokLogoModal}
                onClick={() => {
                  router.push(
                    "https://www.tiktok.com/@elie.liftss?_t=8iaZqE9oaZt&_r=1"
                  );
                }}
              >
                <FaTiktok />
              </a>
            </div>
          </div>
          <div className={styles.footerHours}>
            <h1 className={styles.footerHoursTitle}>Hours</h1>
            <div className={styles.footerHour}>MON 5:00PM-8:00PM</div>
            <div className={styles.footerHour}>TUES 5:00PM-8:00PM</div>
            <div className={styles.footerHour}>WED 5:00PM-8:00PM</div>
            <div className={styles.footerHour}>THURS 5:00PM-8:00PM</div>
            <div className={styles.footerHour}>FRI 5:00PM-8:00PM</div>
          </div>
          <div className={styles.footerNavigation}>
            <h1>Naviagtion</h1>
            <ul className={styles.footerLinks}>
              <li className={styles.footerLink} onClick={() => scrollToSection(about)}>About Me</li>
              <li className={styles.footerLink}onClick={() => {
                router.push("/calorie-calculator");
              }}>Calorie Calculator</li>
              <li className={styles.footerLink} onClick={() => {
                router.push("/contact");
              }}>Contact</li>
              <li className={styles.footerLink} onClick={() => {
                router.push("/merch");
              }}>Merch</li>
              <li className={styles.footerLink} onClick={() => {
                router.push("/testimonials");
              }}>Testimonials</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
