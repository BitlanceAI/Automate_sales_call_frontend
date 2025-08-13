"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "venobox/dist/venobox.min.css";

import darkBg from "../../public/images/light/service/bg-testimonial.png";
import darkBgHover from "../../public/images/light/service/bg-testimonial-hover.png";
import { useAppContext } from "@/context/Context";

// Firestore
import { db1 } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const Testimonial = () => {
  const { isLightTheme } = useAppContext();
  const [members, setMembers] = useState([]);

  // Slider settings
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    dots: true,
    arrows: true,
    cssEase: "linear",
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 769, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 581, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

// Fetch members from Firebase
useEffect(() => {
  async function fetchMembers() {
    try {
      const querySnapshot = await getDocs(collection(db1, "communityMembers"));
      const membersData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          rating: data.rating ?? 5, // ✅ default to 5 stars
          ...data,
        };
      });
      setMembers(membersData);
    } catch (error) {
      console.error("Error fetching community members:", error);
    }
  }
  fetchMembers();

  // Venobox video lightbox
  import("venobox/dist/venobox.min.js").then((venobox) => {
    new venobox.default({
      selector: ".popup-video",
      maxWidth: window.innerWidth >= 992 ? "70%" : "100%",
    });
  });
}, []);


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Slider
            {...settings}
            className="service-wrapper rainbow-service-slider-actvation slick-grid-15 rainbow-slick-dot rainbow-gradient-arrows"
          >
            {members.map((member) => (
              <div className="slide-single-layout" key={member.id}>
                <div
                  className="rainbow-box-card card-style-default testimonial-style-defalt has-bg-shaped"
                  style={{ background: "transparent" }}
                >
                  <div className="inner">
                    {/* Community Member label + dynamic rating */}
                    <div className="rating">
                      <span className="community-label">Community Member</span>
                      {[...Array(member.rating || 0)].map((_, i) => (
                        <a href="#rating" key={i}>
                          <i className="fa-sharp fa-solid fa-star"></i>
                        </a>
                      ))}
                    </div>

                    <div className="content">
                      <p className="description">{member.bio}</p>
                      <div className="bottom-content">
                        <div className="meta-info-section">
                          <p className="title-text">{member.name}</p>
                          <p className="desc">{member.role || "Member"}</p>
                          {member.brandImg && (
                            <div className="desc-img">
                              <Image
                                src={member.brandImg}
                                width={86}
                                height={23}
                                alt="Brand"
                              />
                            </div>
                          )}
                        </div>
                        <div className="meta-img-section">
                          {member.videoUrl && (
                            <Link
                              className="btn-default rounded-player style-two xs-size popup-video"
                              href={member.videoUrl}
                              data-vbtype="video"
                            >
                              <span>
                                <i className="fa-duotone fa-play"></i>
                              </span>
                            </Link>
                          )}
                          {member.image && (
                            <a className="image" href={member.linkedinUrl || "#"} target="_blank" rel="noopener noreferrer">
                              <Image
                                src={member.image}
                                width={43}
                                height={43}
                                alt={member.name}
                              />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Background shapes */}
                  <div className="bg-shape">
                    <Image
                      className="bg"
                      src={isLightTheme ? member.bgImg || darkBg : darkBg}
                      width={415}
                      height={287}
                      alt=""
                    />
                    <Image
                      className="bg-hover"
                      src={isLightTheme ? member.bgImgHover || darkBgHover : darkBgHover}
                      width={415}
                      height={287}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
