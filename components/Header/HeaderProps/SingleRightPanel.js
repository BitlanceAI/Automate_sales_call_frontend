import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "@/app/lib/firebaseClient";

const SingleRightPanel = ({ title, timestamp }) => {
  const handleDelete = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const docId = `${user.uid}_${title}`; // Must match the one used during `setDoc`
    await deleteDoc(doc(db, "history", docId));
    window.location.reload(); // Simple refresh (or you can lift state for better UX)
  };

  return (
    <li className="history-box active">
      <div className="inner d-flex justify-content-between align-items-center">
        <div className="content">
          <h6 className="title">{title}</h6>
          <span className="time text-muted small">{timestamp}</span>
        </div>
        <div className="dropdown history-box-dropdown">
          <button
            type="button"
            className="more-info-icon dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa-regular fa-ellipsis"></i>
          </button>
          <ul className="dropdown-menu">
            <li>
              <button className="dropdown-item" onClick={handleDelete}>
                <i className="fa-solid fa-trash-can"></i> Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
    </li>
  );
};

export default SingleRightPanel;