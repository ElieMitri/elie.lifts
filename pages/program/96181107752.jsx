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

import { KZfhMalW7QqCYNPi9Wiw } from "../../programs/Hanna";
import { w4Q0O40LP1Y96sA5mhgL } from "../../programs/Dany";

export default function Testimonials() {
  const router = useRouter();
  const userName = useRef();

  const [usernameId, setUsernameId] = useState("");
  const [userId, setUserId] = useState("");
  const [result, setResult] = useState(null);

  const fetchAllUsers = async () => {
    try {
      const usersCollection = collection(db, "users");
      const querySnapshot = await getDocs(usersCollection);

      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Fetched Users:", users);
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  async function checkForName() {
    const nameValue = userName.current.value;
    console.log(nameValue);
    try {
      const users = await fetchAllUsers();
      const nameExists = users.some((user) => user.email === nameValue);
      const sameUser = users.find((user) => user.email === nameValue);

      if (nameExists) {
        console.log("Name exists");
        console.log(sameUser.id);
        setUsernameId(sameUser.id);
      } else {
        // console.log("Name does not exist");
      }
    } catch (error) {
      console.error(error);
    }
  }

  // async function addProgramDany() {
  //   try {
  //     for (let i = 0; i < w4Q0O40LP1Y96sA5mhgL.length; i++) {
  //       const day = w4Q0O40LP1Y96sA5mhgL[i];

  //       await setDoc(
  //         doc(db, "programs", "w4Q0O40LP1Y96sA5mhgL", "program", day.day),
  //         day
  //       );
  //       console.log(`Added ${day.day}`);
  //     }
  //   } catch (error) {
  //     console.error("Error adding program:", error);
  //   }
  // }

  async function addProgramDany() {
    try {
      const userId = "3CHyJ4ikQzdRBug1JeCg2p6IHbM2"; // Use the dynamic user ID as needed
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
      <input
        type="text"
        placeholder="name"
        ref={userName}
        className="checkingInput"
      />
      <button onClick={checkForName} className="checkingButton">
        Enter
      </button>
      <button onClick={fetchAllUsers}>Get</button>
      <h1 className="idNumber">{usernameId}</h1>
      <button onClick={addProgramDany} className="checkingButton">
        Dany
      </button>
    </div>
  );
}
