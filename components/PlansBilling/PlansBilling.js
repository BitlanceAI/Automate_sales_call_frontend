"use client";

import React, { useEffect, useState } from "react";
import UserNav from "../Common/UserNav";
import Pricing from "../Pricing/Pricing";
import Compare from "../Pricing/Compare";
import AccordionItem from "../Accordion/AccordionItem";
import { db1 } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const PlansBilling = () => {
  const [pricingData, setPricingData] = useState([]);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const docRef = doc(db1, "pricing", "plans");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setPricingData(data.pricing || []);
        } else {
          console.log("No pricing data found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching pricing data:", error);
      }
    };

    fetchPricing();
  }, []);

  return (
    <div className="rbt-main-content mb-0">
      <div className="rbt-daynamic-page-content center-width">
        <div className="rbt-dashboard-content">
          <UserNav title="Plans & Billing" />
          <div className="content-page pb--50">
            <div className="aiwave-pricing-area wrapper">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <nav className="aiwave-tab">
                      <div
                        className="tab-btn-grp nav nav-tabs text-center justify-content-center"
                        id="nav-tab"
                        role="tablist"
                      >
                        {pricingData.map((data, index) => (
                          <button
                            className={`nav-link ${data.isSelect ? "active" : ""}`}
                            id={`${data.priceId}-tab`}
                            data-bs-toggle="tab"
                            data-bs-target={`#${data.priceId}`}
                            type="button"
                            role="tab"
                            aria-controls={data.priceId}
                            aria-selected={data.isSelect}
                            key={index}
                          >
                            {data.priceType}{" "}
                            {data.discount ? (
                              <span className="rainbow-badge-card badge-border">
                                -{data.discount}%
                              </span>
                            ) : null}
                          </button>
                        ))}
                      </div>
                    </nav>
                  </div>
                </div>

                <Pricing
                  parentClass="col-lg-6 col-md-6 col-12"
                  start={1}
                  end={3}
                  isHeading={false}
                  isBadge={false}
                />
              </div>
            </div>
          </div>

          <div className="rbt-sm-separator"></div>
          <Compare subTitle="" title="Detailed Compare" postion="left" />

          <div className="row rainbow-section-gap row--20">
            <div className="col-lg-12">
              <AccordionItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansBilling;
