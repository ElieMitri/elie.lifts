import * as React from "react";
import { useState } from "react";
import styles from "../../styles/Transformation.module.css";
import Image from "next/image";
import image from "../../src/assets/IMG_0766.jpeg";
import image2 from "../../src/assets/IMG_1091.jpeg";
import image3 from "../../src/assets/IMG_3509.jpeg";
import image4 from "../../src/assets/IMG_8409.jpeg";
import { useRouter } from "next/router";
import { HiMiniArrowLongRight, HiMiniArrowLongDown } from "react-icons/hi2";

export default function Transformation() {
  const router = useRouter();

  return (
    <>
      <section className={styles.transformationWrapper}>
        <h1 className={styles.transformationTitle}>
          My <span className={styles.importantWords}>Transformation</span>
        </h1>
        <div className={styles.aboutTextsWrapper}>
          <div className={styles.aboutTextWrapper1}>
            <div className={styles.aboutTextWrapper}>
              <div className={styles.aboutPicWrapper}>
                <Image src={image} className={styles.aboutPic}></Image>
              </div>
              <p className={styles.aboutPara}>
                {/* <span className={styles.importantWords}>powerlifting</span> */}
              </p>
            </div>
            <div className={styles.arrowWrapper}>
              <h1 className={styles.year}>1 year later</h1>
              <HiMiniArrowLongRight className={styles.arrow} />
              <HiMiniArrowLongDown className={styles.arrow2} />
            </div>
            <div className={styles.aboutTextWrapper}>
              <div className={styles.aboutPicWrapper}>
                <Image src={image3} className={styles.aboutPic}></Image>
              </div>
              <p className={styles.aboutPara}>
                {/* <span className={styles.importantWords}>powerlifting</span> */}
              </p>
            </div>
          </div>
          <div className={styles.aboutTextWrapper2}>
            <div className={styles.aboutTextWrapper}>
              <div className={styles.aboutPicWrapper}>
                <Image src={image2} className={styles.aboutPic}></Image>
              </div>
              <p className={styles.aboutPara}>
                {/* <span className={styles.importantWords}>powerlifting</span> */}
              </p>
            </div>
            <div className={styles.arrowWrapper}>
              <h1 className={styles.year}>1 year later</h1>
              <HiMiniArrowLongRight className={styles.arrow} />
              <HiMiniArrowLongDown className={styles.arrow2} />
            </div>
            <div className={styles.aboutTextWrapper}>
              <div className={styles.aboutPicWrapper}>
                <Image src={image4} className={styles.aboutPic}></Image>
              </div>
              <p className={styles.aboutPara}>
                {/* <span className={styles.importantWords}>powerlifting</span> */}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
