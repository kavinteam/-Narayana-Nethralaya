import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import * as XLSX from "xlsx";
import api from "../api/api";
import { ProgressSpinner } from "primereact/progressspinner";

const Reports = () => {
  const [newReviews, setNewReviews] = useState([]);
  const [postedReviews, setPostedReviews] = useState([]);
  const [archivedReviews, setArchivedReviews] = useState([]);
  const [doctorsList, setDoctorsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const UserID = sessionStorage.getItem("UserID");
  const Password = sessionStorage.getItem("Password");

  const presentDate = new Date();
  const downloadDate = `${presentDate.getDate().toString().padStart(2, "0")}-${(
    presentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${presentDate.getFullYear()}`;

  const fetchNewReviews = async () => {
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
      const reviews = result.responsemessage.map((review, index) => ({
        ...review,
        slno: index + 1,
      }));
      setNewReviews(reviews);
    } catch (error) {
      console.error("Error fetching  new reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPostedReviews = async () => {
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
      setPostedReviews(result.responsemessage);
      const rolesWithSlno = result.responsemessage.map((role, index) => ({
        ...role,
        slno: index + 1,
      }));
      setPostedReviews(rolesWithSlno);
    } catch (error) {
      console.error("Error fetching posted reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchArchivedReviews = async () => {
    try {
      setLoading(true);
      const requestData = {
        userid: UserID,
        password: Password,
        reuest_type: "2",
        synceddatetime: "2023-01-24 11:57:34",
        FormCode: "202",
        ApiKey: "kavin",
        AppTypeNo: "3",
        AppVersion: "1.0.0",
        DbVersion: "10.4.1",
        DbSource: "W",
      };

      const result = await api.get_New_Reviews(requestData);
      setArchivedReviews(result.responsemessage);
      const rolesWithSlno = result.responsemessage.map((role, index) => ({
        ...role,
        slno: index + 1,
      }));
      setArchivedReviews(rolesWithSlno);
    } catch (error) {
      console.error("Error fetching archived reviews:", error);
    } finally {
      setLoading(false);
    }
  };


  const fetchDoctorsList = async () => {
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
      const result = await api.getDoctors(requestData);
      const rolesWithSlno = result.responsemessage.map((role, index) => ({
        ...role,
        slno: index + 1,
        fld_department_Name: role.fld_department_Name.replace(/\$/g, ", "),
        fld_practice_location_name: role.fld_practice_location_name.replace(/\$/g, ", "),
      }));
      setDoctorsList(rolesWithSlno);
    } catch (error) {
      console.error("Error fetching requested data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await fetchNewReviews();
      await fetchPostedReviews();
      await fetchArchivedReviews();
      await fetchDoctorsList();
      setLoading(false);
    };
    fetchData();
  }, []);

  const downloadNewReviewsCSV = () => {
    if (!newReviews.length) {
      toast.current.show({
        severity: "error",
        summary: "No data available",
        detail: "There is no data to download",
        life: 2000,
        closable: true,
        sticky: false,
      });
      return;
    }

    const headers = [
      { key: "slno", text: "S.No" },
      { key: "fld_author_name", text: "Reviewer Name" },
      { key: "fld_review_text", text: "Review Text" },
      { key: "fld_place_name", text: "Place name" },
      { key: "fld_rating", text: "Rating" },
      { key: "fld_review_date", text: "Review Date" },
      { key: "fld_review_link", text: "Review Link" },
    ];

    const wb = XLSX.utils.book_new();
    const headerTexts = headers.map((header) =>
      typeof header === "object" ? header.text : header
    );
    const keys = headers.map((header) =>
      typeof header === "object" ? header.key : header
    );

    const wsData = newReviews.map((row) => keys.map((key) => row[key]));
    wsData.unshift(headerTexts);
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "New Reviews");
    XLSX.writeFile(wb, `New_Reviews_${downloadDate}.xlsx`);

    toast.current.show({
      severity: "success",
      summary: "Successfully downloaded",
      detail: "New reviews data downloaded",
      life: 2000,
      closable: true,
      sticky: false,
    });
  };

  const downloadPostedReviewsCSV = () => {
    if (!postedReviews.length) {
      toast.current.show({
        severity: "error",
        summary: "No data available",
        detail: "There is no data to download",
        life: 2000,
        closable: true,
        sticky: false,
      });
      return;
    }

    const headers = [
      { key: "slno", text: "S.No" },
      { key: "fld_author_name", text: "Reviewer Name" },
      { key: "fld_review_text", text: "Review Text" },
      { key: "fld_place_name", text: "Place name" },
      { key: "fld_rating", text: "Rating" },
      { key: "fld_review_date", text: "Review Date" },
      { key: "fld_review_link", text: "Review Link" },
    ];

    const wb = XLSX.utils.book_new();
    const headerTexts = headers.map((header) =>
      typeof header === "object" ? header.text : header
    );
    const keys = headers.map((header) =>
      typeof header === "object" ? header.key : header
    );

    const wsData = postedReviews.map((row) => keys.map((key) => row[key]));
    wsData.unshift(headerTexts);
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Posted Reviews");
    XLSX.writeFile(wb, `Posted_Reviews_${downloadDate}.xlsx`);

    toast.current.show({
      severity: "success",
      summary: "Successfully downloaded",
      detail: "Posted reviews data downloaded",
      life: 2000,
      closable: true,
      sticky: false,
    });
  };

  const downloadArchivedReviewsCSV = () => {
    if (!archivedReviews.length) {
      toast.current.show({
        severity: "error",
        summary: "No data available",
        detail: "There is no data to download",
        life: 2000,
        closable: true,
        sticky: false,
      });
      return;
    }

    const headers = [
      { key: "slno", text: "S.No" },
      { key: "fld_author_name", text: "Reviewer Name" },
      { key: "fld_review_text", text: "Review Text" },
      { key: "fld_place_name", text: "Place name" },
      { key: "fld_rating", text: "Rating" },
      { key: "fld_review_date", text: "Review Date" },
      { key: "fld_review_link", text: "Review Link" },
    ];

    const wb = XLSX.utils.book_new();
    const headerTexts = headers.map((header) =>
      typeof header === "object" ? header.text : header
    );
    const keys = headers.map((header) =>
      typeof header === "object" ? header.key : header
    );
    const wsData = archivedReviews.map((row) => keys.map((key) => row[key]));
    wsData.unshift(headerTexts);
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Archived Reviews");
    XLSX.writeFile(wb, `Archived_Reviews_${downloadDate}.xlsx`);

    toast.current.show({
      severity: "success",
      summary: "Successfully downloaded",
      detail: "Archived reviews data downloaded",
      life: 2000,
      closable: true,
      sticky: false,
    });
  };


  const downloadDoctorsListCSV = () => {
    if (!doctorsList.length) {
      toast.current.show({
        severity: "error",
        summary: "No data available",
        detail: "There is no data to download",
        life: 2000,
        closable: true,
        sticky: false,
      });
      return;
    }

    const headers = [
      { key: "slno", text: "S.No" },
      { key: "fld_doc_name", text: "Doctor Name" },
      { key: "fld_designation", text: "Designation" },
      { key: "fld_specialization", text: "Specialization" },
      { key: "fld_department_Name", text: "Departments" },
      { key: "fld_practice_location_name", text: "Practice location" },
      { key: "fld_work_experience", text: "Work experience(In years)" },
      { key: "fld_doc_availability", text: "Doctor availability" },
      { key: "fld_edu_training", text: "Education and training" },
      { key: "fld_description", text: "About Doctor" },
      { key: "fld_achievment_awards", text: "Achievements and awards" },
      // { key: "fld_image_of_doctor", text: "Image of doctor" },
      { key: "fld_video_testimonials", text: "Video testimonials" },
      { key: "fld_date_of_registration", text: "date of registration" },
    ];

    const wb = XLSX.utils.book_new();
    const headerTexts = headers.map((header) =>
      typeof header === "object" ? header.text : header
    );
    const keys = headers.map((header) =>
      typeof header === "object" ? header.key : header
    );

    const wsData = doctorsList.map((row) => keys.map((key) => row[key]));
    wsData.unshift(headerTexts);
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Doctors List");
    XLSX.writeFile(wb, `All_Doctors_List_${downloadDate}.xlsx`);

    toast.current.show({
      severity: "success",
      summary: "Successfully downloaded",
      detail: "Doctors data downloaded",
      life: 2000,
      closable: true,
      sticky: false,
    });
  };
  return (
    <div className="container">
      <Toast ref={toast} />
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
      <span className="heading-page mt-0">Reports</span>
      <div className="grid">
        <div className="col-3">
          <Button
            icon="pi pi-download"
            label="New Reviews"
            className="csvDownloadbutton"
            onClick={downloadNewReviewsCSV}
            disabled={loading}
          />
        </div>
        <div className="col-3">
          <Button
            icon="pi pi-download"
            label="Posted Reviews"
            className="csvDownloadbutton"
            onClick={downloadPostedReviewsCSV}
            disabled={loading}
          />
        </div>
        <div className="col-3">
          <Button
            icon="pi pi-download"
            label="Archived Reviews"
            className="csvDownloadbutton"
            onClick={downloadArchivedReviewsCSV}
            disabled={loading}
          />
        </div>
        <div className="col-3">
          <Button
            icon="pi pi-download"
            label="All Doctors List"
            className="csvDownloadbutton"
            onClick={downloadDoctorsListCSV}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Reports;
