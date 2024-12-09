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

export default function About({ about }) {
  const router = useRouter();

  const [switched, setSwitched] = useState(null);
  const [error, setError] = useState(null);
  const [isFromClients, setIsFromClients] = useState(false);

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
    if (user) {
      setSwitched(null);
    }
    try {
      await signInWithEmailAndPassword(
        auth,
        userEmail.current.value,
        userPassword.current.value
      );
    } catch (error) {
      setError("Incorrect email or password!");
    }
  }

  function checkName(e) {
    // console.log(e.target.value);
    const clientNames = clients.map((client) => client.name);

    const typedName = userName.current.value;

    // console.log(typedName);

    const isNamePresent = clients.some((client) => client.name === typedName);

    if (isNamePresent) {
      console.log(`${typedName} is in the clients list.`);
      setIsFromClients(true);
    } else {
      //   setError(`${typedName} is not in the clients list.`);
      //   console.log(error);
      setIsFromClients(false);
    }
    console.log(isFromClients);
  }

  return (
    <>
      <section className={styles.program} ref={about}>
        <button onClick={() => router.push("/")} className="backButton">
          <MdArrowBack size={24} />
        </button>

        {/* {clients.map((info) => (
          <div className="" key={info.id}>
            <h1 className="">{info.name}</h1>
          </div>
        ))} */}

        {switched ? (
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
                <button className="login__btn cursor">Log in</button>
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
                {/* <h1>{error}</h1>F */}
                <h1 className="login__title">Sign Up</h1>
                <input
                  type="name"
                  className="modal__input"
                  placeholder="Name"
                  ref={userName}
                  //   onChange={(e) => console.log(e.target.value)}
                  onChange={checkName}
                />
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

                {isFromClients ? (
                  <>
                    <button
                      className="login__btn cursor"
                      onClick={createAccount}
                    >
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
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="backdropOpen"></div>
          </>
        )}
      </section>
    </>
  );
}
