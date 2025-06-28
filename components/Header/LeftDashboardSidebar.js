"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import avatar from "../../public/images/team/team-01sm.jpg";
import light from "../../public/images/light/switch/sun-01.svg";
import dark from "../../public/images/light/switch/vector.svg";

import SmallNavItem from "../../data/header.json";
import { useAppContext } from "@/context/Context";

const LeftSidebar = () => {
  const pathname = usePathname();
  const { shouldCollapseLeftbar, isLightTheme, toggleTheme, user } = useAppContext();

  const isActive = (href) => pathname.startsWith(href);

  return (
    <>
      <div className={`rbt-left-panel popup-dashboardleft-section ${shouldCollapseLeftbar ? "collapsed" : ""}`}>
        <div className="rbt-default-sidebar">
          <div className="inner">
            <div className="content-item-content">
              <div className="rbt-default-sidebar-wrapper">
                <nav className="mainmenu-nav">
                  <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                    {SmallNavItem?.smallNavItem?.slice(0, 7).map((data, index) => (
                      <li key={index}>
                        <Link
                          className={
                            isActive(data.link)
                              ? "active"
                              : "" || data.isDisable
                              ? "disabled"
                              : ""
                          }
                          href={data.link}
                        >
                          <Image src={data.img} width={35} height={35} alt="AI Generator" />
                          <span>{data.text}</span>
                          {data.badge && (
                            <div className="rainbow-badge-card badge-sm ml--10">{data.badge}</div>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* User Profile Info */}
                  {user && (
                    <div className="user-info text-center mt--20 mb--10">
                      <Image
                        src={user.photoURL || avatar}
                        alt="User"
                        width={48}
                        height={48}
                        className="rounded-circle mb--10"
                      />
                      <div className="b3 fw-bold">{user.displayName}</div>
                      <div className="b4 text-muted">{user.email}</div>
                    </div>
                  )}

                  <div className="rbt-sm-separator"></div>

                  <div className="mainmenu-nav">
                    <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                      <li className="has-submenu">
                        <a
                          className="collapse-btn collapsed"
                          data-bs-toggle="collapse"
                          href="#collapseExampleMenu"
                          role="button"
                          aria-expanded="false"
                          aria-controls="collapseExampleMenu"
                        >
                          <i className="feather-plus-circle"></i>
                          <span>Setting</span>
                        </a>
                        <div className="collapse" id="collapseExampleMenu">
                          <ul className="submenu rbt-default-sidebar-list">
                            {SmallNavItem?.smallNavItem?.slice(7, 14).map((data, index) => (
                              <li key={index}>
                                <Link href={data.link} className={isActive(data.link) ? "active" : ""}>
                                  <i className={`feather-${data.icon}`}></i>
                                  <span>{data.text}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                      <li>
                        <Link href="/help" className={isActive("/help") ? "active" : ""}>
                          <i className="feather-award"></i>
                          <span>Help & FAQ</span>
                        </Link>
                      </li>
                    </ul>

                    <div className="rbt-sm-separator"></div>
                    <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                      <li>
                        <Link href="/release-notes" className={isActive("/release-notes") ? "active" : ""}>
                          <i className="feather-bell"></i>
                          <span>Release notes</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/terms-policy" className={isActive("/terms-policy") ? "active" : ""}>
                          <i className="feather-briefcase"></i>
                          <span>Terms & Policy</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="switcher-btn-gr inner-switcher">
            <button className={`${isLightTheme ? "active" : ""}`} onClick={toggleTheme}>
              <Image src={dark} alt="Dark Theme" />
              <span className="text">Dark</span>
            </button>
            <button className={`${!isLightTheme ? "active" : ""}`} onClick={toggleTheme}>
              <Image src={light} alt="Light Theme" />
              <span className="text">Light</span>
            </button>
          </div>

          {/* Footer */}
          <p className="subscription-copyright copyright-text text-center b3  small-text">
            © 2025
            <Link className="ps-2" href="https://themeforest.net/user/rainbow-themes/portfolio">
              Bitlance Tech Hub
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;