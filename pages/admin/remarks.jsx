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

const mockPrograms = [
  {
    id: 1,
    name: "Hanna Mitri",
    description: "Bodybuilding",
    duration: "16 weeks",
    status: "Active",
    enrollments: 45,
    lastUpdated: "2024-02-20",
  },
  {
    id: 2,
    name: "Elie Mitri",
    description: "Powerlifting",
    duration: "8 weeks",
    status: "Active",
    enrollments: 28,
    lastUpdated: "2024-02-15",
  },
  {
    id: 3,
    name: "Charbel Klayaani",
    description: "Bodybuilding",
    duration: "24 weeks",
    status: "Draft",
    enrollments: 0,
    lastUpdated: "2024-02-10",
  },
];

export default function Remarks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [numberOfClients, setNumberOfClients] = useState();
  const [activeProgram, setActiveProgram] = useState();
  const [inactiveProgram, setInactiveProgram] = useState();
  const [users, setUsers] = useState([]);
  const [remarksData, setRemarksData] = useState([]);




  const filteredPrograms = mockPrograms.filter((program) => {
    const matchesSearch =
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && program.status === "Active") ||
      (statusFilter === "draft" && program.status === "Draft");
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    const fetchAllUsersAndRemarks = async () => {
      try {
        const usersCollection = collection(db, "users");
        const querySnapshot = await getDocs(usersCollection);

        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched Users:", usersList);

        const allRemarks = [];

        for (const user of usersList) {
          console.log(`Fetching remarks for user: ${user.uid}`);

          // Assuming "comments" is a subcollection under each user document
          const remarksCollection = collection(
            db,
            "comments",
            user.uid,
            "remarks"
          );
          const remarksSnapshot = await getDocs(remarksCollection);

          const remarks = remarksSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          allRemarks.push({ uid: user.uid, remarks });
        }

        setNumberOfClients(usersList.length);
        setUsers(usersList);
        setRemarksData(allRemarks);
      } catch (error) {
        // console.error("Error fetching users and remarks:", error);
      }
    };

    fetchAllUsersAndRemarks();
  }, []);

  console.log(remarksData);

  function tryParseJSON(str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return str; // return the original string if not valid JSON
    }
  }

  const [adminLogged, setAdminLogged] = useState(false);
  const userCode = useRef();

  // function loginAdmin() {
    // const email = userCode.current.value;

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
  // }

  return (
    <>
      {adminLogged ? (
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
              <h1 className="programs-title">Remarks</h1>
              {/* <button className="programs-add-btn">
            <Plus className="icon" /> Create Program
          </button> */}
            </div>
            <div className="remarks">
              {remarksData.map((user, index) => (
                <div key={index}>
                  {user.remarks.length > 0 ? (
                    <ul>
                      {user.remarks.map((remark, rIndex) => (
                        <li key={rIndex}>
                          <div className="remark-content">
                            <div className="remark-header">
                              {/* <div className="remark-name">
                            {remark.date?.seconds
                              ? new Date(
                                  remark.date.seconds * 1000
                                ).toLocaleDateString()
                              : "Invalid Date"}
                          </div> */}

                              <div className="remark-name">
                                {remark.Name ? tryParseJSON(remark.Name) : ""}
                              </div>
                              <div className="remark-email">
                                {remark.email ? tryParseJSON(remark.email) : ""}
                              </div>
                            </div>
                            <div className="remark-comment">
                              <h1 className="remark-comment-title"> Remark:</h1>
                              {remark.Comment
                                ? tryParseJSON(remark.Comment)
                                : remark.text || ""}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    // <div className="no-remarks">
                    //   <p>No remarks available</p>
                    // </div>
                    <></>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="modalOpen">
            <div className="login__inputs">
              <h1 className="login__title">Admin</h1>
              <input
                type="text"
                className="modal__input"
                placeholder="Code"
                ref={userCode}
                onChange={handleCodeChange}
              />
              {/* <button className="login__btn cursor" onChange={(e) => setCode(e.target.value)}>
                Enter
              </button> */}
            </div>
          </div>
          <div className="backdropOpen"></div>
        </>
      )}
    </>
  );
}
