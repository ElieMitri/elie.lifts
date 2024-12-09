import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/router";
// import styles from "../styles/Testimonials.module.css";
import React, { useRef } from "react";
import { MdArrowBack, MdCheck } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

export default function Testimonials() {
  const router = useRouter();


  return (
    <div>
      <input type="text" placeholder="uid"/>
      <button>Enter</button>
    </div>
  )
}
