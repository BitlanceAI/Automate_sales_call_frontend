import Link from "next/link";
import React from "react";

const TermsPolicy = () => {
  return (
    <>
      <div className="rbt-main-content mb--0">
        <div className="rbt-daynamic-page-content center-width">
          <div className="rbt-dashboard-content rainbow-section-gap">
            <div className="banner-area">
              <div className="settings-area">
                <h3 className="title">Terms and Conditions</h3>
              </div>
            </div>
            <div className="content-page">
              <div className="chat-box-list">
                <div className="content">
                  <h4>Terms and Conditions for AI Tools Purchasing</h4>
                  <p>
                    Welcome to Bitlance Tech Hub (“Company,” “we,” “us,” or “our”). These Terms and Conditions (“Terms”) govern your access to and use of our AI tools, services, websites, and software (collectively, “Services”). By purchasing or using any of our Services, you agree to be bound by these Terms.
                  </p>

                  <ol className="rbt-terms-content">
                    <li>
                      <strong>Eligibility:</strong> By using our Services, you represent that you are at least 18 years old and have the legal capacity to enter into a binding contract. If you are using the Services on behalf of an organization, you represent that you have authority to bind that organization.
                    </li>
                    <li>
                      <strong>Purchases and Payments:</strong> All purchases are subject to applicable fees. Payments are processed securely through third-party providers (e.g., Stripe, Razorpay). All fees are non-refundable unless specified otherwise.
                    </li>
                    <li>
                      <strong>License and Usage Rights:</strong> You are granted a limited, non-transferable license. You agree not to resell, reverse-engineer, or use the tools unlawfully.
                    </li>
                    <li>
                      <strong>Account and Access:</strong> You are responsible for your account credentials. We may suspend access if these Terms are violated.
                    </li>
                    <li>
                      <strong>Intellectual Property:</strong> All tools, models, and content are owned by Bitlance Tech Hub or licensors. No ownership is transferred to you.
                    </li>
                    <li>
                      <strong>Service Availability and Updates:</strong> We may update or modify features and do not guarantee 24/7 availability.
                    </li>
                    <li>
                      <strong>Data Usage and Privacy:</strong> Data is handled as per our <Link href="/privacy-policy">Privacy Policy</Link>. Input remains yours; anonymized outputs may be used for model improvements.
                    </li>
                    <li>
                      <strong>Refunds and Cancellations:</strong> Refunds are subject to our Refund Policy. Subscription access remains active until the end of the billing cycle upon cancellation.
                    </li>
                    <li>
                      <strong>Limitation of Liability:</strong> Bitlance is not liable for indirect or consequential damages. Liability is capped at the amount paid in the last 3 months.
                    </li>
                    <li>
                      <strong>Indemnification:</strong> You agree to indemnify and hold Bitlance harmless from misuse of Services or violation of Terms.
                    </li>
                    <li>
                      <strong>Governing Law and Dispute Resolution:</strong> These Terms are governed by the laws of India. Disputes are subject to courts in Pune, Maharashtra.
                    </li>
                    <li>
                      <strong>Changes to These Terms:</strong> We may update Terms from time to time. Major changes will be notified via email or posted on our website.
                    </li>
                    <li>
                      <strong>Contact Us:</strong>
                      <ul style={{ marginTop: "10px" }}>
                        <li>
                          📧 Email: <a href="mailto:ceo@bitlancetechhub.com">ceo@bitlancetechhub.com</a>
                        </li>
                        <li>
                          📍 Address: Blue Ridge Town Pune, Phase 1, Hinjawadi Rajiv Gandhi Infotech Park, Hinjawadi, Pune, Pimpri-Chinchwad, Maharashtra 411057
                        </li>
                        <li>
                          📞 Phone: 7391025059
                        </li>
                      </ul>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsPolicy;