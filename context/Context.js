// context.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
//import app from "@/lib/firebase"; // adjust if path differs
import app from "@/app/lib/firebase";

export const CreateContext = createContext();
export const useAppContext = () => useContext(CreateContext);

const Context = ({ children }) => {
  const [mobile, setMobile] = useState(true);
  const [rightBar, setRightBar] = useState(true);
  const [toggleTop, setToggle] = useState(true);
  const [toggleAuth, setToggleAuth] = useState(true);
  const [showItem, setShowItem] = useState(true);
  const [activeMobileMenu, setActiveMobileMenu] = useState(true);
  const [isLightTheme, setLightTheme] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // NEW

  const checkScreenSize = () => {
    if (window.innerWidth < 1600) {
      setMobile(false);
      setRightBar(false);
    } else {
      setMobile(true);
      setRightBar(true);
    }
  };

  // Theme setup
  useEffect(() => {
    const themeType = localStorage.getItem("aiwave-theme");
    if (themeType === "dark") {
      setLightTheme(false);
      document.body.classList.add("active-dark-mode");
    }
  }, []);

  useEffect(() => {
    if (isLightTheme) {
      document.body.classList.remove("active-dark-mode");
      localStorage.setItem("aiwave-theme", "light");
    } else {
      document.body.classList.add("active-dark-mode");
      localStorage.setItem("aiwave-theme", "dark");
    }
  }, [isLightTheme]);

  // Firebase Auth: Track logged in user
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoggedIn(!!firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const shouldCollapseLeftbar = !mobile;
  const shouldCollapseRightbar = !rightBar;
  const toggleTheme = () => {
  setLightTheme(prevTheme => !prevTheme);
};
  return (
    <CreateContext.Provider
      value={{
        mobile,
        setMobile,
        showItem,
        setShowItem,
        activeMobileMenu,
        setActiveMobileMenu,
        toggleTop,
        setToggle,
        toggleAuth,
        setToggleAuth,
        rightBar,
        setRightBar,
        shouldCollapseLeftbar,
        shouldCollapseRightbar,
        isLightTheme,
        setLightTheme,
        toggleTheme,
        isLoggedIn,
        setIsLoggedIn,
        user,           // 👈 ADDED
        setUser         // 👈 ADDED
      }}
    >
      {children}
    </CreateContext.Provider>
  );
};

export default Context;
