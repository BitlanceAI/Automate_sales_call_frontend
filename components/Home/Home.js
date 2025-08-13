"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Sal from "sal.js";

import shapeOne from "../../public/images/bg/icon-shape/icon-shape-one.png";
import shapeTwo from "../../public/images/bg/icon-shape/icon-shape-two.png";
import shapeThree from "../../public/images/bg/icon-shape/icon-shape-three.png";
import shapeFour from "../../public/images/bg/icon-shape/icon-shape-four.png";
import bgShapeOne from "../../public/images/bg/bg-shape-four.png";
import bgShapeTwo from "../../public/images/bg/bg-shape-five.png";
import bgShapeThree from "../../public/images/bg/bg-shape-two.png";

import BrandList from "../Brands/BrandList";
import BrandTwo from "../Brands/Brand-Two";
import Testimonial from "../Testimonials/Testimonial";
import { useAppContext } from "@/context/Context";

const Home = () => {
  const { isLightTheme } = useAppContext();
  const [visibleIndex, setVisibleIndex] = useState(null);

  const tools = ["With SEO", "With SMM", "With Sales", "Chatbot"];

  useEffect(() => {
    Sal();
    setVisibleIndex(0);
    const intervalId = setInterval(() => {
      setVisibleIndex((prevIndex) =>
        prevIndex === null ? 1 : (prevIndex + 1) % tools.length
      );
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div
        className="slider-area slider-style-1 variation-default slider-bg-image bg-banner1 slider-bg-shape"
        data-black-overlay="1"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="inner text-center mt--140">
                <h1 className="title display-one">
                  Automate Your Business
                  <br />
                  <span className="header-caption">
                    <span className="cd-headline rotate-1">
                      <span
                        className="cd-words-wrapper inline-block"
                        style={{
                          display: "inline-block",
                          position: "relative",
                          minWidth: "130px",
                          transition: "opacity 0.5s ease-in-out",
                        }}
                      >
                        {visibleIndex !== null && (
                          <b className="theme-gradient is-visible">
                            {tools[visibleIndex]}
                          </b>
                        )}
                      </span>
                    </span>
                  </span>{" "}
                  Automation by Bitlance
                </h1>

                <p
                  className="description position-relative"
                  style={{ position: "relative", height: "50px" }}
                >
                  Bitlance helps you streamline marketing, boost sales,
                  improve engagement, and enhance SEO performance — all with AI
                  automation.
                </p>

                <div className="form-group">
                  <textarea
                    name="text"
                    id="slider-text-area"
                    cols="30"
                    rows="2"
                    placeholder="Try a prompt, for example: Generate SEO post or social media marketing automation"
                  ></textarea>
                  <Link className="btn-default" href="/text-generator">
                    Start with AI
                  </Link>
                </div>

                <div className="community-box mt--30">
                  <p className="description mt--10">
                    Want to learn how others are using Bitlance AI tools?
                  </p>
                  <Link className="btn-outline mt--10" href="/community">
                    Join the Bitlance Community
                  </Link>
                  
                </div>

                <div className="inner-shape">
                  <Image
                    src={shapeOne}
                    width={100}
                    height={95}
                    alt="Icon Shape"
                    className="iconshape iconshape-one"
                  />
                  <Image
                    src={shapeTwo}
                    width={60}
                    height={57}
                    alt="Icon Shape"
                    className="iconshape iconshape-two"
                  />
                  <Image
                    src={shapeThree}
                    width={42}
                    height={31}
                    alt="Icon Shape"
                    className="iconshape iconshape-three"
                  />
                  <Image
                    src={shapeFour}
                    width={100}
                    height={95}
                    alt="Icon Shape"
                    className="iconshape iconshape-four"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-shape">
          <Image
            className="bg-shape-one"
            width={640}
            height={949}
            src={bgShapeOne}
            alt="Bg Shape"
          />
          <Image
            className="bg-shape-two"
            src={bgShapeTwo}
            width={626}
            height={1004}
            alt="Bg Shape"
          />
        </div>
      </div>

      <div className="rainbow-brand-area rainbow-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="section-title rating-title text-center sal-animate"
                data-sal="slide-up"
                data-sal-duration="700"
                data-sal-delay="100"
              >
                <p className="b1 mb--0 small-title">
                  Trusted by 800,000+ teams and businesses worldwide
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 mt--10">
              <BrandList />
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Community Review Section (Testimonial + BrandTwo + Stars) */}
      <div className="rainbow-testimonial-area rainbow-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="section-title text-left"
                data-sal="slide-up"
                data-sal-duration="400"
                data-sal-delay="150"
              >
                <h4 className="subtitle">
                  <span className="theme-gradient">Assisting individuals</span>
                </h4>
                <h2 className="title mb--60">
                  The opinions of the Bitlance community
                </h2>
              </div>
            </div>
          </div>
        </div>
        <Testimonial />
      </div>

      <div className="rainbow-brand-area rainbow-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="section-title rating-title text-center sal-animate"
                data-sal="slide-up"
                data-sal-duration="700"
                data-sal-delay="100"
              >
                <div className="rating">
                  <a href="#rating">
                    <i className="fa-sharp fa-solid fa-star"></i>
                  </a>
                  <a href="#rating">
                    <i className="fa-sharp fa-solid fa-star"></i>
                  </a>
                  <a href="#rating">
                    <i className="fa-sharp fa-solid fa-star"></i>
                  </a>
                  <a href="#rating">
                    <i className="fa-sharp fa-solid fa-star"></i>
                  </a>
                  <a href="#rating">
                    <i className="fa-sharp fa-solid fa-star"></i>
                  </a>
                </div>
                <p className="subtitle mb--0">Based on 20,000+ reviews on</p>
              </div>
            </div>
          </div>
          <BrandTwo />
          <div className="bg-shape-left">
            <Image
              src={bgShapeThree}
              width={688}
              height={1055}
              alt="Bg shape"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;