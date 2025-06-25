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

import BrandList from "../Brands/BrandList";
import { useAppContext } from "@/context/Context";

const Home = () => {
  const { isLightTheme } = useAppContext();
  const [visibleIndex, setVisibleIndex] = useState(0);

  const tools = ["With SEO", "With SMM", "With Sales", "Chatbot"];

  useEffect(() => {
    Sal();
    const intervalId = setInterval(() => {
      setVisibleIndex((prevIndex) => (prevIndex + 1) % tools.length);
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
                      <span className="cd-words-wrapper">
                        {tools.map((tool, index) => (
                          <b
                            key={tool}
                            className={`theme-gradient ${
                              visibleIndex === index ? "is-visible" : "is-hidden"
                            }`}
                            style={{ marginRight: "0.25rem" }}
                          >
                            {tool}
                          </b>
                        ))}
                      </span>
                    </span>
                  </span>{" "}
                  Automation by Bitlance
                </h1>
                <p className="description">
                  Bitlance helps you streamline marketing, boost sales, improve
                  engagement, and enhance SEO performance — all with AI automation.
                </p>
                <div className="form-group">
                  <textarea
                    name="text"
                    id="slider-text-area"
                    cols="30"
                    rows="2"
                    placeholder="Try a prompt, for example: Generate SEO keywords for a real estate listing"
                  ></textarea>
                  <Link className="btn-default" href="/text-generator">
                    Start with AI
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
    </>
  );
};

export default Home;