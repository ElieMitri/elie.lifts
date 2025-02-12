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

  const [users, setUsers] = useState([]); // Store users with remarks

  const fetchAllUsers = async () => {
    try {
      // Fetch all comments from the 'comments' collection
      const commentsCollection = collection(db, "comments");
      const querySnapshot = await getDocs(commentsCollection);
  
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      console.log("Fetched Comments (Remarks):", usersData);
      setUsers(usersData); // Set the fetched data in state
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  
  

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      <h2>Users and Their Remarks</h2>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id} className={styles.userCard}>
            <h3>{user.name}</h3>
            {user.remarks.length > 0 ? (
              <div className={styles.remarks}>
                <h4>Remarks:</h4>
                <ul>
                  {user.remarks.map((remark) => (
                    <li key={remark.id}>{remark.comment}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No remarks available for this user.</p>
            )}
          </div>
        ))
      ) : (
        <p>Loading users...</p>
      )}
    </div>
  );
}
