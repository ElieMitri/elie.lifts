import React, { useState, useEffect, useRef } from "react";
// import { Search, Filter, MoreVertical, Plus } from 'lucide-react';
import {
  Users,
  BookOpen,
  Activity,
  PieChart,
  Settings,
  Shield,
  Plus,
  UserPlus,
  FolderPlus,
  ArrowUpRight,
  Search,
  Folder,
  BookOpenCheck,
  Filter,
  MoreVertical,
  X as CloseIcon,
  Minus,
} from "lucide-react";
import Link from "next/link";
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
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "@/firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  signOut as firebaseSignOut,
} from "firebase/auth";

export default function Programs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openedProgramModal, setOpenedProgramModal] = useState(false);
  const [openedProgramDetailsModal, setOpenedProgramDetailsModal] =
    useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [allUsers, setAllUsers] = useState();

  const [personName, setPersonName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [days, setDays] = useState("");
  const [personCase, setPersonCase] = useState("");
  const [status, setStatus] = useState("");

  const userName = useRef("");
  const userDescription = useRef("");
  const userDuration = useRef("");
  const userDays = useRef("");
  const userCase = useRef("");
  const userStatus = useRef("");

  const userProgramId = useRef("");
  const userBlock = useRef("");
  const userDay = useRef("");
  const userDayDetails = useRef("");

  const userUid = useRef("");

  const [exercises, setExercises] = useState([
    {
      exercise: "",
      setsReps: "",
      warmups: [""],
      workingSets: [""],
      videoUrl: "",
    },
  ]);

  const dayType = useRef(null);
  const userBlock2 = useRef(null);
  const userDay2 = useRef(null);
  const userDayDetails2 = useRef(null);

  // const createProgram = async (e) => {
  //   e.preventDefault();

  //   // Function to generate unique ID for each program
  //   const generateCustomId = (numberLength, letterLength) => {
  //     const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  //     const randomNumber = Math.floor(
  //       Math.random() * Math.pow(10, numberLength)
  //     ); // Random number with specified length

  //     let randomId = randomNumber.toString().padStart(numberLength, "0"); // Ensure the number is padded to the specified length

  //     for (let i = 0; i < letterLength; i++) {
  //       const randomLetter =
  //         letters[Math.floor(Math.random() * letters.length)];
  //       randomId += randomLetter; // Append the letter to the ID
  //     }

  //     return String(randomId);
  //   };

  //   try {
  //     const program = {
  //       id: generateCustomId(3, 5), // Unique program ID
  //       block: userBlock2.current?.value || "",
  //       day: userDay2.current?.value || "",
  //       dayDetails: userDayDetails2.current?.value || "",
  //       exercises: exercises.map((exercise) => ({
  //         ...exercise,
  //         warmups: exercise.warmups?.filter((w) => w !== ""),
  //         workingSets: exercise.workingSets?.filter((w) => w !== ""),
  //       })),
  //       createdAt: serverTimestamp(),
  //     };

  //     console.log(program.id);
  //     // Add the document to the 'programs' subcollection for the specific user
  //     const docRef = await setDoc(
  //       doc(db, "programs", userId, "programs", program.id), // Save under specific user and program ID
  //       program
  //     );
  //     console.log("Program saved with ID: ", docRef.id);

  //     // Clear the form
  //     setExercises([
  //       {
  //         exercise: "",
  //         setsReps: "",
  //         warmups: [""],
  //         workingSets: [""],
  //         videoUrl: "",
  //       },
  //     ]);

  //     // Close the modal
  //     setOpenedProgramModal(false);
  //   } catch (error) {
  //     console.error("Error saving program:", error);
  //     // Here you could add error handling UI feedback
  //   }
  // };

  // Function to generate a unique ID
  const generateCustomId = (numberLength, letterLength) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const randomNumber = Math.floor(
      Math.random() * Math.pow(10, numberLength)
    ).toString(); // Convert number to string

    let randomId = randomNumber.padStart(numberLength, "0"); // Ensure padding

    for (let i = 0; i < letterLength; i++) {
      const randomLetter = letters[Math.floor(Math.random() * letters.length)];
      randomId += randomLetter; // Append random letters
    }

    return String(randomId); // Ensure it's a string
  };

  const createProgram = async (e) => {
    e.preventDefault();
  
    try {
      const userId = userUid.current?.value?.trim(); // Ensure user ID is valid
      if (!userId) {
        throw new Error("User ID is required.");
      }
  
      const programId = generateCustomId(3, 5); // Generate program ID
      console.log("Generated Program ID:", programId, typeof programId);
  
      if (typeof programId !== "string") {
        throw new Error("Generated program ID is not a string");
      }
  
      // Ensure `Type` is extracted correctly
      const programType = dayType?.current?.value?.trim() || "";
  
      const program = {
        id: programId,
        Type: programType, // Ensure Type is a string
        block: userBlock2.current?.value?.trim() || "",
        day: userDay2.current?.value?.trim() || "",
        dayDetails: userDayDetails2.current?.value?.trim() || "",
        exercises: exercises.map((exercise) => ({
          ...exercise,
          warmups: exercise.warmups?.filter((w) => w !== ""),
          workingSets: exercise.workingSets?.filter((w) => w !== ""),
        })),
        createdAt: serverTimestamp(),
      };
  
      // Save document in Firestore under the user's "programs" subcollection
      await setDoc(doc(db, "programs", userId, "programs", programId), program);
      console.log("Program saved with ID: ", programId);
  
      // Clear form
      setExercises([
        {
          exercise: "",
          setsReps: "",
          warmups: [""],
          workingSets: [""],
          videoUrl: "",
        },
      ]);
  
      // Close modal
      setOpenedProgramModal(false);
    } catch (error) {
      console.error("Error saving program:", error);
    }
  };
  

  const addExercise = () => {
    setExercises([
      ...exercises,
      {
        exercise: "",
        setsReps: "",
        warmups: [""],
        workingSets: [""],
        videoUrl: "",
      },
    ]);
  };

  const removeExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const updateExercise = (index, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index] = { ...updatedExercises[index], [field]: value };
    setExercises(updatedExercises);
  };

  const addSet = (exerciseIndex, type) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex][type] = [
      ...(updatedExercises[exerciseIndex][type] || []),
      "",
    ];
    setExercises(updatedExercises);
  };

  const updateSet = (exerciseIndex, setIndex, type, value) => {
    const updatedExercises = [...exercises];
    if (updatedExercises[exerciseIndex][type]) {
      updatedExercises[exerciseIndex][type][setIndex] = value;
      setExercises(updatedExercises);
    }
  };

  const removeSet = (exerciseIndex, setIndex, type) => {
    const updatedExercises = [...exercises];
    if (updatedExercises[exerciseIndex][type]) {
      updatedExercises[exerciseIndex][type] = updatedExercises[exerciseIndex][
        type
      ].filter((_, i) => i !== setIndex);
      setExercises(updatedExercises);
    }
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const usersCollection = collection(db, "programDetails");
        const querySnapshot = await getDocs(usersCollection);

        // Map through the snapshot and structure the data
        const users = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log(users); // Check users in the console for verification

        setAllUsers(users); // Set the users in the state
      } catch (error) {
        console.error("Error fetching users:", error); // Handle any errors
      }
    };

    fetchAllUsers(); // Execute the function to fetch users
  }, []);

  console.log(allUsers);

  const filteredDetails = allUsers?.filter((user) => {
    // Check if the user matches the search term
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.description?.toLowerCase().includes(searchTerm.toLowerCase());

    // Check if the user matches the status filter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && user.status === "Active") ||
      (statusFilter === "inactive" && user.status === "Inactive");

    // Return the filtered result
    return matchesSearch && matchesStatus;
  });

  async function createProgramDetails(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    const displayName = userName.current.value;
    const description = userDescription.current.value;
    const duration = userDuration.current.value;
    const days = userDays.current.value;
    const personCase = userCase.current.value;
    const status = userStatus.current.value;
    // const uid = userId.current.value;

    try {
      await addDoc(collection(db, "programDetails"), {
        displayName: displayName,
        description: description,
        duration: duration,
        days: days,
        personCase: personCase,
        status: status,
      });
    } catch (error) {
      console.error("Error creating account:", error);
      // setError(error.message);
    }
  }

  const [adminLogged, setAdminLogged] = useState(false);
  const userEmail = useRef();

  const [code, setCode] = useState();

  useEffect(() => {
    if (code === "1508") {
      setAdminLogged(true);
    }
  }, [code]); // This will only run when `code` changes

  // Handle the code input
  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <>
      {/* {adminLogged ? ( */}
      <>
        <aside className="sidebar">
          <div className="sidebar-header">
            <h1 className="dashboard-title">Dashboard</h1>
          </div>
          <nav className="sidebar-nav">
            <Link href="/admin">
              <button className="sidebar-button">
                <Activity className="sidebar-icon" />
                Overview
              </button>
            </Link>
            <Link href="/admin/clients">
              <button className="sidebar-button">
                <Users className="sidebar-icon" />
                Clients
              </button>
            </Link>
            <Link href="/admin/programs">
              <button className="sidebar-button">
                <BookOpen className="sidebar-icon" />
                Programs
              </button>
            </Link>
            <Link href="/admin/remarks">
              <button className="sidebar-button">
                <Shield className="sidebar-icon" />
                Remarks
              </button>
            </Link>
          </nav>
        </aside>
        <div className="programs-container">
          <div className="programs-header">
            <h1 className="programs-title">Programs</h1>
            <button
              className="programs-add-btn"
              onClick={() => setOpenedProgramDetailsModal(true)}
            >
              <Plus className="icon" /> Create Program Details
            </button>
            <button
              className="programs-add-btn"
              onClick={() => setOpenedProgramModal(true)}
            >
              <Plus className="icon" /> Create Program
            </button>
          </div>
          {openedProgramDetailsModal ? (
            <div>
              <div
                className="modal-overlay"
                onClick={() => setOpenedProgramDetailsModal(false)}
              >
                <div
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="modal-header">
                    {/* <h2>{title}</h2> */}
                    <button
                      className="modal-close"
                      onClick={() => setOpenedProgramDetailsModal(false)}
                    >
                      ×
                    </button>
                  </div>
                  <div className="modal-body">
                    <form
                      onSubmit={(e) => createProgramDetails(e)}
                      className="form"
                    >
                      <div className="form-group">
                        {/* <label htmlFor="name">Person Name</label> */}
                        <input
                          type="text"
                          id="name"
                          ref={userName}
                          onChange={(e) => setPersonName(e.target.value)}
                          required
                          placeholder="Name"
                        />
                      </div>
                      <div className="form-group">
                        {/* <label htmlFor="description">Description</label> */}
                        <input
                          type="text"
                          id="description"
                          ref={userDescription}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                          placeholder="Description"
                        />
                      </div>
                      <div className="form-group">
                        {/* <label htmlFor="duration">Block Duration</label> */}
                        <input
                          type="text"
                          id="duration"
                          ref={userDuration}
                          onChange={(e) => setDuration(e.target.value)}
                          placeholder="Block Duration"
                          required
                        />
                      </div>
                      <div className="form-group">
                        {/* <label htmlFor="duration">Days</label> */}
                        <input
                          type="text"
                          id="duration"
                          ref={userDays}
                          onChange={(e) => setDays(e.target.value)}
                          placeholder="Days"
                          required
                        />
                      </div>
                      <div className="form-group">
                        {/* <label htmlFor="duration">Case</label> */}
                        <input
                          type="text"
                          id="duration"
                          ref={userCase}
                          onChange={(e) => setPersonCase(e.target.value)}
                          placeholder="Case"
                          required
                        />
                      </div>
                      <div className="form-group">
                        {/* <label htmlFor="duration">Status</label> */}
                        <input
                          type="text"
                          id="duration"
                          ref={userStatus}
                          onChange={(e) => setStatus(e.target.value)}
                          placeholder="Status"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="submit-button"
                        onClick={(e) => createProgramDetails(e)}
                      >
                        Add Program
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {openedProgramModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-header">
                  <h2>Add Program Details</h2>
                  <button
                    onClick={() => setOpenedProgramModal(false)}
                    className="close-button"
                  >
                    <CloseIcon size={24} />
                  </button>
                </div>

                <form onSubmit={createProgram} className="program-form">
                  <div className="form-grid">
                    <input
                      type="text"
                      ref={userUid}
                      required
                      placeholder="uid"
                      className="form-input"
                    />
                    <input
                      type="text"
                      ref={userBlock2}
                      required
                      placeholder="Block"
                      className="form-input"
                    />
                    <input
                      type="text"
                      ref={userDay2}
                      required
                      placeholder="Day"
                      className="form-input"
                    />
                    <input
                      type="text"
                      ref={userDayDetails2}
                      required
                      placeholder="Day Details"
                      className="form-input"
                    />
                    <input
                      type="text"
                      ref={dayType}
                      required
                      placeholder="Day Type"
                      className="form-input"
                    />
                  </div>

                  <div className="exercises-container">
                    {exercises.map((exercise, exerciseIndex) => (
                      <div key={exerciseIndex} className="exercise-card">
                        <div className="exercise-header">
                          <h3 className="exercise-exNumb">
                            Exercise {exerciseIndex + 1}
                          </h3>
                          {exercises.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeExercise(exerciseIndex)}
                              className="remove-button"
                            >
                              <Minus size={20} />
                            </button>
                          )}
                        </div>

                        <div className="exercise-grid">
                          <input
                            type="text"
                            value={exercise.exercise}
                            onChange={(e) =>
                              updateExercise(
                                exerciseIndex,
                                "exercise",
                                e.target.value
                              )
                            }
                            placeholder="Exercise Name"
                            className="form-input"
                          />
                          <input
                            type="text"
                            value={exercise.setsReps}
                            onChange={(e) =>
                              updateExercise(
                                exerciseIndex,
                                "setsReps",
                                e.target.value
                              )
                            }
                            placeholder="Sets & Reps"
                            className="form-input"
                          />
                          <input
                            type="text"
                            value={exercise.videoUrl}
                            onChange={(e) =>
                              updateExercise(
                                exerciseIndex,
                                "videoUrl",
                                e.target.value
                              )
                            }
                            placeholder="Video URL"
                            className="form-input video-input"
                          />
                        </div>

                        {/* Warmup Sets */}
                        <div className="sets-section">
                          <div className="sets-header">
                            <h4 className="exercise-exNumb">Warmup Sets</h4>
                            <button
                              type="button"
                              onClick={() => addSet(exerciseIndex, "warmups")}
                              className="add-button"
                            >
                              <Plus size={20} />
                            </button>
                          </div>
                          {exercise.warmups?.map((warmup, warmupIndex) => (
                            <div key={warmupIndex} className="set-input-group">
                              <input
                                type="text"
                                value={warmup}
                                onChange={(e) =>
                                  updateSet(
                                    exerciseIndex,
                                    warmupIndex,
                                    "warmups",
                                    e.target.value
                                  )
                                }
                                placeholder="e.g., 60kg x 5"
                                className="form-input"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  removeSet(
                                    exerciseIndex,
                                    warmupIndex,
                                    "warmups"
                                  )
                                }
                                className="remove-button"
                              >
                                <Minus size={20} />
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Working Sets */}
                        <div className="sets-section">
                          <div className="sets-header">
                            <h4 className="exercise-exNumb">Working Sets</h4>
                            <button
                              type="button"
                              onClick={() =>
                                addSet(exerciseIndex, "workingSets")
                              }
                              className="add-button"
                            >
                              <Plus size={20} />
                            </button>
                          </div>
                          {exercise.workingSets?.map(
                            (workingSet, workingSetIndex) => (
                              <div
                                key={workingSetIndex}
                                className="set-input-group"
                              >
                                <input
                                  type="text"
                                  value={workingSet}
                                  onChange={(e) =>
                                    updateSet(
                                      exerciseIndex,
                                      workingSetIndex,
                                      "workingSets",
                                      e.target.value
                                    )
                                  }
                                  placeholder="e.g., 100kg x 3"
                                  className="form-input"
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeSet(
                                      exerciseIndex,
                                      workingSetIndex,
                                      "workingSets"
                                    )
                                  }
                                  className="remove-button"
                                >
                                  <Minus size={20} />
                                </button>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addExercise}
                      className="add-exercise-button"
                    >
                      <Plus size={20} className="plusBtnn" />
                      Add Exercise
                    </button>
                  </div>

                  <div className="form-footer">
                    <button type="submit" className="submit-button">
                      Save Program
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <div className="programs-card">
            <div className="programs-search-filter">
              <div className="search-box">
                <Search className="icon search-icon" />
                <input
                  type="text"
                  placeholder="Search programs..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="filter-box">
                <Filter className="icon" />
                <select
                  className="filter-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="table-container">
              <table className="programs-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Days</th>
                    <th>Case</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDetails?.map((program) => (
                    <tr key={program.id}>
                      <td>{program.displayName}</td>
                      <td>{program.description}</td>
                      <td>{program.duration} Weeks</td>
                      <td>{program.days} Days</td>
                      <td>{program.personCase}</td>
                      <td>
                        <span
                          className={`status ${program.status.toLowerCase()}`}
                        >
                          {program.status}
                        </span>
                      </td>
                      <td className="action-column">
                        <button className="action-btn">
                          <MoreVertical className="icon" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
      {/* ) : (
        <>
          <div className="modalOpen">
            <div className="login__inputs">
              <h1 className="login__title">Admin</h1>
              <input
                type="text"
                className="modal__input"
                placeholder="Code"
                ref={userEmail}
                onChange={handleCodeChange}
              />
              {/* <button className="login__btn cursor" onClick={loginAdmin}>
                Enter
              </button> */}
      {/* </div>
          </div>
          <div className="backdropOpen"></div>
        </>
      )} */}
    </>
  );
}
