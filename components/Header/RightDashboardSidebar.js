"use client";

import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "@/app/lib/firebaseClient";
import { useAppContext } from "@/context/Context";
import SingleRightPanel from "./HeaderProps/SingleRightPanel";

const RightDashboardSidebar = () => {
  const { shouldCollapseRightbar } = useAppContext();
  const [userHistory, setUserHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, "history"),
        where("uid", "==", user.uid),
        orderBy("timestamp", "desc") // 🔥 Order by latest
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => doc.data());
      setUserHistory(data);
    };

    fetchHistory();
  }, []);

  return (
    <div
      className={`rbt-right-side-panel popup-dashboardright-section ${
        shouldCollapseRightbar ? "collapsed" : ""
      }`}
    >
      <div className="right-side-top">
        <a
          className="btn-default bg-solid-primary"
          data-bs-toggle="modal"
          data-bs-target="#newchatModal"
        >
          <span className="icon">
            <i className="feather-plus-circle"></i>
          </span>
          <span>New Chat</span>
        </a>
      </div>

      <div className="right-side-bottom">
        <div className="small-search search-section mb--20">
          <input type="search" placeholder="Search Here..." />
          <i className="feather-search"></i>
        </div>

        <div className="chat-history-section">
          <h6 className="title">Recent Activity</h6>
          <ul className="chat-history-list">
            {userHistory.length > 0 ? (
              userHistory.map((data, index) => (
                <SingleRightPanel
                  key={index}
                  title={data.page || "Unknown Page"}
                  timestamp={
                    data.timestamp?.seconds
                      ? new Date(data.timestamp.seconds * 1000).toLocaleString()
                      : "Unknown time"
                  }
                />
              ))
            ) : (
              <li>No activity yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RightDashboardSidebar;