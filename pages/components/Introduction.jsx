import styles from "../../styles/Intro.module.css";
import Image from "next/image";
import image from "../../src/assets/image2.jpg";
import { useRouter } from "next/router";

export default function Introduction() {
    const router = useRouter();

  return (
    <>
      <section className={styles.intro}>
        <div className={styles.introWrapper}>
          <div className={styles.introTextWrapper}>
            <h1 className={styles.introText}>
              Ready To Start Your <span className="blue">Journey</span>?
            </h1>
            <button
              onClick={() => {
                router.push("/testimonials");
              }}
              className={styles.introGetStartedButton}
            >
              Get Started
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
