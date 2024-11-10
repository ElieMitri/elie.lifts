import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { data } from "../Data.js";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { MdOutlineShoppingCart, MdArrowBack } from "react-icons/md";
import { styled } from "@mui/material/styles";
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

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

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
        console.log("  Name: " + user.displayName);
        console.log("  Email: " + user.email);
        console.log("  uid: " + user.uid);
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

  async function login() {
    if (user) {
      setOpenedSignup(false);
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
    router.push("/merch");
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

  // async function createAccount(e) {
  //   const auth = getAuth();
  //   createUserWithEmailAndPassword(
  //     auth,
  //     userEmail.current.value,
  //     userPassword.current.value
  //   );
  //   let userInfo = auth.currentUser;
  //   // userInfo.displayName = userName.current.value;
  //   console.log(auth.currentUser);
  //   router.push("/merch");
  //   if (!isValidEmail(e.target.value)) {
  //     setError("Email is invalid");
  //   } else {
  //     setError(null);
  //   }
  //   // await addDoc(collection(db, "users"), userData);

  //   setEmail(event.target.value);
  //   try {
  //     firebase
  //       .auth()
  //       .createUserWithEmailAndPassword(email, password)
  //       .then(() => this.props.navigation.navigate("/"))
  //       .catch((error) => {
  //         alert(error.message);
  //       });
  //   } catch (err) {
  //     alert(err);
  //   }
  // }

  async function createAccount(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    const email = userEmail.current.value;
    const password = userPassword.current.value;
    const displayName = userName.current.value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    setError(null);

    try {
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update user info (displayName)
      await user.updateProfile({
        displayName: displayName,
      });

      console.log("User created: ", user);

      // Optionally, add user data to Firestore
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        // Add other user data as needed
      });

      // Navigate to the merch page
      router.push("/merch");
    } catch (error) {
      console.error("Error creating account: ", error);
      setError(error.message);
    }
  }

  // Helper function to validate email
  function isValidEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  // async function addToCart(item) {
  //   if (subscribed === false) {
  //     setOpenedLogin(true);
  //     setOpenedSignup(false);
  //   } else {
  //     const newCart = [...cart, item];
  //     setCart(newCart);
  //     setItemCount(newCart.length);
  //     console.log(newCart.length);
  //     await addDoc(doc(db, "carts", user.uid), { newCart });
  //     const numberOfItemsInCart = newCart.length;
  //     await addDoc(doc(db, "numberOfItems", user.uid), { numberOfItemsInCart });

  //     // const numberOfDuplicates = cart.find((cartItem) => cartItem.id === item.id)
  //   }
  // }

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

  // useEffect(() => {
  //   async function getNumberOfItemsCart() {
  //     const docRef = doc(db, "numberOfItems", userDetails.uid);
  //     const docSnap = await getDoc(docRef);

  //     if (docSnap.exists()) {
  //       setNumberOfItemsInCart(docSnap.data());
  //     } else {
  //       // docSnap.data() will be undefined in this case
  //       console.log("No such document!");
  //     }
  //   }

  //   console.log(numberOfItemsInCart);
  //   return () => getNumberOfItemsCart();
  // }, []);

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
        <button onClick={() => router.push("/")} className="backButton">
          <MdArrowBack size={24} />
        </button>

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
      {/* <div className="header"> */}
      {user ? (
        <IoExitOutline
          onClick={(auth) => signOut(auth)}
          className="exitButton"
        />
      ) : (
        <div></div>
      )}
      {/* </div> */}
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
                  <span>${info.salePrice}</span>
                </h5>
              </div>
            )}
            <div className="buttonWrapper">
              <button onClick={() => addToCart(info)} className="addToCart">
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
    </div>
  );
}
