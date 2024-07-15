// pages/cart.js
import { use, useEffect, useState } from "react";
import { collection, doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Image from "next/image";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import styles from "../../styles/Bookings.module.css";
import CalendlyWidget from "../calendlyWidget";
import calender from "../../src/assets/calender-removebg-preview.png";
import { IoArrowBack } from "react-icons/io5";

export default function booking() {
  const router = useRouter();
  const auth = getAuth();
  // const user = auth.currentUser;
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [cart, setCart] = useState([]);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set the user state
      } else {
        setUser(null); // Clear the user state on sign out
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {modalOpen ? (
        <div>
          <IoArrowBack
            className="calorieCalculatorBack"
            onClick={() => {
              router.push("/testimonials");
            }}
          />
          <div className={styles.calendlyWrapper}>
            <div className={styles.calendlyTextWrapper}>
              <h1 className={styles.calendlyText}>
                Book your <span className="blue">meeting</span> to explain your{" "}
                <span className="blue">goals</span>
              </h1>
              <input
                type="submit"
                value="Schedule Meeting"
                className={styles.calenderButton}
                onClick={() => setModalOpen(true)}
              />
            </div>
            <div className={styles.calendlyCalenderPicWrapper}>
              <Image
                className={styles.calendlyCalenderPic}
                src={calender}
              ></Image>
            </div>
          </div>
          <div className={styles.modalOpen} onClick={() => setModalOpen(false)}>
            <CalendlyWidget />
          </div>
          <div className={styles.backdropOpen} onClick={() => setModalOpen(false)}></div>
        </div>
      ) : (
        <div>
          <IoArrowBack
            className="calorieCalculatorBack"
            onClick={() => {
              router.push("/testimonials");
            }}
          />
          <div className={styles.calendlyWrapper}>
            <div className={styles.calendlyTextWrapper}>
              <h1 className={styles.calendlyText}>
                Book your <span className="blue">meeting</span> to explain your{" "}
                <span className="blue">goals</span>
              </h1>
              <input
                type="submit"
                value="Schedule Meeting"
                className={styles.calenderButton}
                onClick={() => setModalOpen(true)}
              />
            </div>
            <div className={styles.calendlyCalenderPicWrapper}>
              <Image
                className={styles.calendlyCalenderPic}
                src={calender}
              ></Image>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
