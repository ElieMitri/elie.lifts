import { useRef, useEffect, useState } from "react";
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
} from "lucide-react";
import Link from "next/link";

// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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

function StatCard({ title, value, icon: Icon, trend }) {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <div className="stat-icon">
          <Icon className="icon-style" />
        </div>
        {trend && (
          <span
            className={`stat-trend ${
              trend.positive ? "trend-positive" : "trend-negative"
            }`}
          >
            {trend.value}
            <ArrowUpRight className="trend-arrow" />
          </span>
        )}
      </div>
      <h3 className="stat-value">{value}</h3>
      <p className="stat-title">{title}</p>
    </div>
  );
}

function RecentActivity() {
  const activities = [
    { type: "New Client", name: "Michel Mitri", time: "1 minute ago" },
    {
      type: "New Client",
      name: "Charbel Klayaani",
      time: "1 hours ago",
    },
    { type: "New Client", name: "Hanna Mitri", time: "5 hours ago" },
  ];

  return (
    <div className="recent-activity">
      <h2 className="recent-title">Recent Activity</h2>
      <div className="activity-list">
        {activities.map((activity, index) => (
          <div key={index} className="activity-item">
            <div>
              <p className="activity-type">{activity.type}</p>
              <p className="activity-name">{activity.name}</p>
            </div>
            <span className="activity-time">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// function QuickActions() {
//   return (
//     <div className="button-container">
//     <button className="action-button">
//       <Folder className="icon" />
//      Edit Program
//     </button>
//     <button className="action-button">
//       <FolderPlus className="icon" />
//       Add Program
//     </button>
//   </div>

//   );
// }

function Page() {
  const [numberOfClients, setNumberOfClients] = useState();
  const [activeProgram, setActiveProgram] = useState();
  const [inactiveProgram, setInactiveProgram] = useState();
  const [adminLogged, setAdminLogged] = useState(false);
  const [users, setUsers] = useState([]);

  const userEmail = useRef()
  const userPassword = useRef()

  const stats = [
    {
      title: "Total Clients",
      value: numberOfClients,
      icon: Users,
      // trend: { value: "+12.5%", positive: true },
    },
    {
      title: "Active Programs",
      value: activeProgram,
      icon: BookOpenCheck,
      // trend: { value: "+5.2%", positive: true },
    },
    {
      title: "Inactive Programs",
      value: inactiveProgram,
      icon: BookOpen,
      // trend: { value: "-3.2%", positive: false },
    },
  ];

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const querySnapshot = await getDocs(usersCollection);

        const users = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // console.log("Fetched Users:", users);

        let activeCount = 0;
        let inactiveCount = 0;

        // Logging each user for active/inactive program
        users.forEach((user) => {
          // console.log(`User ID: ${user.id}, Active: ${user.activeProgram}, Inactive: ${user.inactiveProgram}`);
          if (user.activeProgram === "true") {
            activeCount++;
          } else if (user.activeProgram === "false") {
            inactiveCount++;
          }
        });

        setActiveProgram(activeCount);
        setInactiveProgram(inactiveCount);
        setNumberOfClients(users.length);

        // Set the users in state
        setUsers(users);
      } catch (error) {
        // console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, []);

  function loginAdmin() {
    // signInWithEmailAndPassword(auth, "mitri@admin.com", "la55c0de")
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //   });

    const email = userEmail.current.value
    const password = userPassword.current.value

    if(email === "mitri@admin.com" && password === "la55c0de") {
      setAdminLogged(true)
    } else (
      setAdminLogged(false)
    )
  }

  return (
    <>
      {adminLogged ? (
        <div className="dashboard-container">
          <div className="dashboard-layout">
            {/* Sidebar */}
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

            <main className="main-content">
              <header className="header"></header>

              <div className="stats-grid">
                {stats.map((stat) => (
                  <StatCard key={stat.title} {...stat} />
                ))}
              </div>

              {/* Quick Actions */}
              {/* <div className="quick-actions">
          <h2 className="section-title">Quick Actions</h2>
          <QuickActions />
        </div> */}

              <div className="recent-activity">
                <h2 className="recent-title">Recent Activity</h2>
                <div className="activity-list">
                  {users.length === 0 ? (
                    <p>No users found</p>
                  ) : (
                    users.map((user) => {
                      // Convert Firestore timestamp to a Date object
                      const timestamp = user.date;
                      const date = timestamp
                        ? new Date(timestamp.seconds * 1000)
                        : null;

                      // Calculate time difference in minutes
                      let timeString = "Just now";
                      if (date) {
                        const minutesDifference = Math.floor(
                          (new Date() - date) / (1000 * 60)
                        );
                        const hours = Math.floor(minutesDifference / 60);
                        const minutes = minutesDifference % 60;

                        if (hours > 0) {
                          timeString = `${hours} hour${hours > 1 ? "s" : ""}${
                            minutes > 0
                              ? ` and ${minutes} minute${
                                  minutes > 1 ? "s" : ""
                                }`
                              : ""
                          } ago`;
                        } else if (minutes > 0) {
                          timeString = `${minutes} minute${
                            minutes > 1 ? "s" : ""
                          } ago`;
                        }
                      }

                      return (
                        <div key={user.id} className="activity-item">
                          <div>
                            <p className="activity-type">New Client</p>
                            <p className="activity-name">{user.displayName}</p>
                          </div>
                          {date && (
                            <span className="activity-time">{timeString}</span>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      ) : (
        <>
          <div className="modalOpen">
            {/* <button
              onClick={() => router.push("/")}
              className={styles.backButton}
            >
              <MdArrowBack size={24} />
            </button> */}
            <div className="login__inputs">
              <h1 className="login__title">Admin</h1>
              <input
                type="email"
                className="modal__input"
                placeholder="Email"
                ref={userEmail}
              />
              {/* <div className="password__login"> */}
              <input
                type="password"
                className="modal__input"
                placeholder="••••••••••••"
                ref={userPassword}
              />
              {/* </div> */}
              <button className="login__btn cursor" onClick={loginAdmin}>
                Log in
              </button>
            </div>
          </div>
          <div className="backdropOpen"></div>
        </>
      )}
    </>
  );
}

export default Page;
