
"use client";

import React from "react";
import Context from "@/context/Context";
import B2BRegisterForm from "@/B2BRegisterForm"; 
import HeaderTop from "@/components/Header/HeaderTop/HeaderTop";
import Header from "@/components/Header/Header";
import PopupMobileMenu from "@/components/Header/PopUpMobileMenu";
import Footer from "@/components/Footers/Footer";
import Copyright from "@/components/Footers/Copyright";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Roadmap from "@/components/Roadmap/Roadmap";
import BackToTop from "../backToTop";

const BookCallPage = () => {
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
          <Breadcrumb title="Book Call" text="Book Call" />
            <B2BRegisterForm />
          

          <BackToTop />
          <Footer />
          <Copyright />
        </Context>
      </main>
    </>
  );
};
export default BookCallPage;
