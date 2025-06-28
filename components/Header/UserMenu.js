"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";

import defaultAvatar from "../../public/images/team/team-01sm.jpg"; // fallback avatar

import UserMenuItems from "./HeaderProps/UserMenuItem";

const UserMenu = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Optionally redirect or clear user state on logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <div className="inner">
        <div className="rbt-admin-profile">
          <div className="admin-thumbnail">
            <Image
              src={user?.photoURL || defaultAvatar}
              width={2000}
              height={2000}
              alt="User Image"
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div className="admin-info">
            <span className="name">{user?.displayName || "Guest"}</span>
            <p className="email">{user?.email || ""}</p>
            <Link className="rbt-btn-link color-primary" href="/profile-details">
              View Profile
            </Link>
          </div>
        </div>
        <UserMenuItems parentClass="user-list-wrapper user-nav" />
        <hr className="mt--10 mb--10" />
        <ul className="user-list-wrapper user-nav">
          <li>
            <Link href="/privacy-policy">
              <i className="fa-solid fa-comments-question"></i>
              <span>Help Center</span>
            </Link>
          </li>
          <li>
            <Link href="/profile-details">
              <i className="fa-sharp fa-solid fa-gears"></i>
              <span>Settings</span>
            </Link>
          </li>
        </ul>
        <hr className="mt--10 mb--10" />
        <ul className="user-list-wrapper">
          <li>
            <button onClick={handleLogout} className="logout-btn" style={{ all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <i className="fa-sharp fa-solid fa-right-to-bracket"></i>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserMenu;