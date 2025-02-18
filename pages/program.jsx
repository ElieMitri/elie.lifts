import styles from "../styles/Program.module.css";
import { useRouter } from "next/router";
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
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "@/firebase";
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
import Link from "next/link";

export default function About({ about }) {
  const router = useRouter();

  const [switched, setSwitched] = useState(null);
  const [error, setError] = useState(null);
  const [emailCheck, setEmailCheck] = useState(null);
  const [nameCheck, setNameCheck] = useState(null);
  const [isFromClients, setIsFromClients] = useState(false);
  const [user, setUser] = useState(null);
  const [theUserId, setTheUserId] = useState(null);
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [programData, setProgramData] = useState(null);

  const userEmail = useRef("");
  const userPassword = useRef("");
  const userName = useRef();

  function isValidEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function signOut() {
    firebaseSignOut(auth).then(() => {
      //   router.push("/");
    });
  }

  // async function createAccount(e) {
  //   e.preventDefault(); // Prevent the default form submission behavior

  //   const email = userEmail.current.value;
  //   const password = userPassword.current.value;
  //   const displayName = userName.current.value;

  //   // Validate email
  //   if (!isValidEmail(email)) {
  //     setError("Email is invalid");
  //     return;
  //   }

  //   setError(null);

  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     const user = userCredential.user;

  //     await updateProfile(user, {
  //       displayName: displayName,
  //     });

  //     await addDoc(collection(db, "users"), {
  //       uid: user.uid,
  //       email: user.email,
  //       displayName: displayName,
  //       date: serverTimestamp(),
  //       activeProgram: "false",
  //     });
  //   } catch (error) {
  //     console.error("Error creating account:", error);
  //     setError(error.message);
  //   }
  // }

  async function login() {
    const email = userEmail.current.value;
    const password = userPassword.current.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

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

  async function checkEmail(e) {
    const emailValue = userEmail.current.value;
    setEmailCheck(emailValue);

    console.log("Entered Email:", emailValue);

    try {
      const users = await fetchAllUsers();
      const emailExists = users.some((user) => user.email === emailValue);

      if (emailExists) {
        console.log("Email exists");
      } else {
        console.log("Email does not exist");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function showProgram() {
      if (!user) return; // Ensure user is logged in
  
      try {
        // console.log("Fetching program for user:", user.uid);
  
        // Reference to the 'programs' subcollection under the user document
        const collectionRef = collection(db, "programs", user.uid, "programs");
        console.log(collectionRef);
  
        // Fetch all documents in the 'programs' subcollection
        const querySnapshot = await getDocs(collectionRef);
  
        if (querySnapshot.empty) {
          console.log("No programs found for this user!");
          setProgramData([]); // Initialize as empty
        } else {
          // Iterate over documents and get the data for each program
          const programs = querySnapshot.docs.map(doc => doc.data());
          console.log("User Program Data:", programs);
          setProgramData(programs); // Set programs data to state
        }
      } catch (error) {
        console.error("Error fetching program:", error);
      } finally {
        setLoading(false); // Ensure loading state updates properly
      }
    }
  
    if (user) {
      setLoading(true); // Set loading before fetching
      showProgram();
    } else {
      setLoading(false); // If no user, stop loading
    }
  }, [user]);

  return (
    <>
      <button onClick={() => router.push("/")} className={styles.backButton}>
        <MdArrowBack size={24} />
      </button>
      <section className={styles.program} ref={about}>
        <div className="workout-cards">
          {programData?.map((workout, index) => (
            <div
              key={index}
              className="workout-card"
              onClick={() => router.push(`/program/${workout.id}`)}
            >
              <div className="card-header">
                <div className="date">{workout.dayDetails}</div>
              </div>

              <div className="day-title">Day {workout.day}</div>

              <div className="exercises">
                {workout.exercises?.map((exercise, idx) => (
                  <div key={idx} className="exercise-item">
                    <div className="exercise-items">
                      <div className="exercise-label">
                        {idx === 0
                          ? "🔥"
                          : `${String.fromCharCode(65 + idx - 1)}${
                              idx === 1 || idx === 2 ? idx : ""
                            }`}
                      </div>
                      <div className="exercise-name">{exercise.exercise}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {user ? (
          <div>
            <IoExitOutline onClick={signOut} className="exitButton" />
            {}
          </div>
        ) : (
          <>
            <div className="modalOpen">
              <button
                onClick={() => router.push("/")}
                className={styles.backButton}
              >
                <MdArrowBack size={24} />
              </button>
              <div className="login__inputs">
                <h1 className="login__title">Login</h1>
                <input
                  type="email"
                  className="modal__input"
                  placeholder="Email"
                  ref={userEmail}
                />
                {/* <div className="password__login"> */}
                <input
                  type="password"
                  className="modal__input"
                  placeholder="••••••••••••"
                  ref={userPassword}
                />
                {/* </div> */}
                <button className="login__btn cursor" onClick={login}>
                  Log in
                </button>
              </div>
            </div>
            <div className="backdropOpen"></div>
          </>
        )}
      </section>
    </>
  );
}
