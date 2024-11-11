import * as React from "react";
import { useState } from "react";
import styles from "../../styles/Journey.module.css";
import Image from "next/image";
import image from "../../src/assets/IMG_9119.jpeg";
import image2 from "../../src/assets/IMG_9957.jpg";
import image3 from "../../src/assets/B816A18C-0A89-4A72-BD1D-F20DE88CD34E.jpeg";
import image4 from "../../src/assets/IMG_8024.jpeg";
// import image3 from "../../src/assets/IMG_3509.jpeg";
// import image4 from "../../src/assets/IMG_8409.jpeg";
import { useRouter } from "next/router";
import { HiMiniArrowLongRight, HiMiniArrowLongDown } from "react-icons/hi2";

export default function Journey() {
  const router = useRouter();

  return (
    <>
      <section className={styles.transformationWrapper}>
        <div className={styles.transformation}>
          <h1 className={styles.transformationTitle}>
            My <span className={styles.importantWords}>Journey</span> and{" "}
            <span className={styles.importantWords}>Achievements</span>
          </h1>
          <div className={styles.aboutTextsWrapper}>
            <div className={styles.aboutTextWrapper1}>
              <div className={styles.aboutTextWrapper1}>
                <div className={styles.aboutPicWrapper}>
                  <Image src={image3} className={styles.aboutPic}></Image>
                </div>
                <p className={styles.aboutPara}>
                  I started going to the{" "}
                  <span className={styles.importantWords}>gym</span> when I was{" "}
                  <span className={styles.importantWords}>14 years old</span> ,
                  driven by a passion to get stronger and build my fitness. Back
                  then, I weighed{" "}
                  <span className={styles.importantWords}>82 kgs</span> and had
                  just begun exploring strength training and lifting.
                </p>
              </div>
            </div>
            <div className={styles.aboutTextWrapper2}>
              <div className={styles.aboutTextWrapper2}>
                <p className={styles.aboutPara}>
                  One day at the gym,{" "}
                  <span className={styles.importantWords}>my coach</span>{" "}
                  approached me and expressed his interest in helping me pursue{" "}
                  <span className={styles.importantWords}>powerlifting</span>.
                  He saw potential in me and offered to create a tailored
                  program to help me achieve
                  <span className={styles.importantWords}> my goal</span> of
                  reaching a{" "}
                  <span className={styles.importantWords}>100kg</span>. His
                  support and expertise sparked the beginning of my{" "}
                  <span className={styles.importantWords}> journey </span>
                  into{" "}
                  <span className={styles.importantWords}>
                    competitive powerlifting
                  </span>
                  . From that moment on, I committed to working under his
                  guidance, and to this day, I continue training with him. His{" "}
                  <span className={styles.importantWords}>coaching</span> has
                  been instrumental in pushing me to new levels of{" "}
                  <span className={styles.importantWords}>strength</span> and{" "}
                  <span className={styles.importantWords}>discipline</span>.
                </p>
                <div className={styles.aboutPicWrapper}>
                  <Image src={image} className={styles.aboutPic}></Image>
                </div>
              </div>
            </div>
            <div className={styles.aboutTextWrapper3}>
              <div className={styles.aboutTextWrapper3}>
                <div className={styles.aboutPicWrapper}>
                  <Image src={image2} className={styles.aboutPic}></Image>
                </div>
                <p className={styles.aboutPara}>
                  At <span className={styles.importantWords}>15 years old</span>
                  , I entered my first{" "}
                  <span className={styles.importantWords}>
                    powerlifting competition
                  </span>
                  , eager to test my{" "}
                  <span className={styles.importantWords}>strength</span> on the{" "}
                  <span className={styles.importantWords}>big stage</span>. The
                  experience was intense and thrilling, pushing me beyond my
                  limits. When it came to the{" "}
                  <span className={styles.importantWords}>deadlift</span>, I
                  managed to pull an impressive{" "}
                  <span className={styles.importantWords}>275 kg</span>,
                  showcasing the hard work and dedication I had put into my{" "}
                  <span className={styles.importantWords}>training</span>. The
                  moment I completed the{" "}
                  <span className={styles.importantWords}>lift</span>, I knew it
                  was a turning point. Winning that{" "}
                  <span className={styles.importantWords}>competition</span> was
                  a huge achievement and fueled my passion for{" "}
                  <span className={styles.importantWords}>powerlifting</span>{" "}
                  even more, setting the tone for future{" "}
                  <span className={styles.importantWords}>challenges</span>.
                </p>
              </div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.aboutTextWrapper4}>
              <div className={styles.aboutTextWrapper4}>
                <p className={styles.aboutPara}>
                  Over the past{" "}
                  <span className={styles.importantWords}>two years</span>, my
                  dedication and consistent effort have paid off tremendously.
                  Now, at{" "}
                  <span className={styles.importantWords}>16 years old</span>,
                  my bodyweight has increased to{" "}
                  <span className={styles.importantWords}>100 kgs</span>,
                  reflecting both muscle growth and the progress I've made in{" "}
                  <span className={styles.importantWords}>powerlifting</span>.
                  The journey has been intense and rewarding, shaping not only
                  my physique but also my{" "}
                  <span className={styles.importantWords}>mindset</span> and{" "}
                  <span className={styles.importantWords}>discipline</span>.
                </p>
                <div className={styles.aboutPicWrapper}>
                  <Image src={image4} className={styles.aboutPic}></Image>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
