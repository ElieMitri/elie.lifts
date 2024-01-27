import styles from "../../styles/Intro.module.css";
import Image from "next/image";
import Logo from "../../src/assets/elie.lifts.png";
import { useRouter } from "next/router";
import { IoLogoInstagram } from "react-icons/io";
import { FaTiktok } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Introduction() {
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <Image src={Logo} className={styles.logo}></Image>
      <ul className={styles.navBurger}>
        <RxHamburgerMenu className={styles.burger} />
      </ul>
      <ul className={styles.navLinks}>
        <li className={styles.navLink1}>About</li>
        <li
          className={styles.navLink2}
          onClick={() => {
            router.push("/testimonials");
          }}
        >
          Testimonials
        </li>
        <li
          onClick={() => {
            router.push("/calorie-calculator");
          }}
          className={styles.navLink3}
        >
          Calorie Calculator
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
  );
}
