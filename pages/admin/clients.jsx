import React, { useState, useEffect, useRef } from "react";
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
  Folder,
  BookOpenCheck,
  Search,
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

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openedClientModal, setOpenedClientModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [allUsers, setAllUsers] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const userEmail = useRef("");
  const userPassword = useRef("");
  const userName = useRef();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const querySnapshot = await getDocs(usersCollection);
        const users = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAllUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, []);

  const filteredClients = allUsers.filter((user) => {
    // Search by name or email
    const matchesSearch =
      user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by status
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && user.activeProgram === "true") ||
      (statusFilter === "inactive" && user.activeProgram === "false");

    return matchesSearch && matchesStatus;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = userEmail.current.value;
    const password = userPassword.current.value;
    const displayName = userName.current.value;

    try {
      // Creating a new user account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Updating the user profile with the display name
      await updateProfile(user, { displayName: displayName });

      // Adding the user to Firestore
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        date: serverTimestamp(),
        activeProgram: "true",
      });

      // Clear form data
      //   setFormData({ name: "", email: "", password: "" });

      // Close the form modal
      //   onClose();
      setOpenedClientModal(false);
    } catch (error) {
      console.error("Error creating account:", error);
      setError(error.message);
    }
  };

  return (
    <div className="clients-container">
      {openedClientModal ? (
        <div
          className="modal-overlay"
          onClick={() => setOpenedClientModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              {/* <h2>{title}</h2> */}
              <button
                className="modal-close"
                onClick={() => setOpenedClientModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" ref={userName} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" ref={userEmail} required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Password</label>
                  <input type="tel" id="phone" ref={userPassword} required />
                </div>
                <button type="submit" className="submit-button">
                  Add Client
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* Sidebar - Kept Original Classes */}
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

      {/* Main Content */}
      <div className="clients-main">
        {/* Header */}
        <div className="clients-header">
          <h1 className="clients-title">Clients</h1>
          <button
            className="clients-add-btn"
            onClick={() => setOpenedClientModal(true)}
          >
            <Plus className="clients-icon" />
            Add Client
          </button>
        </div>

        {/* Table & Filters */}
        <div className="clients-table-container">
          <div className="clients-table-header">
            <div className="clients-search-filter">
              <div className="clients-search-box">
                <Search className="clients-search-icon" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  className="clients-search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="clients-filter-box">
                <Filter className="clients-filter-icon" />
                <select
                  className="clients-filter-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="clients-table-wrapper">
            <table className="clients-table">
              <thead>
                <tr className="clients-table-head">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Join Date</th>
                  <th>uid</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="clients-table-body">
                {filteredClients.map((user, index) => (
                  <tr key={index} className="clients-table-row">
                    <td>{user.displayName}</td>
                    <td>{user.email}</td>
                    <td>
                      {new Date(user.date.seconds * 1000).toLocaleDateString()}
                    </td>{" "}
                    <td>{user.uid}</td>
                    <td>
                      <span
                        className={`clients-status ${
                          user.activeProgram === "true"
                            ? "clients-active-status"
                            : "clients-inactive-status"
                        }`}
                      >
                        {user.activeProgram === "true" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="clients-actions">
                      <button className="clients-action-btn">
                        <MoreVertical className="clients-icon" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
