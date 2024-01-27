import styles from "../../styles/Quote.module.css";
import Image from "next/image";
import image from "../../src/assets/Quote.avif";

export default function Quote() {
  return (
    <>
      <section className={styles.wrapper}>
        <div className={styles.quoteWrapper}>
        <Image src={image} className={styles.quoteImage}/>
        <h1 className={styles.quote}>
          “All progress takes place outside the comfort zone.”– Michael John
          Bobak
        </h1>
        </div>
      </section>
    </>
  );
}
