import styles from "../styles/Testimonials.module.css";
import { useRouter } from "next/router";

export default function Testimonials() {
  const router = useRouter();

  return (
    <>
      <section className={styles.testimonials}>
        <div className={styles.testimonialsWrapper}>

        </div>
      </section>
    </>
  );
}
