"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/app/lib/firebaseClient";
import { useAppContext } from "@/context/Context";

import logo from "../../public/images/logo/logo.png";
import logoDark from "../../public/images/light/logo/logo-dark.png";
import Nav from "./Nav";
import DarkSwitch from "./dark-switch";
import UserMenu from "./UserMenu"; // ✅ Your reusable component

const Header = ({ headerTransparent, headerSticky }) => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    activeMobileMenu,
    setActiveMobileMenu,
    isLightTheme,
    toggleTheme,
    isLoggedIn,
  } = useAppContext();

  const [isSticky, setIsSticky] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const avatarRef = useRef();

  useEffect(() => {
    // Removed homepage redirect to allow navigation to login/signup
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });

    const handleScroll = () => setIsSticky(window.scrollY > 200);
    const handleClickOutside = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleClickOutside);
      unsubscribe();
    };
  }, [pathname, router]);

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/signin");
  };

  return (
    <>
      <DarkSwitch isLight={isLightTheme} switchTheme={toggleTheme} />
      <header
        className={`rainbow-header header-default z-50 ${
          headerTransparent || ""
        } ${headerSticky || ""} ${isSticky ? "sticky" : ""} ${
          pathname === "/home" ? "header-home-fix" : ""
        }`}
        style={pathname === "/home" ? { height: 90, overflow: "visible" } : {}}
      >
        <div className="container position-relative">
          <div className="row align-items-center row--0">
            {/* Logo */}
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logo">
                <Link href="/home">
                  <Image
                    className="logo-light"
                    src={isLightTheme ? logo : logoDark}
                    width={135}
                    height={35}
                    alt="Bitlance Logo"
                  />
                </Link>
              </div>
            </div>

            {/* Nav */}
            <div className="col-lg-8 d-none d-lg-block">
              <nav className="mainmenu-nav d-none d-lg-flex justify-content-center">
                <Nav />
              </nav>
            </div>

            {/* Right Side */}
            <div className="col-lg-2 col-md-6 col-6 position-static">
              <div
                className="header-right d-flex align-items-center justify-content-end gap-3 relative"
                style={{ overflow: "visible" }}
              >
                {/* 👇 Login/Profile */}
                {isLoggedIn && user ? (
                  <div
                    className="relative cursor-pointer"
                    ref={avatarRef}
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    <Image
                      src={
                        user.photoURL ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.displayName || "User"
                        )}`
                      }
                      alt="User Avatar"
                      width={38}
                      height={38}
                      className="rounded-full border border-gray-300"
                    />
                    {menuOpen && (
                      <div
                        className="absolute top-full right-0 w-[320px] z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl"
                        style={{ pointerEvents: "auto" }}
                      >
                        <UserMenu />
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href="/signin" className="btn-default">
                    Login
                  </Link>
                )}

                {/* Mobile Menu */}
                <div className="mobile-menu-bar d-lg-none">
                  <div className="hamberger">
                    <button
                      className="hamberger-button"
                      onClick={() => setActiveMobileMenu(!activeMobileMenu)}
                    >
                      <i className="fa-sharp fa-regular fa-bars"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
