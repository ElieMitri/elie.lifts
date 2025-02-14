import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/router";
// import styles from "../styles/Testimonials.module.css";
// import React, { useEffect, useRef } from "react";
import { FaCheck } from "react-icons/fa";
// import { useRouter } from "next/router";
import { useRef, useEffect, useState } from "react";
import * as React from "react";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  setDoc,
  doc,
  collection,
  serverTimestamp,
  addDoc,
  getDoc,
  updateDoc,
  signOut,
  getFirestore,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebase";
import { IoMdClose } from "react-icons/io";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { clients } from "@/clients";
import { MdOutlineShoppingCart, MdArrowBack } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";

import { w4Q0O40LP1Y96sA5mhgL } from "../../programs/Dany";

export default function Testimonials() {
  const router = useRouter();
  const userName = useRef();

  const [usernameId, setUsernameId] = useState("");
  const [userId, setUserId] = useState("");
  const [result, setResult] = useState(null);

  async function addProgramDany() {
    try {
      const userId = "pHufCKTRxdX5mUosQgAVWuUUMP02"; // Use the dynamic user ID as needed
      const programRef = doc(
        db,
        "programs",
        userId,
        "program",
        "programDetails"
      );

      // Get the existing program details, if any
      const programSnapshot = await getDoc(programRef);

      let newProgram = [];

      if (programSnapshot.exists()) {
        // If program exists, retrieve the existing data
        newProgram = programSnapshot.data().days || [];
        console.log("Existing program found, adding new days...");
      }

      // Add each day from w4Q0O40LP1Y96sA5mhgL to the program
      for (let i = 0; i < w4Q0O40LP1Y96sA5mhgL.length; i++) {
        const day = w4Q0O40LP1Y96sA5mhgL[i];

        // If the day doesn't already exist, add it to the program
        if (!newProgram.some((existingDay) => existingDay.day === day.day)) {
          newProgram.push(day);
          console.log(`Added ${day.day}`);
        } else {
          console.log(`${day.day} already exists`);
        }
      }

      // Save the updated program (or new program) in Firestore
      await setDoc(programRef, { days: newProgram });

      console.log("Program updated successfully!");
    } catch (error) {
      console.error("Error adding program:", error);
    }
  }

  return (
    <div className="checkingWrapper">
      <button onClick={addProgramDany} className="checkingButton">
        Dany
      </button>
    </div>
  );
}
