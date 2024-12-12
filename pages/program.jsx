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

  async function createAccount(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    const email = userEmail.current.value;
    const password = userPassword.current.value;
    const displayName = userName.current.value;

    // Validate email
    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: displayName,
      });

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
      });
    } catch (error) {
      console.error("Error creating account:", error);
      setError(error.message);
    }
  }

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

  // function tryingg() {
  //   console.log(user?.email);

  //   const fetchAllUsers = async () => {
  //     try {
  //       const usersCollection = collection(db, "users");
  //       const querySnapshot = await getDocs(usersCollection);

  //       const users = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));

  //       const sameUser = users.find(
  //         (u) => u.email && u.email.toLowerCase() === user.email.toLowerCase()
  //       );

  //       if (sameUser) {
  //         console.log(sameUser.id);
  //         setTheUserId(sameUser.id);
  //       } else {
  //         console.log("No user found with the email:", user.email);
  //       }

  //       return users; // Return users if needed
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //       return [];
  //     }
  //   };

  //   fetchAllUsers(); // Ensure this function is called

  //   async function showProgram() {
  //     // Ensure the user ID is valid
  //     if (!theUserId) {
  //       console.error("Invalid user ID:", theUserId);
  //       return;
  //     }

  //     try {
  //       const docRef = doc(
  //         db,
  //         "programs",
  //         theUserId,
  //         "program",
  //         "programDetails"
  //       );
  //       const docSnap = await getDoc(docRef);

  //       if (docSnap.exists()) {
  //         console.log(docSnap.data().day);
  //         const userData = docSnap.data();
  //         setData(userData);
  //       } else {
  //         console.log("No such document!");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching document:", error);
  //     }
  //   }

  //   showProgram();
  //   console.log(data);
  // }

  useEffect(() => {
    if (user) {
      console.log(user?.email);

      const fetchAllUsers = async () => {
        try {
          const usersCollection = collection(db, "users");
          const querySnapshot = await getDocs(usersCollection);

          const users = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          return users; // Return users if needed
        } catch (error) {
          console.error("Error fetching users:", error);
          return [];
        }
      };

      async function showProgram() {
        try {
          const result = await fetchAllUsers(); // Ensure this function is called
          console.log(user.uid);

          const docRef = doc(
            db,
            "programs",
            user.uid,
            "program",
            "programDetails"
          );
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            console.log(userData.days);
            setProgramData(userData.days);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        }
      }

      showProgram();
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [user]);

  return (
    <>
        <button onClick={() => router.push("/")} className={styles.backButton}>
          <MdArrowBack size={24} />
        </button>
      <section className={styles.program} ref={about}>

        <div className="workouts">
          {programData?.map((info) => (
            <div className="workout" key={info.day}>
              <div className="day">{info.day}</div>
              <div className="dayDetails">{info.dayDetails}</div>
              <div className="exercises">
                {info.exercises?.map((exercise, index) => (
                  <div className="exerciseWrapper" key={index}>
                    <div className="exerciseName">{exercise.exercise}:</div>
                    <div className="setsReps">{exercise.setsReps}</div>
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
        ) : switched ? (
          <>
            <div className="modalOpen">
              <div className="login__inputs">
                <h1 className="login__title">Login</h1>
                <input
                  type="email"
                  className="modal__input"
                  placeholder="Email"
                  ref={userEmail}
                />
                <div className="password__login">
                  <input
                    type="password"
                    className="modal__input"
                    placeholder="••••••••••••"
                    ref={userPassword}
                  />
                </div>
                <button className="login__btn cursor" onClick={login}>
                  Log in
                </button>
                <div className="login__or">
                  <h4 className="login__h4">OR</h4>
                </div>
                <button
                  className="login__button"
                  onClick={() => setSwitched(false)}
                >
                  Create an account
                </button>
              </div>
            </div>
            <div className="backdropOpen"></div>
          </>
        ) : (
          <>
            <div className="modalOpen">
              <div className="login__inputs">
                <h1 className="login__title">Sign Up</h1>
                <input
                  type="name"
                  className="modal__input"
                  placeholder="Name"
                  ref={userName}
                  // onChange={checkName}
                />
                <input
                  type="email"
                  className="modal__input"
                  placeholder="Email"
                  ref={userEmail}
                  onChange={checkEmail}
                />
                <div className="password__login">
                  <input
                    type="password"
                    className="modal__input"
                    placeholder="••••••••••••"
                    ref={userPassword}
                  />
                </div>
                <button className="login__btn cursor" onClick={createAccount}>
                  Sign Up
                </button>
                <div className="login__or">
                  <h4 className="login__h4">OR</h4>
                </div>
                <button
                  className="login__button"
                  onClick={() => setSwitched(true)}
                >
                  Login
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
