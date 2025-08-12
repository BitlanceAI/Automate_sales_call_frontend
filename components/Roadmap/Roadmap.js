"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Sal from "sal.js";

const Roadmap = () => {
  const [roadmapData, setRoadmapData] = useState(null);

  useEffect(() => {
    Sal();

    async function fetchRoadmap() {
      try {
        const res = await fetch("/api/roadmap"); 
        if (!res.ok) throw new Error("Failed to fetch roadmap data");
        const data = await res.json();
        setRoadmapData(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchRoadmap();
  }, []);

  return (
    <>
      <div className="roadmap-section rainbow-section-gap-big rainbow-section-gapBottom">
        <div className="container">
          {roadmapData?.roadmap?.map((data, index) => (
            <div className="row changelog_info" id="v120" key={index}>
              <div className="col-lg-3 changelog_date">
                <div className="c_date">
                  <h6>{data.heading} </h6>
                  <p>{data.date}</p>
                </div>
              </div>
              <div className="col-lg-2">
                <div className="version_info">
                  {data.isCheck ? (
                    <div className="c_version">
                      <i className="fa-duotone fa-check"></i>
                    </div>
                  ) : data.isLoading ? (
                    <div className="c_version bg-yellow">
                      <i className="fa-duotone fa-loader"></i>
                    </div>
                  ) : (
                    <div className="c_version bg-dark">
                      <i className="fa-regular fa-message-lines"></i>
                    </div>
                  )}

                  {data.isBorader ? <div className="line bottom_half"></div> : ""}
                </div>
              </div>
              <div className="col-lg-3">
                <div className="changelog_content">
                  <p className="text">{data.desc}</p>
                  <p className="title">{data.title}</p>
                  <ul className="content-list">
                    {data.list?.map((item, i) => (
                      <li key={i}>{item.desc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rainbow-callto-action rainbow-call-to-action style-8 content-wrapper rainbow-section-gapBottom">
        <div className="container">
          <div className="row row--0 align-items-center ">
            <div className="col-lg-12">
              <div className="inner">
                <div className="content text-center">
                  <h3
                    className="title sal-animate"
                    data-sal="slide-up"
                    data-sal-duration="400"
                    data-sal-delay="200"
                  >
                    Missing a feature?
                  </h3>
                  <p
                    className="sal-animate"
                    data-sal="slide-up"
                    data-sal-duration="400"
                    data-sal-delay="300"
                  >
                    Anything you're missing in our product? Drop <br /> a
                    message here to let us know!
                  </p>
                  <div
                    className="call-to-btn text-center mt--30 sal-animate"
                    data-sal="slide-up"
                    data-sal-duration="400"
                    data-sal-delay="400"
                  >
                    <Link className="btn-default btn-icon" href="contact">
                      Send feature request
                    </Link>
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

export default Roadmap;
