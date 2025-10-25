"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { auth, googleProvider, facebookProvider } from "@/app/lib/firebaseClient";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import logo from "../../public/images/logo/logo.png";
import logoDark from "../../public/images/light/logo/logo-dark.png";
import userImg from "../../public/images/team/team-02sm.jpg";
import google from "../../public/images/sign-up/google.png";
import facebook from "../../public/images/sign-up/facebook.png";
import DarkSwitch from "../Header/dark-switch";
import { useAppContext } from "@/context/Context";

const SignUp = () => {
  const router = useRouter();
  const { isLightTheme, toggleTheme } = useAppContext();

  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", industry: "" });
  const [error, setError] = useState("");
const redirectAfterLogin = () => {
    router.push("/tools");
  };
  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Google sign up
const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      localStorage.setItem("isLoggedIn", "true");
      redirectAfterLogin();
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed. Please try again.");
    }
  };

  const handleFacebookSignIn = async () => {
  try {
    await signInWithPopup(auth, facebookProvider);
    localStorage.setItem("isLoggedIn", "true");
    redirectAfterLogin();
  } catch (err) {
    console.error("Facebook sign-in error:", err);

    if (err.code === "auth/account-exists-with-different-credential") {
      const email = err.customData?.email;
      const pendingCred = FacebookAuthProvider.credentialFromError(err);

      if (email) {
        const methods = await fetchSignInMethodsForEmail(auth, email);

        if (methods.includes("google.com")) {
          setError(
            "This email is already registered with Google. Please sign in with Google first, then we'll link your Facebook account."
          );

          try {
            // Sign in with Google
            const googleResult = await signInWithPopup(auth, googleProvider);

            // Link the pending Facebook credential
            await linkWithCredential(googleResult.user, pendingCred);

            localStorage.setItem("isLoggedIn", "true");
            redirectAfterLogin();
            return;
          } catch (linkErr) {
            console.error("Error linking Facebook to Google:", linkErr);
            setError(
              "Failed to link Facebook with Google account. Please try again."
            );
          }
        } else {
          setError(
            `This email is already registered using: ${methods.join(
              ", "
            )}. Please use that method.`
          );
        }
      }
    } else {
      setError("Facebook sign-in failed. Please try again.");
    }
  }
};

  // Email/Password sign up
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.industry) {
      setError("Please select your industry.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      await fetch("https://biltance.app.n8n.cloud/webhook/bitlancesignup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          industry: form.industry,
        }),
      });
      router.push("/tools");
    } catch (err) {
      setError("Sign-up failed. Email may already be in use.");
    }
  };

  return (
    <>
      <DarkSwitch isLight={isLightTheme} switchTheme={toggleTheme} />
      <main className="page-wrapper">
        <div className="signup-area">
          <div className="wrapper">
            <div className="row">
              {/* Left form area */}
              <div className="col-lg-6 bg-color-blackest left-wrapper">
                <div className="sign-up-box">
                  <div className="signup-box-top">
                    <Link href="/">
                      <Image
                        src={isLightTheme ? logo : logoDark}
                        width={193}
                        height={50}
                        alt="Bitlance Logo"
                      />
                    </Link>
                  </div>

                  <div className="signup-box-bottom">
                    <div className="signup-box-content">
                      {error && (
                        <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
                      )}

                      <div className="social-btn-grp">
                        <button
                          className="btn-default btn-border"
                          onClick={handleGoogleSignIn}
                          aria-label="Sign up with Google"
                        >
                          <span className="icon-left">
                            <Image src={google} width={18} height={18} alt="Google Icon" />
                          </span>
                          Sign up with Google
                        </button>
                        <button
                          className="btn-default btn-border"
                          onClick={handleFacebookSignIn}
                          aria-label="Sign up with Facebook"
                        >
                          <span className="icon-left">
                            <Image src={facebook} width={18} height={18} alt="Facebook Icon" />
                          </span>
                          Sign up with Facebook
                        </button>
                      </div>

                      <div className="text-social-area">
                        <hr />
                        <span>Or continue with</span>
                        <hr />
                      </div>

                      <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="input-section mail-section">
                          <div className="icon">
                            <i className="fa-sharp fa-regular fa-envelope" aria-hidden="true"></i>
                          </div>
                          <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            value={form.email}
                            onChange={handleInput}
                            required
                            autoComplete="email"
                          />
                        </div>
                        {/* Name */}
                        <div className="input-section">
                          <div className="icon">
                            <i className="fa-sharp fa-regular fa-user" aria-hidden="true"></i>
                          </div>
                          <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={form.name}
                            onChange={handleInput}
                            required
                            autoComplete="name"
                          />
                        </div>

                        {/* Phone */}
                        <div className="input-section">
                          <div className="icon">
                            <i className="fa-sharp fa-solid fa-phone" aria-hidden="true"></i>
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={form.phone}
                            onChange={handleInput}
                            required
                            autoComplete="tel"
                          />
                        </div>

                        {/* Password */}
                        <div className="input-section password-section">
                          <div className="icon">
                            <i className="fa-sharp fa-regular fa-lock" aria-hidden="true"></i>
                          </div>
                          <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleInput}
                            required
                            autoComplete="new-password"
                          />
                        </div>

                        {/* Industry */}
                        <div className="input-section">
                          <div className="icon">
                            <i className="fa-sharp fa-solid fa-briefcase" aria-hidden="true"></i>
                          </div>
                          <select
                            name="industry"
                            value={form.industry}
                            onChange={handleInput}
                            required
                            style={{
                              width: "100%",
                              padding: "10px",
                              border: "none",
                              outline: "none",
                              background: "transparent",
                              color: "inherit",
                              fontSize: "1rem",
                              appearance: "none",
                            }}
                          >
                            <option value="" disabled>
                              Select Industry
                            </option>
                            <option value="real-estate">Real Estate</option>
                            <option value="ecommerce">E-commerce</option>
                            <option value="education">Education</option>
                            <option value="saas">SaaS</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="finance">Finance</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <button type="submit" className="btn-default" aria-label="Sign up">
                          Sign Up
                        </button>
                      </form>
                    </div>

                    <div className="signup-box-footer">
                      <div className="bottom-text">
                        Already have an account?
                        <Link className="btn-read-more ml--5" href="/signin">
                          <span>Sign In</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side testimonial */}
              <div className="col-lg-6 right-wrapper">
                <div className="client-feedback-area">
                  <div className="single-feedback">
                    <div className="inner">
                      <div className="meta-img-section">
                        <div className="image">
                          <Image src={userImg} width={93} height={93} alt="User testimonial" />
                        </div>
                      </div>
                      <div className="rating">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="fa-sharp fa-solid fa-star" aria-hidden="true"></i>
                        ))}
                      </div>
                      <div className="content">
                        <p className="description">
                          Bitlance tools helped streamline our workflow and improved cross-team collaboration.
                        </p>
                        <div className="bottom-content">
                          <div className="meta-info-section"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link className="close-button" href="/" aria-label="Close Sign Up">
            <i className="fa-sharp fa-regular fa-x"></i>
          </Link>
        </div>
      </main>
    </>
  );
};

export default SignUp;
