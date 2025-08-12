"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ref, push, set, get, query, orderByChild, equalTo} from "firebase/database";

import FooterData from "../../data/footer.json";
import logo from "../../public/images/logo/logo.png";
import FooterProps from "./FooterProps";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");const handleSubscribe = async (e) => {
  e.preventDefault();

  const res = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  setMessage(data.message);

  if (res.ok) {
    setEmail("");
    setTimeout(() => setMessage(""), 3000);
  }
};

  return (
    <footer className="rainbow-footer footer-style-default footer-style-3 position-relative">
      <div className="footer-top">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="rainbow-footer-widget">
                <div className="logo" style={{ textAlign: "left" }}>
                  <Link href="/">
                    <Image
                      className="logo-light"
                      src={logo}
                      width={100}
                      height={100}
                      alt="ChatBot Logo"
                      style={{
                        height: "1000px",
                        width: "200px",
                        maxWidth: "100%",
                      }}
                    />
                  </Link>
                </div>
                <p className="b1 desc-text" style={{ textAlign: "left" }}>
                  High quality software solutions
                </p>
                <h6 className="subtitle">Join a Newsletter</h6>
                <form className="newsletter-form" onSubmit={handleSubscribe}>
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="Enter Your Email Here"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button
                      className="btn-default bg-solid-primary"
                      type="submit"
                    >
                      <i className="fa-sharp fa-regular fa-arrow-right"></i>
                    </button>
                  </div>
                </form>
                {message && (
                  <p style={{ marginTop: "10px", color: "#fff" }}>{message}</p>
                )}
              </div>
            </div>

            {/* Footer Links */}
            <div className="col-lg-2 col-md-6 col-sm-6 col-12">
              {FooterData?.footer?.map((data, index) => (
                <div className="rainbow-footer-widget" key={index}>
                  <FooterProps list={data.links} />
                </div>
              ))}
            </div>

            {/* Footer Services */}
            <div className="col-lg-2 col-md-6 col-sm-6 col-12">
              {FooterData?.footer?.map((data, index) => (
                <div className="rainbow-footer-widget" key={index}>
                  <FooterProps list={data.services} />
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              {FooterData?.footer?.map((data, index) => (
                <div className="rainbow-footer-widget" key={index}>
                  <div className="widget-menu-top">
                    <h4 className="title">Contact</h4>
                    {data.contact.map((inner, i) => (
                      <div className="inner" key={i}>
                        <ul className="footer-link contact-link">
                          <li>
                            <i className="contact-icon fa-regular fa-location-dot"></i>
                            <Link href="#">{inner.location}</Link>
                          </li>
                          <li>
                            <i className="contact-icon fa-sharp fa-regular fa-envelope"></i>
                            <Link href="#">{inner.mail}</Link>
                          </li>
                          <li>
                            <i className="contact-icon fa-regular fa-phone"></i>
                            <Link href="#">+{inner.number}</Link>
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
