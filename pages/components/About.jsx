import styles from "../../styles/About.module.css";
import { useRouter } from "next/router";
import image from "../../src/assets/image2 - Copy.jpg";
import Image from "next/image";

export default function About({ about }) {
  const router = useRouter();

  return (
    <>
      <section className={styles.about} ref={about}>
        <h1 className={styles.aboutTitle}>
          <span className="blue">About</span> Me
        </h1>
        <div className={styles.aboutTextWrapper}>
          <p className={styles.aboutPara}>
            My name is <span className="blue">Elie Mitri</span>, and I am a
            <span className="blue"> 15 year old powerlifter</span>. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Doloribus dolorum
            eligendi odit suscipit necessitatibus labore non recusandae soluta
            molestiae explicabo, deleniti modi, nisi repudiandae totam at quas
            in corrupti placeat. 
          </p>
          <div className={styles.aboutPicWrapper}>
            <Image src={image} className={styles.aboutPic}></Image>
          </div>
        </div>
      </section>
    </>
  );
}
