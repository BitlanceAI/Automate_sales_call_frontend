"use client";

import React, { useEffect, useState } from "react";
import { db1 } from "@/lib/firebase"; // your Firestore init
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const Release = () => {
  const [releaseNotes, setReleaseNotes] = useState([]);

  useEffect(() => {
    async function fetchReleaseNotes() {
      try {
        const releaseNotesRef = collection(db1, "releaseNotes");
        const q = query(releaseNotesRef, orderBy("order", "asc"));
        const querySnapshot = await getDocs(q);

        const notes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReleaseNotes(notes);
      } catch (error) {
        console.error("Failed to fetch release notes:", error);
      }
    }
    fetchReleaseNotes();
  }, []);

  return (
    <>
      <div className="rbt-main-content">
        <div className="rbt-daynamic-page-content center-width">
          <div className="rbt-dashboard-content">
            <div className="banner-area">
              <div className="settings-area">
                <h3 className="title">Release Notes</h3>
              </div>
              <div className="content-page pb--50">
                <div className="chat-box-list">
                  <div className="content">
                    {releaseNotes.length === 0 && <p>Loading...</p>}
                    {releaseNotes.map((data, index) => (
                      <div className="row changelog_info" id="v120" key={data.id}>
                        <div className="col-lg-3 changelog_date">
                          <div className="c_date">
                            <h6>{data.date}</h6>
                            <p>{data.text}</p>
                            <p>{data.issue}</p>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <div className="version_info">
                            <div className="c_version">{data.version}</div>
                            <div className="line bottom_half"></div>
                          </div>
                        </div>
                        <div className="col-lg-7">
                          <div className="changelog_content">
                            {data.content?.map((innerData, innerIndex) => (
                              <p key={innerIndex}>
                                <span
                                  className={`${innerData.status} text-uppercase`}
                                >
                                  {innerData.status === "new"
                                    ? "ADDED"
                                    : innerData.status.toUpperCase()}
                                </span>{" "}
                                {innerData.text}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Release;
