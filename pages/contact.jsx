import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/router";
import styles from "../styles/Contact.module.css"
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function Home() {
  const router = useRouter()
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_64w4ozp', 'template_tseyqlg', form.current, 'cmtRSAvKWGNgzz7I-')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <div>
      <IoArrowBack
          className="calorieCalculatorBack"
          onClick={() => {
            router.push("/");
          }}
        />
    <div className={styles.formWrapper}>
      <h1 className={styles.formTitle}>Contact</h1>
    <form ref={form} onSubmit={sendEmail} className={styles.form}>
      <input type="text" name="user_name" placeholder="Name..." className={styles.formInput}/>
      <input type="email" name="user_email" placeholder="Email..." className={styles.formInput}/>
      <textarea name="message" placeholder="Enter your message..." className={styles.formMessage}/>
      <input type="submit" value="Send" className={styles.formButton}/>
    </form>
    </div>
    </div>
  );
}
