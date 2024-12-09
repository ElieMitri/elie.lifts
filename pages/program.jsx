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

export default function About({ about }) {
  const router = useRouter();

  const [switched, setSwitched] = useState(null);
  const [error, setError] = useState(null);
  const [emailCheck, setEmailCheck] = useState(null);
  const [nameCheck, setNameCheck] = useState(null);
  const [isFromClients, setIsFromClients] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [user, setUser] = useState(null);

  const userEmail = useRef("");
  const userPassword = useRef("");
  const userName = useRef();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        //   const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

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

    // const clientNames = clients.map((client) => client.name);

    // const typedName = userName.current.value;

    // console.log(typedName);

    // const isNamePresent = clients.some((client) => client.name === typedName);

    // if (isNamePresent) {
    //   console.log(`${typedName} is in the clients list.`);
    // } else {
    //   console.log(`${typedName} is not in the clients list.`);
    //   setError(`${typedName} is not in the clients list.`);
    //   setIsFromClients(true);
    // }

    setError(null); // Reset error state

    try {
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user; // Extract the user object

      // Update the user's profile (e.g., display name)
      await updateProfile(user, {
        displayName: displayName,
      });

      // Add the user to the Firestore database
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
      });
    } catch (error) {
      console.error("Error creating account:", error);
      setError(error.message); // Show error message to the user
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
      const usersCollection = collection(db, "users"); // Replace "users" with your collection name
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

  async function checkName(e) {
    const nameValue = userName.current.value;
    setNameCheck(nameValue);

    console.log(nameValue);

    try {
      const users = await fetchAllUsers();
      const nameExists = users.some((user) => user.displayName === nameValue);

      if (nameExists) {
        console.log("Name exists");
      } else {
        console.log("Nmae does not exist");
      }
    } catch (error) {
      console.error(error);
    }
  }

  //   useEffect(() => {
  //     console.log(auth.currentUser);
  //     if (user) {
  //       signedUp(true);
  //     } else {
  //       signedUp(false);
  //     }
  //   }, []);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setSignedUp(!!currentUser); // Set signedUp based on whether user exists
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array to run only once

  return (
    <>
      <section className={styles.program} ref={about}>
        <button onClick={() => router.push("/")} className="backButton">
          <MdArrowBack size={24} />
        </button>

        {signedUp ? (
          <div>
            <IoExitOutline
              onClick={signOut}
              className="exitButton"
            />
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
                  onChange={checkName}
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
