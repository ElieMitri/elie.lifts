// pages/cart.js
import { use, useEffect, useState } from "react";
import { collection, doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Image from "next/image";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Cart() {
  const router = useRouter();
  const auth = getAuth();
  // const user = auth.currentUser;
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState([]);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set the user state
      } else {
        setUser(null); // Clear the user state on sign out
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  // Fetch cart items when user is set
  useEffect(() => {
    if (user) {
      const fetchCartItems = async () => {
        try {
          const cartRef = doc(collection(db, "carts"), user.uid);
          const cartDoc = await getDoc(cartRef);

          if (cartDoc.exists()) {
            setCartItems(cartDoc.data().items);
          }
        } catch (error) {
          console.error("Error fetching cart items: ", error);
        }
      };

      fetchCartItems();
      console.log(user.uid);
    }
    console.log(cartItems);
  }, [user]); // Dependency array includes `user`
  
  const totalPrice = cartItems.reduce((total, item) => {
      const price = item.salePrice !== null ? item.salePrice : item.originalPrice;
      return total + price;
    }, 0);

    
    const tax = totalPrice * 0.11
    const finalPrice = totalPrice + tax
  return (
    <div>
      <MdArrowBack onClick={() => router.push("/merch")} className="back" />
      <div className="checkoutLayoutWrapper">
        <div className="checkoutLayout">
          {cartItems?.map((info) => (
            <div className="checkout" key={info.id}>
              <h1>{info.name}</h1>
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
            </div>
          ))}
        </div>
        Items:{" "}
        {cartItems?.map((info) => (
          <div className="checkout" key={info.id}>
            {info.salePrice === null ? (
              <div>
                <h5 className="pricesCheckout">${info.originalPrice}</h5>
              </div>
            ) : (
              <div>
                <h5 className="pricesCheckout">
                  <span>${info.salePrice}</span>
                </h5>
              </div>
            )}
          </div>
        ))}
        <div>Tax: ${tax.toFixed(2)}</div>
        <div>Total Price: ${finalPrice.toFixed(2)}</div>
        <button className="login__btn">Checkout</button>
      </div>
    </div>
  );
}
