"use client";

import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { MdOutlineShoppingCart, MdArrowBack } from "react-icons/md";
import styles from "../../styles/Program.module.css";

export default function Page() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [programData, setProgramData] = useState(null);
  const [workoutDetails, setWorkoutDetails] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  // Fetch program data for the user
  const showProgram = async () => {
    if (!user) return; // If no user is logged in, exit early

    try {
      setLoading(true); // Start loading state

      const docRef = doc(db, "programs", user.uid, "program", "programDetails");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setProgramData(userData.days || []); // Set program data if exists
      } else {
        setProgramData([]); // No program found, set empty data
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
    }
  }, [user]);

  // Only try to find workout after programData is available and id exists
  useEffect(() => {
    if (programData?.length > 0 && id) {
      const workout = programData.find((item) => +item.id === +id);
      setWorkoutDetails(workout); // Set the workout details if found
    }
  }, [programData, id]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message if data is loading
  }

  if (!workoutDetails) {
    return <div>Workout not found.</div>; // If no workout was found, show an error message
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

        <div className="day-title">{workoutDetails.day}</div>

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
      </div>
    </>
  );
}
