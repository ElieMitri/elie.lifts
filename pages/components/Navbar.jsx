// import styles from "../../styles/Intro.module.css";
import styles from "../../styles/Nav.module.css";
import Image from "next/image";
import Logo from "../../src/assets/elie.lifts.png";
import { useRouter } from "next/router";
import { IoLogoInstagram } from "react-icons/io";
import { FaTiktok } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

export default function Navbar({ scrollToSection, about }) {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [clicked, setClicked] = useState(false);

  function toAbout() {
    scrollToSection(about);
    setClicked(false);
  }

  return (
    <>
      <nav className={styles.nav}>
        <Image src={Logo} className={styles.logo}></Image>
        <ul className={styles.navBurger}>
          <RxHamburgerMenu
            className={styles.burger}
            onClick={() => setClicked(true)}
          />
        </ul>
        <ul className={styles.navLinks} data-visible={clicked}>
          <li className={styles.navLink} onClick={() => scrollToSection(about)}>
            About
          </li>
          <li
            onClick={() => {
              router.push("/calorie-calculator");
            }}
            className={styles.navLink}
          >
            Calorie Calculator
          </li>
          <li
            onClick={() => {
              router.push("/contact");
            }}
            className={styles.navLink}
          >
            Contact
          </li>
          <li
            onClick={() => {
              router.push("/merch");
            }}
            className={styles.navLink}
          >
            Merch
          </li>
          <li
            onClick={() => {
              router.push("/testimonials");
            }}
            className={styles.navLink}
          >
            Testimonials
          </li>
          <a
            className={styles.instaLogo}
            onClick={() => {
              router.push("https://www.instagram.com/elie.lifts/");
            }}
          >
            <IoLogoInstagram />
          </a>
          <a
            className={styles.tiktokLogo}
            onClick={() => {
              router.push(
                "https://www.tiktok.com/@elie.liftss?_t=8iaZqE9oaZt&_r=1"
              );
            }}
          >
            <FaTiktok />
          </a>
        </ul>
      </nav>
      <div>
        {clicked ? (
          <>
            {" "}
            <div className="modalOpen">
              <IoMdClose
                className="close__modal"
                onClick={() => setClicked(false)}
              />
              <ul className={styles.navLinksModal}>
                <li className={styles.navLinkModal} onClick={toAbout}>
                  About
                </li>
                <li
                  onClick={() => {
                    router.push("/calorie-calculator");
                  }}
                  className={styles.navLinkModal}
                >
                  Calorie Calculator
                </li>
                <li
                  onClick={() => {
                    router.push("/contact");
                  }}
                  className={styles.navLinkModal}
                >
                  Contact
                </li>
                <li
                  onClick={() => {
                    router.push("/merch");
                  }}
                  className={styles.navLinkModal}
                >
                  Merch
                </li>
                <li
                  onClick={() => {
                    router.push("/testimonials");
                  }}
                  className={styles.navLinkModal}
                >
                  Testimonials
                </li>
                <div className={styles.socialMedia}>
                  <a
                    className={styles.instaLogo}
                    onClick={() => {
                      router.push("https://www.instagram.com/elie.lifts/");
                    }}
                  >
                    <IoLogoInstagram />
                  </a>
                  <a
                    className={styles.tiktokLogo}
                    onClick={() => {
                      router.push(
                        "https://www.tiktok.com/@elie.liftss?_t=8iaZqE9oaZt&_r=1"
                      );
                    }}
                  >
                    <FaTiktok />
                  </a>
                </div>
              </ul>
            </div>
            <div className="backdropOpen"></div>
          </>
        ) : (
          <></>
        )}
      </div>
      <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    </>
  );
}
