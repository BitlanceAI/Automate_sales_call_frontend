import React from "react";

const SingleRightPanel = ({ title, timestamp }) => {
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
              <a className="dropdown-item" href="#">
                <i className="fa-solid fa-trash-can"></i> Delete
              </a>
            </li>
          </ul>
        </div>
      </div>
    </li>
  );
};

export default SingleRightPanel;