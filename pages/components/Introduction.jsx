import styles from "../../styles/Intro.module.css";
import Image from "next/image";
import image from "../../src/assets/mock photo.jpg";
import { useRouter } from "next/router";
import Logo from "../../src/assets/elie.lifts.png";
import { IoLogoInstagram } from "react-icons/io";
import { FaTiktok } from "react-icons/fa";
import Navbar from "../components/Navbar.jsx";


export default function Introduction() {
  const router = useRouter();

  return (
    <>
      <figure className={styles.imageFig}>
        <Image src={image} className={styles.image} />
      </figure>
      <Navbar />
      <section className={styles.intro}>
        <div className={styles.introWrapper}>
          <div className={styles.introTextWrapper}>
            <h1
              className={styles.introText}
              data-aos="fade-right"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
            >
              Ready To Start Your <span className="blue">Journey</span>?
            </h1>
            <button
              data-aos="fade-right"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
              onClick={() => {
                router.push("/testimonials");
              }}
              className={styles.introGetStartedButton}
            >
              Get Started
            </button>
          </div>
        </div>
        <div></div>
      </section>
    </>
  );
}
