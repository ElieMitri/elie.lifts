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

  return (
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
        {openedProgramModal ? (
          <div>
            <div
              className="modal-overlay"
              onClick={() => setOpenedProgramModal(false)}
            >
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  {/* <h2>{title}</h2> */}
                  <button
                    className="modal-close"
                    onClick={() => setOpenedProgramModal(false)}
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
                        ref={userProgramId}
                        required
                        placeholder="id"
                      />
                    </div>
                    <div className="form-group">
                      {/* <label htmlFor="description">Description</label> */}
                      <input
                        type="text"
                        id="description"
                        ref={userBlock}
                        required
                        placeholder="Block"
                      />
                    </div>
                    <div className="form-group">
                      {/* <label htmlFor="duration">Block Duration</label> */}
                      <input
                        type="text"
                        id="duration"
                        ref={userDay}
                        placeholder="Day"
                        required
                      />
                    </div>
                    <div className="form-group">
                      {/* <label htmlFor="duration">Days</label> */}
                      <input
                        type="text"
                        id="duration"
                        ref={userDayDetails}
                        placeholder="Day Details"
                        required
                      />
                    </div>
                    <div className="form-group">
                      {/* <label htmlFor="duration">Case</label> */}
                      <input
                        type="text"
                        id="duration"
                        ref={userCase}
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
                    <td>{program.duration}</td>
                    <td>{program.days}</td>
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
  );
}
