"use client";

import React, { useEffect, useState } from "react";
import { db1 } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const Pricing = ({ start, end, parentClass, isBadge, gap }) => {
  const [pricingData, setPricingData] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [sectionStates, setSectionStates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPricing = async () => {
      setLoading(true);
      try {
        const docRef = doc(db1, "pricing", "plans");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("✅ Firestore data fetched:", data);

          if (data.pricing && Array.isArray(data.pricing)) {
            setPricingData(data.pricing);

            // Default active tab
            const defaultTab = data.pricing.find(p => p.isSelect) || data.pricing[0];
            setActiveTab(defaultTab.priceId);

            // Initialize toggle states
            const initialStates = {};
            data.pricing.forEach(plan => {
              plan.priceBody.forEach(item => {
                initialStates[item.subTitle] = true;
              });
            });
            setSectionStates(initialStates);
          } else {
            console.warn("⚠️ No 'pricing' array found in Firestore document.");
          }
        } else {
          console.warn("⚠️ No pricing document found in Firestore.");
        }
      } catch (error) {
        console.error("❌ Error fetching pricing:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPricing();
  }, []);

  const toggleSection = (subTitle) => {
    setSectionStates(prevState => ({
      ...prevState,
      [subTitle]: !prevState[subTitle],
    }));
  };

  if (loading) {
    return <p className="text-center">Loading pricing...</p>;
  }

  return (
    <div className="tab-content p-0 bg-transparent border-0 border bg-light">
      {pricingData.map((data, index) => (
        <div
          key={index}
          className={`tab-pane fade ${activeTab === data.priceId ? "active show" : ""}`}
          id={data.priceId}
          role="tabpanel"
        >
          <div className={`row row--15 ${gap}`}>
            {data.priceBody.slice(start, end).map((innerData, innerIndex) => (
              <div className={parentClass} key={innerIndex}>
                <div className={`rainbow-pricing style-aiwave ${innerData.isSelect ? "active" : ""}`}>
                  <div className="pricing-table-inner">
                    <div className="pricing-top">
                      <div className="pricing-header">
                        <div className="icon">
                          <i className={innerData.iconClass}></i>
                        </div>
                        <h4 className={`title color-var-${innerData.classNum}`}>
                          {innerData.subTitle}
                        </h4>
                        <p className="subtitle">{innerData.title}</p>
                        <div className="pricing">
                          <span className="price-text">{innerData.price}</span>
                          <span className="text">{innerData.priceFor}</span>
                        </div>
                      </div>
                      <div className="pricing-body">
                        <div
                          className={`features-section has-show-more ${
                            !sectionStates[innerData.subTitle] ? "active" : ""
                          }`}
                        >
                          <h6>{innerData.text}</h6>
                          <ul className="list-style--1 has-show-more-inner-content">
                            {innerData.listItem.map((list, i) => (
                              <li key={i}>
                                <i className="fa-regular fa-circle-check"></i>
                                {list.text}
                              </li>
                            ))}
                          </ul>
                          {innerData.isShow && (
                            <div
                              className={`rbt-show-more-btn ${
                                !sectionStates[innerData.subTitle] ? "active" : ""
                              }`}
                              onClick={() => toggleSection(innerData.subTitle)}
                            >
                              {sectionStates[innerData.subTitle] ? "Show More" : "Show Less"}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="pricing-footer">
                      <a
                        className={`btn-default ${innerData.isSelect ? "color-blacked" : "btn-border"}`}
                        href="#"
                      >
                        Get Started
                      </a>
                      <p className="bottom-text">{innerData.limited}</p>
                    </div>
                  </div>
                  {innerData.isSelect && isBadge && (
                    <div className="feature-badge">Best Offer</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Pricing;
