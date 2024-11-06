import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useRef, useState } from "react";
import api from "../../api/api";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";

const NewReviews = () => {
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
        reuest_type: "1",
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
      console.error("Error fetching new reviews:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    newReviews();
  }, []);

  const [doctors, setDoctors] = useState([]);

  const getDoctors = async () => {
    try {
      setLoading(true);
      const requestData = {
        userid: UserID,
        password: Password,
        synceddatetime: "2023-01-24 11:57:34",
        FormCode: "202",
        ApiKey: "kavin",
        AppTypeNo: "3",
        AppVersion: "1.0.0",
        DbVersion: "10.4.1",
        DbSource: "W",
      };

      const result = await api.get_Doctors(requestData);
      const statesData = result.responsemessage.map((state) => ({
        label: state.fld_doc_name,
        value: state.fld_doc_name,
        doc_code: state.fld_doc_id,
        doc_swid: state.fld_doc_sw_id,
      }));
      setDoctors(statesData);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getDoctors();
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

    if (reviewText.length <= 100) {
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
  const formatSyncDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleCheckboxChange = (e, rowIndex, type) => {
    const updatedData = [...newReview];
    updatedData[rowIndex][type] = e.checked;

    if (type === "doctorReview" && !e.checked) {
      updatedData[rowIndex].selectedDoctor = null;
      updatedData[rowIndex].selectedDoctorId = null;
      updatedData[rowIndex].selectedDoctorSwId = "";
      updatedData[rowIndex].selectedDoctorDocId = "";
    }
    setNewReview(updatedData);
  };

  const checkboxTemplate = (rowData, { rowIndex }) => (
    <div className="checkbox-container">
      <div className="checkbox-item">
        <Checkbox
          inputId={`doctorReview-${rowIndex}`}
          className="p-mr-2"
          checked={rowData.doctorReview || false}
          onChange={(e) => handleCheckboxChange(e, rowIndex, "doctorReview")}
        />
        <label htmlFor={`doctorReview-${rowIndex}`}>Doctor Review</label>
      </div>
      <div className="checkbox-item">
        <Checkbox
          inputId={`locationReview-${rowIndex}`}
          className="p-mr-2"
          checked={rowData.locationReview || false}
          onChange={(e) => handleCheckboxChange(e, rowIndex, "locationReview")}
        />
        <label htmlFor={`locationReview-${rowIndex}`}>Location Review</label>
      </div>
    </div>
  );

  const handleDropdownChange = (e, rowIndex) => {
    const updatedData = [...newReview];
    updatedData[rowIndex].selectedDoctor = e.value;
    updatedData[rowIndex].selectedDoctorId = e.value;
    updatedData[rowIndex].selectedDoctorSwId =
      doctors.find((doc) => doc.value === e.value)?.doc_swid || "";
    updatedData[rowIndex].selectedDoctorDocId =
      doctors.find((doc) => doc.value === e.value)?.doc_code || "";
    setNewReview(updatedData);
  };

  const selectDoctorTemplate = (rowData, { rowIndex }) => (
    <Dropdown
      filter
      value={rowData.selectedDoctor}
      options={doctors}
      onChange={(e) => handleDropdownChange(e, rowIndex)}
      optionLabel="label"
      placeholder="Search"
      className="datatableDropdown"
      disabled={!rowData.doctorReview}
    />
  );

  const postReview = async (rowData) => {
    try {
      setLoading(true);

      if (!rowData.doctorReview && !rowData.locationReview) {
        toast.current.show({
          severity: "warn",
          summary: "Warning",
          detail: "Please select at least one review type before posting",
        });
        return;
      }
      if (rowData.doctorReview && !rowData.selectedDoctor) {
        toast.current.show({
          severity: "warn",
          summary: "Warning",
          detail: "Please select a doctor when Doctor Review is checked",
        });
        return;
      }

      let fld_posted_as_id = "";
      let fld_posted_as_name = "";
      if (rowData.doctorReview && rowData.locationReview) {
        fld_posted_as_id = "3";
        fld_posted_as_name = "Doctor and Place";
      } else if (rowData.locationReview) {
        fld_posted_as_id = "1";
        fld_posted_as_name = "Place";
      } else if (rowData.doctorReview) {
        fld_posted_as_id = "2";
        fld_posted_as_name = "Doctor";
      }

      const payload = {
        trn_tbl_posted_review: [
          {
            fld_rf_id: rowData.fld_rf_id || "",
            fld_review_sw_id: rowData.fld_review_sw_id || "",
            fld_review_id: rowData.fld_review_id || "",
            fld_review_status_id: "",
            fld_review_status_name: "",
            fld_author_name: rowData.fld_author_name || "",
            fld_review_date: rowData.fld_review_date || "",
            fld_place_id: rowData.fld_place_id || "",
            fld_place_name: rowData.fld_place_name || "",
            fld_rating: rowData.fld_rating || "",
            fld_review_text: rowData.fld_review_text || "",
            fld_review_link: rowData.fld_review_link || "",
            fld_posted_as_id: fld_posted_as_id || "",
            fld_posted_as_name: fld_posted_as_name || "",
            fld_doc_sw_id: rowData.selectedDoctorSwId || "",
            fld_doc_id: rowData.selectedDoctorDocId || "",
            fld_doc_name: rowData.selectedDoctor || "",
          },
        ],
        ApiKey: "kavin",
        AppTypeNo: "3",
        AppVersion: "1.0.0",
        FormCode: "227",
        synceddatetime: formatSyncDate(new Date()),
      };

      const response = await api.review_Insertion(payload);
      if (response.status === "1") {
        newReviews();
        toast.current.show({
          severity: "success",
          summary: "Review posted successfully !",
          detail:
            response.responsemessage || "You have successfully posted Review ",
        });
      } else {
        throw new Error(
          response
            ? response.responsemessage || "An error occurred while posting."
            : "No response from the server."
        );
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Review archived Failed",
        detail:
          error.message || "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const archiveReview = async (rowData) => {
    try {
      setLoading(true);

      const payload = {
        trn_tbl_new_review: [
          {
            fld_rf_id: rowData.fld_rf_id || "",
            fld_review_sw_id: rowData.fld_review_sw_id || "",
            fld_review_id: rowData.fld_review_id || "",
            fld_review_date: rowData.fld_review_date || "",
            fld_place_id: rowData.fld_place_id || "",
            fld_place_name: rowData.fld_place_name || "",
            fld_author_name: rowData.fld_author_name || "",
            fld_rating: rowData.fld_rating || "",
            fld_review_text: rowData.fld_review_text || "",
            fld_review_link: rowData.fld_review_link || "",
            fld_posted_as_id: rowData.fld_posted_as_id || "",
            fld_posted_as_name: rowData.fld_posted_as_name || "",
            fld_is_postd_arch: "0",
            fld_loggedin_user_id: UserID,
            fld_system_inserted_datetime: formatSyncDate(new Date()),
          },
        ],
        ApiKey: "kavin",
        AppTypeNo: "3",
        AppVersion: "1.0.0",
        FormCode: "227",
        synceddatetime: formatSyncDate(new Date()),
      };

      const response = await api.review_Archived(payload);
      if (response.status === "1") {
        newReviews();
        toast.current.show({
          severity: "success",
          summary: "Review archived successfully !",
          detail:
            response.responsemessage ||
            "You have successfully archived Review ",
        });
      } else {
        throw new Error(
          response
            ? response.responsemessage ||
              "An error occurred while archiving post."
            : "No response from the server."
        );
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Review archived Failed",
        detail:
          error.message || "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const confirmPostReview = (rowData) => {
    confirmDialog({
      message: "Are you sure you want to post this review?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => postReview(rowData),
      reject: () => {},
    });
  };

  const confirmArchiveReview = (rowData) => {
    confirmDialog({
      message: "Are you sure you want to archive this review?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => archiveReview(rowData),
      reject: () => {},
    });
  };

  const actionBodyTemplate = (rowData) => (
    <div className="action-buttons">
      <Button className="post-btn" onClick={() => confirmPostReview(rowData)}>
        Post
      </Button>
      <Button
        severity="danger"
        onClick={() => confirmArchiveReview(rowData)}
        outlined
        className="archive-btn"
      >
        {" "}
        Archive{" "}
      </Button>
    </div>
  );

  return (
    <div className="table-container">
      <Toast ref={toast} position="top-right" />
      <ConfirmDialog />
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
        rowsPerPageOptions={[10, 25, 50]}
      >
        <Column field="slno" header="Sl.No" />
        <Column
          field="fld_author_name"
          header="Reviewer Name"
          style={{ width: "12%" }}
        />
        <Column
          field="fld_review_date"
          header="Date"
          style={{ width: "10%" }}
          body={(rowData) => formatDate(rowData.fld_review_date)}
        />
        <Column
          field="fld_review_text"
          header="Review"
          body={reviewBodyTemplate}
        />
        <Column field="fld_rating" header="Star Rating" />
        <Column field="fld_place_name" header="Location" />
        <Column
          field="fld_review_link"
          header="Link"
          body={(rowData) => (
            <a
              href={rowData.fld_review_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortenLink(rowData.fld_review_link)}
            </a>
          )}
        />
        <Column
          field="reviewType"
          header="Review Type"
          body={checkboxTemplate}
          style={{ width: "15%" }}
        />
        <Column
          field="selectDoctor"
          header="Select Doctor"
          body={selectDoctorTemplate}
        />
        <Column
          field="action"
          header="Action"
          body={actionBodyTemplate}
          style={{ width: "10%", padding: "0px 5px" }}
        />
      </DataTable>
    </div>
  );
};

export default NewReviews;
