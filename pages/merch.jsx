import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { data } from "../Data.js";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { MdOutlineShoppingCart, MdArrowBack } from "react-icons/md";
// import { styled } from "@mui/material/styles";
import Image from "next/image";
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
import { IoExitOutline } from "react-icons/io5";
import * as React from "react";
import { styled } from "@mui/material/styles";
// import * as React from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Merch() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [openedLogin, setOpenedLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [openedSignup, setOpenedSignup] = useState(false);
  const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(0);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [personUid, setPersonUid] = useState("");
  const userEmail = useRef("");
  const userPassword = useRef("");
  const userName = useRef();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setOpenedLogin(false);
        setSubscribed(true);
        setUserDetails(user);
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function getNumberOfItemsCart() {
      if (userDetails) {
        try {
          const docRef = doc(db, "numberOfItems", userDetails.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setNumberOfItemsInCart(docSnap.data().numberOfItemsInCart);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching document: ", error);
        }
      }
    }

    getNumberOfItemsCart();
  }, [userDetails]);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user !== null) {
      user.providerData.forEach((profile) => {
        console.log(user.displayName);
        console.log(user.email);
        console.log(user.uid);
      });
    }
  }, []);

  useEffect(() => {
    updateProfile(auth.currentUser, {
      displayName: userName,
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });

  }, []);


  useEffect(() => {
    if(user === null) {
      setOpenedLogin(true);
    }
  }, []);



  async function login() {
    if (user) {
      setOpenedSignup(false);
      router.push("/merch");
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

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function switchModals() {
    setOpenedLogin(true);
    setOpenedSignup(false);
  }
  function switchModals1() {
    setOpenedLogin(false);
    setOpenedSignup(true);
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

      console.log("User created:", user);

      // Navigate to the merch page
      router.push("/merch");
    } catch (error) {
      console.error("Error creating account:", error);
      setError(error.message); // Show error message to the user
    }
  }

  // Helper function to validate email
  function isValidEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  async function addToCart(item) {
    if (!subscribed) {
      setOpenedLogin(true);
      setOpenedSignup(false);
    } else {
      try {
        const cartRef = doc(db, "carts", user.uid);
        const cartSnapshot = await getDoc(cartRef);
        if (cartSnapshot.exists()) {
          const currentCart = cartSnapshot.data().items || [];
          const newCart = [...currentCart, item];
          setCart(newCart);
          setItemCount(newCart.length);
          await updateDoc(cartRef, { items: newCart });
          await setDoc(doc(db, "numberOfItems", user.uid), {
            count: newCart.length,
          });
        } else {
          const newCart = [item];
          setCart(newCart);
          setItemCount(newCart.length);
          await setDoc(cartRef, { items: newCart });
          await setDoc(doc(db, "numberOfItems", user.uid), {
            count: newCart.length,
          });
        }
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
    async function getNumberOfItemsCart() {
      try {
        const docRef = doc(db, "numberOfItems", userDetails.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setNumberOfItemsInCart(docSnap.data().count);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching number of items in cart:", error);
      }
    }

    getNumberOfItemsCart();
  }

  useEffect(() => {
    async function getNumberOfItemsCart() {
      try {
        const docRef = doc(db, "numberOfItems", userDetails.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setNumberOfItemsInCart(docSnap.data().count);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching number of items in cart:", error);
      }
    }
    console.log(numberOfItemsInCart);
    getNumberOfItemsCart();
  }, [userDetails.uid]);

  function signOut() {
    firebaseSignOut(auth).then(() => {
      router.push("/");
    });
  }

  return (
    <div className="container">
      <div className="cartWrapper">
        <div className="welcomeWrapper">
          <button onClick={() => router.push("/")} className="backButton">
            <MdArrowBack size={24} />
          </button>
          {user ? (
            <h1 className="welcome">
              Welcome, <span className="blue">{user.displayName}!</span>
            </h1>
          ) : (
            <h1></h1>
          )}
        </div>

        {user ? (
          <IconButton aria-label="cart" onClick={() => router.push("/cart")}>
            <StyledBadge
              badgeContent={numberOfItemsInCart}
              className="number__of--items"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "red",
                  color: "white",
                },
              }}
            >
              <MdOutlineShoppingCart className="cart" />
            </StyledBadge>
          </IconButton>
        ) : (
          <div></div>
        )}
      </div>

      {user ? (
        <IoExitOutline
          onClick={(auth) => signOut(auth)}
          className="exitButton"
        />
      ) : (
        <div></div>
      )}

      {user ? (
        <div className="cards">
          {data.map((info) => (
            <div className="card" key={info.id}>
              <div className="image__wrapper">
                <Image
                  className="image"
                  src={info.url}
                  alt={`Merchandise ${info.id}`}
                  width={300}
                  height={300}
                  priority
                  onClick={() => router.push(`/merch/${info.id}`)}
                  // onClick={() => setErrorMessage(true)}
                />
              </div>
              <h1 className="cardName">{info.name}</h1>
              {info.salePrice === null ? (
                <div>
                  <h5 className="prices">${info.originalPrice}</h5>
                </div>
              ) : (
                <div>
                  <h5 className="prices">
                    <span className="sale__active">${info.originalPrice}</span>
                    <span className="price">${info.salePrice}</span>
                  </h5>
                </div>
              )}
              <div className="buttonWrapper">
                <button onClick={() => addToCart(info)} className="buttonAdd">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
          {openedLogin ? (
            <>
              {" "}
              <div className="modalOpen">
                <IoMdClose
                  className="close__modal"
                  onClick={() => setOpenedLogin(false)}
                />
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
                  <button className="login__button" onClick={switchModals1}>
                    Create an account
                  </button>
                </div>
              </div>
              <div className="backdropOpen"></div>
            </>
          ) : (
            <></>
          )}
          {openedSignup ? (
            <>
              <div className="modalOpen">
                <IoMdClose
                  className="close__modal"
                  onClick={() => setOpenedSignup(false)}
                />
                <div className="login__inputs">
                  <h1 className="login__title">Sign Up</h1>
                  <input
                    type="name"
                    className="modal__input"
                    placeholder="Name"
                    ref={userName}
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
                  <button className="login__btn cursor" onClick={createAccount}>
                    Sign Up
                  </button>
                  <div className="login__or">
                    <h4 className="login__h4">OR</h4>
                  </div>
                  <button className="login__button" onClick={switchModals}>
                    Login
                  </button>
                </div>
              </div>
              <div className="backdropOpen"></div>
            </>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="cards">
          {data.map((info) => (
            <div className="cardLoader" key={info.id}>
              <div className="image__wrapper">
                {/* <Image
                  className="imageLoader"
                  src={info.url}
                  alt={`Merchandise ${info.id}`}
                  width={300}
                  height={300}
                  priority
                  // onClick={() => router.push(`/merch/${info.id}`)}
                  // onClick={() => setErrorMessage(true)}
                /> */}
                <div className="imageLoader"></div>
              </div>
              <h1 className="cardNameLoader"></h1>

              <div>
                <h5 className="pricesLoader"></h5>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// export default MerchPage;
