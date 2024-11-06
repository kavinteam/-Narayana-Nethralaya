import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Chips } from "primereact/chips";
import { FileUpload } from "primereact/fileupload";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import { BASE_URL } from "../../config";
import api from "../api/api";
import { ProgressSpinner } from "primereact/progressspinner";

export default function AddDoctor({ doctor, onCancel, onSuccess }) {
  // console.log("Doctor prop in AddDoctor:", doctor);
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [videoTestimonials, setVideoTestimonials] = useState(
    doctor?.fld_video_testimonials
      ? doctor.fld_video_testimonials.split("$")
      : []
  );
  const fileUploadRef = useRef(null);
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  const departments = [
    { id: "1", label: "Cataract and Refractive Lens Surgery" },
    { id: "2", label: "Refractive Surgery" },
    { id: "3", label: "Cornea Surgery" },
    { id: "4", label: "Dry Eye" },
    { id: "5", label: "Glaucoma" },
    { id: "6", label: "Vitreoretinal Service" },
    { id: "7", label: "Pediatric Ophthalmology & Strabismology" },
    { id: "8", label: "Uveitis & Ocular Immunology Service" },
    { id: "9", label: "Ocular Oncology, Oculoplasty & Orbit service" },
    { id: "10", label: "Medical Retina" },
    { id: "11", label: "Neuro Ophthalmology & Electrophysiology" },
    { id: "12", label: "Pediatric Retina" },
    { id: "13", label: "General OPD" },
    { id: "14", label: "Ophthalmic Plastics, Aesthetics, Oncology and Lacrimal Surgery" },
    { id: "15", label: "General Ophthalmology" },
    { id: "16", label: "Neuro Ophthalmology " },
    { id: "17", label: "N/A" },
  ];
  const locations = [
    { id: "1", label: "NN Rajajinagar" },
    { id: "2", label: "NN Bommasandra" },
    { id: "3", label: "NN Indiranagar" },
    { id: "4", label: "NN Bannerghatta Road" },
  ];
  // const handleImageUpload = async (event) => {
  //   if (event.files && event.files.length > 0) {
  //     await formik.setFieldValue("fld_image_of_doctor", event.files[0]);
  //     formik.setTouched({ ...formik.touched, fld_image_of_doctor: true });
  //     await formik.validateForm();
  //   }
  // };
  const handleImageUpload = async (event) => {
    if (event.files && event.files.length > 0) {
      const file = event.files[0];
      await formik.setFieldValue("fld_image_of_doctor", file);
      await formik.setTouched({ ...formik.touched, fld_image_of_doctor: true });
      await formik.validateForm();
    }
  };
  const fetchImage = async (url) => {
    try {
      const response = await fetch(`${BASE_URL}${url}`);
      const blob = await response.blob();
      const file = new File([blob], "doctor_image.jpg", { type: blob.type });
      formik.setFieldValue("fld_image_of_doctor", file);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };
  useEffect(() => {
    if (doctor?.fld_image_of_doctor) {
      fetchImage(doctor.fld_image_of_doctor);
    }
  }, [doctor]);

  // const handleAddLink = () => {
  //   if (links.length < 20 && inputValue) {
  //     setLinks([...links, inputValue]);
  //     setInputValue("");
  //   } else if (links.length >= 20) {
  //     alert("You can only add a maximum of 20 links.");
  //   }
  // };
  // const handleLinkChange = (e) => {
  //   setLinks(e.value.filter((link) => link !== ""));
  // };

  const UserID = sessionStorage.getItem("UserID");
  const allLocationNames = doctor ? doctor.allLocationNames || [] : [];
  // console.log("all loc", allLocationNames);
  const formik = useFormik({
    initialValues: {
      // fld_date_of_registration: doctor?.fld_date_of_registration || null,
      fld_doc_name: doctor?.fld_doc_name || "",
      fld_designation: doctor?.fld_designation || "",
      fld_specialization: doctor?.fld_specialization || "",
      fld_work_experience: doctor?.fld_work_experience || "",
      fld_department_Name: doctor?.fld_department_Name || "",
      // fld_practice_location_name: doctor?.fld_practice_location_name || "",
      fld_practice_location_name: doctor
        ? doctor.allLocationNames.join(", ")
        : "",
      // fld_practice_location_name: doctor?.allLocationNames ? doctor.allLocationNames.join(",") : "",
      fld_doc_availability: doctor?.fld_doc_availability || "",
      fld_description: doctor?.fld_description || "",
      fld_edu_training: doctor?.fld_edu_training || "",
      fld_achievment_awards: doctor?.fld_achievment_awards || "",
      // fld_video_testimonials: doctor?.fld_video_testimonials || "",
      fld_video_testimonials: videoTestimonials || [],
      fld_image_of_doctor: doctor?.fld_image_of_doctor || null,
    },
    validationSchema: Yup.object({
      // fld_date_of_registration: Yup.date(),
      fld_doc_name: Yup.string(),
      // .required("Name is required"),
      fld_designation: Yup.string(),
      // .required("Designation is required"),
      fld_specialization: Yup.string(),
      // .required("Specialization is required"),
      fld_work_experience: Yup.string(),
      // .required("Work Experience is required"),
      fld_department_Name: Yup.string(),
      // .required("Department is required"),
      fld_practice_location_name: Yup.string(),
      // .required(
      //   "Practice location is required"
      // ),
      fld_doc_availability: Yup.string(),
      // .required(
      //   "Days & timing of availability for each centre is required"
      // ),
      fld_description: Yup.string(),
      // .required("Description is required"),
      fld_edu_training: Yup.string(),
      // .required(
      //   "Education & Training is required"
      // ),
      fld_achievment_awards: Yup.string(),
      // fld_video_testimonials: Yup.array()
      //   .min(1, "At least one video testimonial is required")
      //   .max(20, "You can add a maximum of 20 video testimonials"),
      fld_video_testimonials: Yup.array()
        .min(0, "At least one video testimonial is required")
        .max(20, "You can add a maximum of 20 video testimonials")
        .of(Yup.string().matches(urlRegex, "Please enter a valid URL")),
      fld_image_of_doctor: doctor
        ? Yup.mixed()
        : Yup.mixed().required("Image of Doctor is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const loggedinUserId = sessionStorage.getItem("UserID");
        // console.log("Form values on submit:", values);

        const formData = new FormData();
        // formData.append(
        //   "fld_date_of_registration",
        //   values.fld_date_of_registration
        //     ? values.fld_date_of_registration.toLocaleDateString("en-GB")
        //     : ""
        // );
        formData.append(
          "fld_date_of_registration",
          new Date().toLocaleDateString("en-GB")
        );
        formData.append("fld_doc_name", values.fld_doc_name);
        formData.append("fld_designation", values.fld_designation);
        formData.append("fld_specialization", values.fld_specialization);
        formData.append("fld_work_experience", values.fld_work_experience);
        formData.append(
          "fld_department_id",
          selectedDepartments.map((d) => d.id).join("$")
        );
        formData.append(
          "fld_department_Name",
          selectedDepartments.map((d) => d.label).join("$")
        );
        formData.append(
          "fld_practice_location_id",
          selectedLocations.map((l) => l.id).join("$")
        );
        formData.append(
          "fld_practice_location_name",
          selectedLocations.map((l) => l.label).join("$")
        );
        formData.append("fld_doc_availability", values.fld_doc_availability);
        formData.append("fld_description", values.fld_description);
        formData.append("fld_edu_training", values.fld_edu_training);
        formData.append("fld_achievment_awards", values.fld_achievment_awards);
        const videoTestimonialsString = values.fld_video_testimonials.join("$");
        formData.append("fld_video_testimonials", videoTestimonialsString);
        // formData.append(
        //   "fld_video_testimonials",
        //   values.fld_video_testimonials
        // );
        // if (values.fld_image_of_doctor) {
        //   formData.append("fld_image_of_doctor", values.fld_image_of_doctor);
        // }
        if (values.fld_image_of_doctor instanceof File) {
          formData.append("fld_image_of_doctor", values.fld_image_of_doctor);
        } else if (!doctor?.fld_image_of_doctor) {
          throw new Error("Image file not provided.");
        }
        formData.append("fld_loggedin_user_id", loggedinUserId);
        formData.append(
          "synceddatetime",
          new Date().toISOString().replace("T", " ").slice(0, 19)
        );
        formData.append("ApiKey", "kavin");
        formData.append("AppTypeNo", "3");
        formData.append("AppVersion", "1.0.0");
        formData.append("FormCode", "227");
        // console.log("Doctor object before submitting:", doctor);
        // console.log("Doctor's fld_rf_id:", doctor?.fld_rf_id);
        if (doctor && doctor.fld_rf_id) {
          formData.append("fld_rf_id", doctor.fld_rf_id);
          const response = await api.addNewDoctor(formData);
          onSuccess();
        } else {
          const response = await api.addNewDoctor(formData);
          // console.log("status", response.status);
          onSuccess();
          resetForm();
          if (fileUploadRef.current) {
            fileUploadRef.current.clear();
          }
          console.log("Doctor is not available");
        }
        // const response = await api.addNewDoctor(formData);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (doctor) {
      formik.setValues({
        // fld_date_of_registration: doctor?.fld_date_of_registration
        //   ? new Date(doctor.fld_date_of_registration)
        //   : null,
        fld_date_of_registration: doctor?.fld_date_of_registration
          ? new Date(doctor.fld_date_of_registration)
          : new Date("2023-01-01"),
        fld_doc_name: doctor?.fld_doc_name || "",
        fld_designation: doctor?.fld_designation || "",
        fld_specialization: doctor?.fld_specialization || "",
        fld_work_experience: doctor?.fld_work_experience || "",
        fld_department_id: doctor?.fld_department_id || "",
        fld_department_Name: doctor?.fld_department_Name || "",
        fld_doc_availability: doctor?.fld_doc_availability || "",
        fld_description: doctor?.fld_description || "",
        fld_edu_training: doctor?.fld_edu_training || "",
        fld_practice_location_id: doctor?.fld_practice_location_id || "",
        fld_practice_location_name: doctor?.fld_practice_location_name || "",
        fld_achievment_awards: doctor?.fld_achievment_awards || "",
        // fld_video_testimonials: doctor?.fld_video_testimonials || "",
        fld_video_testimonials: doctor.fld_video_testimonials
          ? doctor.fld_video_testimonials.split("$")
          : [],
        fld_image_of_doctor: doctor?.fld_image_of_doctor || null,
      });
      // console.log('Original names:', doctor.fld_practice_location_name);
      // console.log('Split names:', doctor.fld_practice_location_name.split('$'));
      // setSelectedLocations(
      //   doctor.fld_practice_location_name
      //     ? doctor.fld_practice_location_name.split("$").map((name, index) => ({
      //         id: doctor.fld_practice_location_id.split("$")[index],
      //         label: name,
      //       }))
      //     : []
      // );
      setSelectedLocations(
        doctor.allLocationNames && doctor.fld_practice_location_id
          ? doctor.allLocationNames.map((name, index) => ({
              id: doctor.fld_practice_location_id.split("$")[index],
              label: name,
            }))
          : []
      );
      setSelectedDepartments(
        doctor.fld_department_Name
          ? doctor.fld_department_Name.split("$").map((name, index) => ({
              id: doctor.fld_department_id.split("$")[index],
              label: name,
            }))
          : []
      );
      if (doctor?.fld_image_of_doctor) {
        // console.log("Image URL:", doctor.fld_image_of_doctor);
        setImageSrc(`${BASE_URL}${doctor.fld_image_of_doctor}`);
      }
    }
  }, [doctor]);

  return (
    <div>
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
      <div className="container1">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid mb-2">
            {/* Name Field */}
            <div className="col-6">
              <div className="grid flex align-items-center">
                <div className="col-4">
                  <label className="labelNames" htmlFor="fld_doc_name">
                    Name :
                  </label>
                </div>
                <div className="col-8">
                  <InputText
                    placeholder="Enter Doctor's name"
                    id="fld_doc_name"
                    name="fld_doc_name"
                    keyFilter={/[a-zA-Z.]/}
                    maxLength={50}
                    value={formik.values.fld_doc_name}
                    // onChange={formik.handleChange}
                    onChange={(e) => {
                      const value = e.target.value;
                      const regex = /^[a-zA-Z]+[a-zA-Z. ]*$/;

                      if (value === "" || regex.test(value)) {
                        formik.setFieldValue("fld_doc_name", value);
                      }
                    }}
                    onBlur={formik.handleBlur}
                    className={`inputField ${
                      formik.errors.fld_doc_name && formik.touched.fld_doc_name
                        ? "p-invalid p-inputtext state-master-input"
                        : "p-inputtext forminputtext"
                    }`}
                  />
                  {formik.errors.fld_doc_name &&
                    formik.touched.fld_doc_name && (
                      <small className="p-error">
                        {formik.errors.fld_doc_name}
                      </small>
                    )}
                </div>
              </div>
            </div>

            {/* Designation Field */}
            <div className="col-6">
              <div className="grid flex align-items-center">
                <div className="col-4">
                  <label htmlFor="fld_designation" className="labelNames">
                    Designation :
                  </label>
                </div>
                <div className="col-8">
                  <InputText
                    placeholder="Enter Doctor's designation"
                    id="fld_designation"
                    name="fld_designation"
                    keyFilter={/[a-zA-Z.]/}
                    maxLength={2000}
                    value={formik.values.fld_designation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`inputField ${
                      formik.errors.fld_designation &&
                      formik.touched.fld_designation
                        ? "p-invalid p-inputtext state-master-input"
                        : "p-inputtext forminputtext"
                    }`}
                  />
                  {formik.errors.fld_designation &&
                    formik.touched.fld_designation && (
                      <small className="p-error">
                        {formik.errors.fld_designation}
                      </small>
                    )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid mb-2">
            {/* Specialization Field */}
            <div className="col-6">
              <div className="grid flex align-items-center">
                <div className="col-4">
                  <label htmlFor="fld_specialization" className="labelNames">
                    Specialization :{" "}
                  </label>
                </div>
                <div className="col-8">
                  <InputTextarea
                    placeholder="Enter Doctor's specialization"
                    id="fld_specialization"
                    name="fld_specialization"
                    keyFilter={/[a-zA-Z.]/}
                    maxLength={2000}
                    value={formik.values.fld_specialization}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`inputField ${
                      formik.errors.fld_specialization &&
                      formik.touched.fld_specialization
                        ? "p-invalid p-inputtext state-master-input"
                        : "p-inputtext forminputtext"
                    }`}
                  />
                  {formik.errors.fld_specialization &&
                    formik.touched.fld_specialization && (
                      <small className="p-error">
                        {formik.errors.fld_specialization}
                      </small>
                    )}
                </div>
              </div>
            </div>

            {/* Work Experience Field */}
            <div className="col-6">
              <div className="grid flex align-items-center">
                <div className="col-4">
                  <label htmlFor="fld_work_experience" className="labelNames">
                    Work Experience :
                  </label>
                </div>
                <div className="col-8">
                  <InputText
                    placeholder="Enter Work Experience in years"
                    id="fld_work_experience"
                    name="fld_work_experience"
                    value={formik.values.fld_work_experience}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onInput={(e) => {
                      // Allow digits and a single dot (.)
                      let value = e.target.value;

                      // Only allow numbers and one dot
                      if (!/^[0-9]*(\.[0-9]*)?$/.test(value)) {
                        value = value.replace(/[^0-9.]/g, ""); // Allow only digits and dots
                      }

                      // Restrict to one dot
                      const dotCount = (value.match(/\./g) || []).length;
                      if (dotCount > 1) {
                        value = value.slice(0, -1); // Remove last character if it exceeds one dot
                      }

                      // Ensure numeric value within 0-99 range (including decimals)
                      const numericValue = parseFloat(value);
                      if (numericValue < 0) value = "0";
                      else if (numericValue > 99) value = "99";

                      // Set the validated value in both input and Formik state
                      e.target.value = value;
                      formik.setFieldValue("fld_work_experience", value);
                    }}
                    className={`inputField ${
                      formik.errors.fld_work_experience &&
                      formik.touched.fld_work_experience
                        ? "p-invalid p-inputtext state-master-input"
                        : "p-inputtext forminputtext"
                    }`}
                  />

                  {/* <InputText
                    placeholder="Enter Work Experience in years"
                    id="fld_work_experience"
                    name="fld_work_experience"
                    value={formik.values.fld_work_experience}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    // onInput={(e) => {
                    //   e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    // }}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                      const numericValue = parseInt(e.target.value, 10);
                      if (numericValue < 0 || numericValue > 99) {
                        e.target.value = numericValue < 0 ? "0" : "99";
                      }
                      formik.setFieldValue(
                        "fld_work_experience",
                        e.target.value
                      );
                    }}
                    maxLength={4}
                    className={`inputField ${
                      formik.errors.fld_work_experience &&
                      formik.touched.fld_work_experience
                        ? "p-invalid p-inputtext state-master-input"
                        : "p-inputtext forminputtext"
                    }`}
                  /> */}
                  {formik.errors.fld_work_experience &&
                    formik.touched.fld_work_experience && (
                      <small className="p-error">
                        {formik.errors.fld_work_experience}
                      </small>
                    )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid mb-2">
            {/* Department Field */}
            <div className="col-6">
              <div className="grid flex align-items-center">
                <div className="col-4">
                  <label htmlFor="fld_department_Name" className="labelNames">
                    Department :
                  </label>
                </div>
                <div className="col-8">
                  <MultiSelect
                    id="fld_department_id"
                    name="fld_department_id"
                    value={selectedDepartments}
                    onChange={(e) => {
                      const selected = e.value;
                      formik.setFieldValue(
                        "fld_department_id",
                        selected.map((item) => item.id).join("$")
                      );
                      formik.setFieldValue(
                        "fld_department_Name",
                        selected.map((item) => item.label).join("$")
                      );
                      setSelectedDepartments(selected);
                    }}
                    options={departments}
                    onBlur={formik.handleBlur}
                    optionLabel="label"
                    display="chip"
                    placeholder="Select Departments"
                    maxSelectedLabels={3}
                    className={`inputField ${
                      formik.errors.fld_department_id &&
                      formik.touched.fld_department_id
                        ? "p-invalid"
                        : ""
                    }`}
                  />
                  {formik.errors.fld_department_Name &&
                    formik.touched.fld_department_Name && (
                      <small className="p-error">
                        {formik.errors.fld_department_Name}
                      </small>
                    )}
                </div>
              </div>
            </div>

            {/* Practice Location Field */}
            <div className="col-6">
              <div className="grid flex align-items-center">
                <div className="col-4">
                  <label
                    htmlFor="fld_practice_location_name"
                    className="labelNames"
                  >
                    Practice Location :
                  </label>
                </div>
                <div className="col-8">
                  <MultiSelect
                    id="fld_practice_location_id"
                    name="fld_practice_location_id"
                    value={selectedLocations}
                    onChange={(e) => {
                      const selected = e.value;
                      formik.setFieldValue(
                        "fld_practice_location_id",
                        selected.map((item) => item.id).join("$")
                      );
                      formik.setFieldValue(
                        "fld_practice_location_name",
                        selected.map((item) => item.label).join("$")
                      );
                      setSelectedLocations(selected);
                    }}
                    options={locations}
                    onBlur={formik.handleBlur}
                    optionLabel="label"
                    display="chip"
                    placeholder="Select Locations"
                    maxSelectedLabels={3}
                    className={`inputField ${
                      formik.errors.fld_practice_location_name &&
                      formik.touched.fld_practice_location_name
                        ? "p-invalid"
                        : ""
                    }`}
                  />
                  {formik.errors.fld_practice_location_name &&
                    formik.touched.fld_practice_location_name && (
                      <small className="p-error">
                        {formik.errors.fld_practice_location_name}
                      </small>
                    )}
                </div>
              </div>
            </div>
          </div>
          <div className="grid mb-2">
            {/* Days & Timing of Availability Field */}
            <div className="col-6">
              <div className="grid flex align-items-center">
                <div className="col-4">
                  <label htmlFor="fld_doc_availability" className="labelNames">
                    Days & Timing of Availability :
                  </label>
                </div>
                <div className="col-8">
                  <InputText
                    placeholder="Enter Days & Timing of Availability"
                    id="fld_doc_availability"
                    name="fld_doc_availability"
                    maxLength={2000}
                    value={formik.values.fld_doc_availability}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`inputField ${
                      formik.errors.fld_doc_availability &&
                      formik.touched.fld_doc_availability
                        ? "p-invalid p-inputtext state-master-input"
                        : "p-inputtext forminputtext"
                    }`}
                  />
                  {formik.errors.fld_doc_availability &&
                    formik.touched.fld_doc_availability && (
                      <small className="p-error">
                        {formik.errors.fld_doc_availability}
                      </small>
                    )}
                </div>
              </div>
            </div>

            {/* About Doctor Field */}
            <div className="col-6">
              <div className="grid flex align-items-center">
                <div className="col-4">
                  <label htmlFor="fld_description" className="labelNames">
                    About Doctor :
                  </label>
                </div>
                <div className="col-8">
                  <InputTextarea
                    placeholder="Enter about doctor"
                    id="fld_description"
                    name="fld_description"
                    maxLength={5000}
                    value={formik.values.fld_description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`inputField ${
                      formik.errors.fld_description &&
                      formik.touched.fld_description
                        ? "p-invalid p-inputtext state-master-input"
                        : "p-inputtext forminputtext"
                    }`}
                  />
                  {formik.errors.fld_description &&
                    formik.touched.fld_description && (
                      <small className="p-error">
                        {formik.errors.fld_description}
                      </small>
                    )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid mb-2">
            {/* Education & Training Field */}
            <div className="col-6">
              <div className="grid flex align-items-center">
                <div className="col-4">
                  <label htmlFor="fld_edu_training" className="labelNames">
                    Education & Training :
                  </label>
                </div>
                <div className="col-8">
                  <InputText
                    placeholder="Enter Education & Training"
                    id="fld_edu_training"
                    name="fld_edu_training"
                    keyFilter={/[a-zA-Z.]/}
                    maxLength={2000}
                    value={formik.values.fld_edu_training}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`inputField ${
                      formik.errors.fld_edu_training &&
                      formik.touched.fld_edu_training
                        ? "p-invalid p-inputtext state-master-input"
                        : "p-inputtext forminputtext"
                    }`}
                  />
                  {formik.errors.fld_edu_training &&
                    formik.touched.fld_edu_training && (
                      <small className="p-error">
                        {formik.errors.fld_edu_training}
                      </small>
                    )}
                </div>
              </div>
            </div>

            {/* Achievements & Awards Field */}
            <div className="col-6">
              <div className="grid flex align-items-center">
                <div className="col-4">
                  <label htmlFor="fld_achievment_awards" className="labelNames">
                    Achievements & Awards:
                  </label>
                </div>
                <div className="col-8">
                  <InputText
                    placeholder="Enter Achievements & Awards"
                    id="fld_achievment_awards"
                    name="fld_achievment_awards"
                    maxLength={2000}
                    value={formik.values.fld_achievment_awards}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`inputField ${
                      formik.errors.fld_achievment_awards &&
                      formik.touched.fld_achievment_awards
                        ? "p-invalid p-inputtext state-master-input"
                        : "p-inputtext forminputtext"
                    }`}
                  />
                  {formik.errors.fld_achievment_awards &&
                    formik.touched.fld_achievment_awards && (
                      <small className="p-error">
                        {formik.errors.fld_achievment_awards}
                      </small>
                    )}
                </div>
              </div>
            </div>
          </div>
          <div className="grid mb-2">
            {/* Video Testimonials Field */}
            <div className="col-12">
              <div className="grid flex align-items-center">
                <div className="col-2">
                  <label
                    htmlFor="fld_video_testimonials"
                    className="labelNames"
                  >
                    Video Testimonials :
                  </label>
                </div>
                <div className="col-10">
                  <Chips
                    id="fld_video_testimonials"
                    name="fld_video_testimonials"
                    value={formik.values.fld_video_testimonials}
                    onChange={(e) =>
                      formik.setFieldValue("fld_video_testimonials", e.value)
                    }
                    style={{ width: "96%" }}
                    onBlur={formik.handleBlur}
                    className={`${
                      formik.errors.fld_video_testimonials &&
                      formik.touched.fld_video_testimonials
                        ? "p-invalid"
                        : ""
                    }`}
                    max={20}
                    placeholder="Paste video testimonial links here and press enter . Max 20 links allowed"
                    itemTemplate={(link) => (
                      <span title={link}>
                        {link.length > 20
                          ? `${link.substring(0, 20)}...`
                          : link}
                      </span>
                    )}
                  />
                </div>
                <div className="col-2"></div>
                {formik.errors.fld_video_testimonials &&
                  formik.touched.fld_video_testimonials && (
                    <small className="p-error ml-2">
                      {formik.errors.fld_video_testimonials}
                    </small>
                  )}
              </div>
            </div>

            {/* Image of Doctor Field */}
            <div className="col-12">
              <div className="grid flex align-items-center">
                <div className="col-2">
                  <label htmlFor="fld_image_of_doctor" className="labelNames">
                    Image of Doctor :
                  </label>
                </div>
                <div className="col-5 flex">
                  <FileUpload
                    ref={fileUploadRef}
                    name="fld_image_of_doctor"
                    accept="image/*"
                    customUpload
                    uploadHandler={handleImageUpload}
                    auto
                    style={{ width: "90%" }}
                    chooseLabel={
                      doctor?.fld_image_of_doctor
                        ? "Update image"
                        : "Choose image"
                    }
                  />
                  {imageSrc && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginLeft: "30px",
                      }}
                    >
                      <img
                        src={imageSrc}
                        alt="Doctor"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          marginRight: "10px",
                        }}
                      />
                      <div className="img">
                        {" "}
                        <p style={{ margin: "10px 0 0 0" }}>Current Image</p>
                      </div>
                    </div>
                  )}
                  {formik.errors.fld_image_of_doctor &&
                    formik.touched.fld_image_of_doctor && (
                      <small className="p-error">
                        {formik.errors.fld_image_of_doctor}
                      </small>
                    )}
                </div>
              </div>
            </div>
          </div>

          <div className="buttonContainer">
            <Button
              type="button"
              className="cancelButton"
              label="Cancel"
              severity="danger"
              outlined
              onClick={onCancel}
            />
            <Button
              type="submit"
              className="add-doctor-btn"
              label={doctor ? "Update" : "Add Doctor"}
              // icon="pi pi-plus"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
