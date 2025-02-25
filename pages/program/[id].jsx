"use client";

import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { MdOutlineShoppingCart, MdArrowBack } from "react-icons/md";
import styles from "../../styles/Program.module.css";
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

export default function Page() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [programData, setProgramData] = useState(null);
  const [workoutDetails, setWorkoutDetails] = useState(null);
  const [textTyped, setTextTyped] = useState();
  const router = useRouter();
  const { id } = router.query;

  // Fetch program data for the user
  const showProgram = async () => {
    if (!user) return; // If no user is logged in, exit early

    try {
      setLoading(true); // Start loading state

      // Fetch the collection of programs for the user
      const collectionRef = collection(db, "programs", user.uid, "programs");
      const querySnapshot = await getDocs(collectionRef);

      if (!querySnapshot.empty) {
        // Retrieve all programs for the user
        const programs = querySnapshot.docs.map((doc) => doc.data());
        setProgramData(programs); // Set program data if exists
      } else {
        setProgramData([]); // No programs found, set empty data
      }
    } catch (error) {
      console.error("Error fetching program:", error);
      setProgramData([]); // Set empty data if error occurs
    } finally {
      setLoading(false); // End loading state
    }
  };

  // Fetch user state when auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state when auth changes
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  // Fetch program data whenever the user state changes
  useEffect(() => {
    if (user) {
      showProgram(); // Fetch program when user is logged in
      console.log(user);
    }
  }, [user]);

  // Only try to find workout after programData is available and id exists
  useEffect(() => {
    if (programData?.length > 0 && id) {
      // Searching program by id
      const workout = programData.find((item) => item.id === id);
      setWorkoutDetails(workout); // Set the workout details if found
    }
  }, [programData, id]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message if data is loading
  }

  if (!workoutDetails) {
    return <div>Workout not found.</div>; // If no workout was found, show an error message
  }

  async function sendRemark(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Use a nested collection: comments/{userId}/remarks
    await addDoc(collection(db, "comments", user.uid, "remarks"), {
      Name: user.displayName,
      email: user.email,
      Comment: textTyped,
      Time: serverTimestamp(),
    });
    setTextTyped("");
  }

  return (
    <>
      <button
        onClick={() => router.push("/program")}
        className={styles.backButton}
      >
        <MdArrowBack size={24} />
      </button>
      <div className="workout-card-id">
        <div className="card-header">
          <div className="date">{workoutDetails.dayDetails}</div>
        </div>

        <div className="day-title">Day {workoutDetails.day}</div>

        <div className="exercises">
          {workoutDetails.exercises?.map((exercise, idx) => (
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

              {exercise.videoUrl ? (
                <div className="video-container">
                  <iframe
                    width="460"
                    height="315"
                    src={exercise.videoUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <></>
              )}
              {exercise.warmups && exercise.warmups.length > 0 && (
                <div className="warmups">
                  <h4>Warmups:</h4>
                  <ul>
                    {exercise.warmups.map((warmup, warmupIdx) => (
                      <li key={warmupIdx}>{warmup}</li>
                    ))}
                  </ul>
                </div>
              )}

              {exercise.workingSets && exercise.workingSets.length > 0 && (
                <div className="warmups">
                  <h4>Working Sets:</h4>
                  <ul>
                    {exercise.workingSets.map((workingSet, workingSetIdx) => (
                      <li key={workingSetIdx}>{workingSet}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Fallback to showing sets and reps if neither warmups nor working sets exist */}
              {(!exercise.warmups || exercise.warmups.length === 0) &&
                (!exercise.workingSets ||
                  exercise.workingSets.length === 0) && (
                  <div className="sets-reps">
                    <p>{exercise.setsReps}</p>
                  </div>
                )}
            </div>
          ))}
        </div>
        <div className="textAreaIdWrapper">
          <textarea
            name=""
            className="textAreaId"
            placeholder="Any Remarks?"
            onChange={(e) => setTextTyped(e.target.value)}
          ></textarea>
          <button className="submitButton" onClick={(e) => sendRemark(e)}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
