"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { collection, getDocs } from "firebase/firestore";
import { db1 } from "../../lib/firebase";
import { useAppContext } from "@/context/Context";
import darkBg from "../../public/images/light/service/bg-testimonial.png";
import darkBgHover from "../../public/images/light/service/bg-testimonial-hover.png";

import "venobox/dist/venobox.min.css";

const Testimonial = () => {
  const { isLightTheme } = useAppContext();
  const [members, setMembers] = useState([]);

  const settings = {
    infinite: false,
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

  useEffect(() => {
    async function fetchMembers() {
      try {
        const querySnapshot = await getDocs(collection(db1, "communityMembers"));
        const membersData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            rating: data.rating ?? 5, // default stars
            ...data,
          };
        });
        setMembers(membersData);
      } catch (error) {
        console.error("Error fetching community members:", error);
      }
    }
    fetchMembers();

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
                  className={`rainbow-box-card card-style-default testimonial-style-defalt has-bg-shaped`}
                >
                  <div className="inner">
                    {/* Rating Stars */}
                    <div className="rating">
                      {Array.from({ length: member.rating }, (_, i) => (
                        <a href="#rating" key={i}>
                          <i className="fa-sharp fa-solid fa-star"></i>
                        </a>
                      ))}
                    </div>

                    {/* Content */}
                    <div className="content">
                      <p className="description">{member.bio}</p>
                      <div className="bottom-content">
                        <div className="meta-info-section">
                          <p className="title-text">{member.name}</p>
                          <p className="desc">{member.designation}</p>
                        </div>
                        <div className="meta-img-section">
                          <a className="image" href={member.linkedinUrl} target="_blank">
                            <Image
                              src={member.image}
                              width={43}
                              height={43}
                              alt={member.name}
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Background */}
                  <div className="bg-shape">
                 <Image
  className="bg"
  src="/images/service/bg-testimonial.png"
  width={415}
  height={287}
  alt=""
/>

<Image
  className="bg-hover"
  src="/images/service/bg-testimonial-hover.png"
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
