
"use client";

import React from "react";
import Context from "@/context/Context";
import RegisterForm from "@/RegisterForm";
import HeaderTop from "@/components/Header/HeaderTop/HeaderTop";
import Header from "@/components/Header/Header";
import PopupMobileMenu from "@/components/Header/PopUpMobileMenu";
import Footer from "@/components/Footers/Footer";
import Copyright from "@/components/Footers/Copyright";
import Breadcrumb from "@/components/Common/Breadcrumb";
import BackToTop from "../backToTop";

const LearnAIAgentsPage = () => {
  return (
    <>
      <main className="page-wrapper">
        <Context>
          <HeaderTop />
          <Header
            headerTransparent="header-transparent"
            headerSticky="header-sticky"
            btnClass="rainbow-gradient-btn"
          />
          <PopupMobileMenu />
          <Breadcrumb title="Learn AI Agents" text="Learn AI Agents" />
            <RegisterForm />
          

          <BackToTop />
          <Footer />
          <Copyright />
        </Context>
      </main>
    </>
  );
};
export default LearnAIAgentsPage;
