"use client";

import React, { useEffect, useState } from "react";
import Context from "@/context/Context";

import HeaderTop from "@/components/Header/HeaderTop/HeaderTop";
import Header from "@/components/Header/Header";
import PopupMobileMenu from "@/components/Header/PopUpMobileMenu";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Footer from "@/components/Footers/Footer";
import Copyright from "@/components/Footers/Copyright";
import Image from "next/image";

// Firestore imports
import { db1 } from "../../lib/firebase"; // make sure you have this configured
import { collection, getDocs } from "firebase/firestore";

const CommunityPage = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const querySnapshot = await getDocs(collection(db1, "communityMembers"));
        const membersData = querySnapshot.docs.map((doc) => ({
          id: doc.id, // 
          ...doc.data(),
        }));
        setMembers(membersData);
      } catch (error) {
        console.error("Error fetching community members:", error);
      }
    }
    fetchMembers();
  }, []);

  return (
    <main className="page-wrapper">
      <Context>
        {/* HEADER */}
        <HeaderTop />
        <Header
          headerTransparent="header-transparent"
          headerSticky="header-sticky"
          btnClass="rainbow-gradient-btn"
        />
        <PopupMobileMenu />

        {/* BREADCRUMB */}
        <Breadcrumb title="Community" text="Community" />

        {/* COMMUNITY SECTION */}
        <div className="slider-bg-image bg-banner1 slider-bg-shape">
          <div className="container">
            <div className="row mb--40">
              <div className="col-lg-12 text-center">
                <h2 className="title">Join the Bitlance Community</h2>
                <p className="description">
                  Meet our amazing members from LinkedIn and beyond.
                </p>
              </div>
            </div>

            <div className="row g-5">
              {members.map((member) => (
  <div className="col-lg-4 col-md-6 col-12" key={member.id}>
    <a 
      href={member.linkedinUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
  <div
    className="rbt-card team-card variation-02 rbt-hover"
    style={{
      backgroundColor: "#000000",
      padding: "20px",
      borderRadius: "15px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      transition: "box-shadow 0.3s ease",
    }}
    onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)"}
    onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)"}
  >
    <div className="inner">
      <div className="thumbnail">
        <Image
          src={member.image}
          alt={member.name}
          width={300}
          height={300}
          className="w-100 radius"
        />
      </div>
      <div className="content">
        <h4 className="title">{member.name}</h4>
        <p className="designation">{member.bio}</p>
      </div>
    </div>
   
  </div>
   </a>
</div>

))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <Footer />
        <Copyright />
      </Context>
    </main>
  );
};

export default CommunityPage;
