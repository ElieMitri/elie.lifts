// pages/cart.js
import { use, useEffect, useState } from "react";
import { collection, doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Image from "next/image";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { IoTrash } from "react-icons/io5";

export default function Cart() {
  const router = useRouter();
  const auth = getAuth();
  // const user = auth.currentUser;
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

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
  }, [user]); // Dependency array includes `user`

  // async function deleteItem() {
  //   const neCart =
  // }

  return (
    <div>
      <MdArrowBack onClick={() => router.push("/merch")} className="back" />
      <div className="cards">
        {cartItems?.map((info) => (
          <div className="card" key={info.id}>
            <div className="image__wrapper">
              <Image
                className="image"
                src={info.url}
                alt={`Merchandise ${info.id}`}
                width={300}
                height={300}
                priority
              />
            </div>
            <h1>{info.name}</h1>
            {info.salePrice === null ? (
              <div>
                <h5 className="prices">{info.originalPrice}</h5>
              </div>
            ) : (
              <div>
                <h5 className="prices">
                  <span className="sale__active">{info.originalPrice}</span>
                  <span>{info.salePrice}</span>
                </h5>
              </div>
            )}
            <IoTrash className="trash" onClick={deleteItem} />
          </div>
        ))}
      </div>
    </div>
  );
}
