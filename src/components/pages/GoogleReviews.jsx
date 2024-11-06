import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { TabPanel, TabView } from "primereact/tabview";
import NewReviews from "./ReviewsPages/NewReviews";
import PostedReviews from "./ReviewsPages/PostedReviews";
import ArchivedReviews from "./ReviewsPages/ArchivedReviews";

const GoogleReviews = () => {
  const toast = useRef(null);

  return (
    <div className="container">
      <Toast ref={toast} position="top-right" />


{/* <div className="flex justify-content-between align-items-center">
        <span className="heading-page mt-0">Google Reviews</span>
        <Button className="get-latest-button"> Get Latest Review</Button>
      </div> */}


<div className="mt-4">
        <TabView>
          <TabPanel header="New Reviews">
            <NewReviews />
          </TabPanel>
          <TabPanel header="Posted Reviews">
            <PostedReviews />
          </TabPanel>
          <TabPanel header="Archived Reviews">
            <ArchivedReviews />
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default GoogleReviews;
