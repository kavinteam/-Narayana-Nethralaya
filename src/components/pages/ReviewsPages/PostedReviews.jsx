import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useRef, useState } from 'react'
import api from '../../api/api';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';

const PostedReviews = () => {
  const toast = useRef(null);

const [loading, setLoading] = useState(false);

  const [newReview, setNewReview] = useState([]);
  const UserID = sessionStorage.getItem("UserID");
  const Password = sessionStorage.getItem("Password");

  const newReviews = async () => {
    try {
      setLoading(true);
      const requestData = {
        userid: UserID,
        password: Password,
        reuest_type: "3",
        synceddatetime: "2023-01-24 11:57:34",
        FormCode: "202",
        ApiKey: "kavin",
        AppTypeNo: "3",
        AppVersion: "1.0.0",
        DbVersion: "10.4.1",
        DbSource: "W",
      };

      const result = await api.get_New_Reviews(requestData);
      setNewReview(result.responsemessage);
      const rolesWithSlno = result.responsemessage.map((role, index) => ({
        ...role,
        slno: index + 1,
      }));
      setNewReview(rolesWithSlno);
    } catch (error) {
      console.error("Error fetching posted reviews:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    newReviews();
  }, []);


  const [expandedReview, setExpandedReview] = useState(null);

  const toggleExpand = (rowData) => {
    setExpandedReview((prev) =>
      prev === rowData.fld_review_text ? null : rowData.fld_review_text
    );
  };

const reviewBodyTemplate = (rowData) => {
const reviewText = rowData.fld_review_text || "";
const isExpanded = expandedReview === reviewText;

if (!reviewText) {
  return null;
}
if (reviewText.length <= 70) {
  return <div>{reviewText}</div>; // Display full text if 50 characters or fewer
}

return (
  <div>
    <div
      className={`review-text ${isExpanded ? "expanded" : "truncated"}`}
      onClick={() => toggleExpand(rowData)}
    >
      {isExpanded ? reviewText : `${reviewText.slice(0, 100)}...`}
    </div>
    <div className="expand-text" onClick={() => toggleExpand(rowData)}>
      {isExpanded ? "(Read less)" : "... (Read more)"}
    </div>
  </div>
);
};

  const shortenLink = (link) => {
    const maxLength = 0;
    if (link.length > maxLength) {
      return link.substring(0, maxLength) + "link";
    }
    return link;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };



return (
      <div className="table-container">
    <Toast ref={toast} position="top-right" />
    {loading && (
      <div className="pro-spin">
        <ProgressSpinner
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    )}

      <DataTable
        scrollable
        value={newReview}
        paginator
        rows={10}
        rowsPerPageOptions={[ 10, 25, 50]}
      >
        <Column field="slno" header="Sl.No" />
        <Column field="fld_author_name" header="Reviewer Name" style={{ width: "12%" }} />
        <Column field="fld_review_date" header="Date" style={{ width: "10%" }}
                body={(rowData) => formatDate(rowData.fld_review_date)} />
        <Column field="fld_review_text" header="Review" body={reviewBodyTemplate} />
        <Column field="fld_rating" header="Star Rating" />
        <Column field="fld_place_name" header="Location" />
        <Column field="fld_review_link" header="Link"
                body={(rowData) => (
                  <a href={rowData.fld_review_link}
                    target="_blank"
                    rel="noopener noreferrer" >
                    {shortenLink(rowData.fld_review_link)}
                  </a>
                )}/>
      </DataTable>
    </div>
)
}

export default PostedReviews