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
                      <strong>Purchases and Payments:</strong>
                      <ul>
                        <li>All purchases of AI tools or subscriptions are subject to applicable fees as displayed at the time of purchase.</li>
                        <li>Payments are processed via third-party providers (e.g., Stripe, Razorpay).</li>
                        <li>You agree to provide accurate billing information and authorize us to charge applicable fees.</li>
                        <li>All fees are non-refundable unless otherwise stated in a specific refund policy.</li>
                      </ul>
                    </li>

                    <li>
                      <strong>License and Usage Rights:</strong>
                      <ul>
                        <li>You are granted a limited, non-exclusive, non-transferable license to use the AI tools solely for your internal or commercial use.</li>
                        <li>You agree not to resell, sublicense, or redistribute the tools.</li>
                        <li>You agree not to reverse-engineer, copy, or modify the tools without our permission.</li>
                        <li>You agree not to use the tools for unlawful purposes (e.g., fraud, discrimination, deepfake generation, etc.).</li>
                      </ul>
                    </li>

                    <li>
                      <strong>Account and Access:</strong> You are responsible for maintaining the confidentiality of your credentials and all activities under your account. We reserve the right to suspend or terminate access if you violate these Terms.
                    </li>

                    <li>
                      <strong>Intellectual Property:</strong> All content, software, models, and documentation provided through our Services are the intellectual property of Bitlance Tech Hub or our licensors. No ownership rights are transferred to you under these Terms.
                    </li>

                    <li>
                      <strong>Service Availability and Updates:</strong> We strive to maintain reliable access to our AI tools but do not guarantee uninterrupted availability. We may perform updates, modify features, or discontinue services with or without prior notice.
                    </li>

                    <li>
                      <strong>Data Usage and Privacy:</strong> By using our tools, you may provide input data and receive output data. We handle all user data in accordance with our <Link href="/privacy-policy">Privacy Policy</Link>. You retain ownership of your input data; we may use anonymized outputs to improve our models unless you opt out where applicable.
                    </li>

                    <li>
                      <strong>Refunds and Cancellations:</strong> Refunds are only issued in accordance with our Refund Policy. For subscription-based products, you may cancel any time, but access continues until the end of the billing cycle.
                    </li>

                    <li>
                      <strong>Limitation of Liability:</strong> To the maximum extent permitted by law:
                      <ul>
                        <li>We shall not be liable for any indirect, incidental, consequential, or punitive damages.</li>
                        <li>Our total liability under these Terms shall not exceed the total amount paid by you in the last 3 months.</li>
                        <li>Use of the AI tools is at your own risk, especially in sensitive decision-making contexts.</li>
                      </ul>
                    </li>

                    <li>
                      <strong>Indemnification:</strong> You agree to indemnify, defend, and hold harmless Bitlance Tech Hub, its affiliates, and employees from any claims or liabilities arising out of your misuse of the Services or violation of these Terms.
                    </li>

                    <li>
                      <strong>Governing Law and Dispute Resolution:</strong> These Terms are governed by the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Pune, Maharashtra.
                    </li>

                    <li>
                      <strong>Changes to These Terms:</strong> We may revise these Terms at any time. Material changes will be notified via email or posted on our site. Continued use of the Services after changes constitutes acceptance.
                    </li>

                    <li>
                      <strong>Contact Us:</strong>
                      <ul style={{ marginTop: "10px" }}>
                        <li>📧 Email: <a href="mailto:ceo@bitlancetechhub.com">ceo@bitlancetechhub.com</a></li>
                        <li>📍 Address: Blue Ridge Town Pune, Phase 1, Hinjawadi Rajiv Gandhi Infotech Park, Hinjawadi, Pune, Pimpri-Chinchwad, Maharashtra 411057</li>
                        <li>📞 Phone: 7391025059</li>
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