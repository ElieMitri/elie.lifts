import styles from "../../styles/About.module.css";
import { useRouter } from "next/router";
import image from "../../src/assets/image2 - Copy.jpg";
import Image from "next/image";

export default function About() {
  const router = useRouter();

  return (
    <>
      <section className={styles.about}>
        <h1 className={styles.aboutTitle}>
          <span className="blue">About</span> Me
        </h1>
        <div className={styles.aboutTextWrapper}>
          <p className={styles.aboutPara}>
            My name is <span className="blue">Elie Mitri</span>, and I am a
            <span className="blue"> 15 year old Lebanese boy</span> that is into
            <span className="blue"> powerlifting</span>. My dream is to beat the
            national record or even compete with people all over the world.
          </p>
          <div className={styles.aboutPicWrapper}>
            <Image src={image} className={styles.aboutPic}></Image>
          </div>
        </div>
      </section>
    </>
  );
}
