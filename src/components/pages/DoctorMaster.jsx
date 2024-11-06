import React, { useRef, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import NN1Rajajinagar from "./doctors/NN1Rajajinagar";
import NN2Bommasandra from "./doctors/NN2Bommasandra";
import NN3Indiranagar from "./doctors/NN3Indiranagar";
import NN4Bannerghatta from "./doctors/NN4Bannerghatta";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { BASE_URL } from "../../config";
import AddDoctor from "./AddDoctor";
import api from "../api/api";
import { ProgressSpinner } from "primereact/progressspinner";

const DoctorMaster = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const toast = useRef(null);

  const showModal = (doctor) => {
    setSelectedDoctor(doctor);
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
    setSelectedDoctor(null);
  };

  const handleSuccess = () => {
    hideDialog();
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: selectedDoctor
        ? "Doctor updated successfully!"
        : "Doctor added successfully!",
      life: 3000,
    });
    setRefresh((prev) => !prev);
  };

  const deleteDoctor = async (rowData) => {
    setLoading(true);
    const data = {
      master_tbl_doctor: [
        {
          fld_rf_id: rowData.fld_rf_id,
          fld_doc_sw_id: rowData.fld_doc_sw_id,
          fld_doc_id: rowData.fld_doc_id,
          fld_date_of_registration: rowData.fld_date_of_registration,
          fld_doc_name: rowData.fld_doc_name,
          fld_designation: rowData.fld_designation,
          fld_specialization: rowData.fld_specialization,
          fld_work_experience: rowData.fld_work_experience,
          fld_department_id: rowData.fld_department_id,
          fld_department_Name: rowData.fld_department_Name,
          fld_practice_location_id: rowData.fld_practice_location_id,
          fld_practice_location_name: rowData.fld_practice_location_name,
          fld_doc_availability: rowData.fld_doc_availability,
          fld_description: rowData.fld_description,
          fld_edu_training: rowData.fld_edu_training,
          fld_achievment_awards: rowData.fld_achievment_awards,
          fld_video_testimonials: rowData.fld_video_testimonials,
          fld_image_of_doctor: rowData.fld_image_of_doctor,
          fld_loggedin_user_id: rowData.fld_loggedin_user_id,
          synceddatetime: new Date().toISOString(),
          fld_system_inserted_datetime: "2023-01-24 11:57:34",
        },
      ],
      ApiKey: "kavin",
      AppTypeNo: "3",
      AppVersion: "1.0.0",
      FormCode: "227",
      synceddatetime: new Date().toISOString(),
    };

    try {
      const result = await api.delete_Doctors(data);
      // console.log("Doctor deleted successfully:", result);
      setRefresh((prev) => !prev);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Doctor deleted successfully!",
        life: 3000,
      });
    } catch (error) {
      console.error("Failed to delete doctor:", error);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (rowData) => {
    confirmDialog({
      message: "Are you sure you want to delete this doctor?",
      header: "Confirm Deletion",
      // icon: "pi pi-exclamation-triangle",
      icon: "pi pi-user-minus",
      acceptLabel: "Yes",
      rejectLabel: "No",
      acceptClassName: "p-button-danger",
      rejectClassName: "p-button-success",
      accept: () => deleteDoctor(rowData),
    });
  };

  const dialogHeader = selectedDoctor ? "Edit Doctor" : "Add Doctor";

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
      <ConfirmDialog />
      <div className="flex justify-content-between align-items-center">
        <span className="heading-page mt-0">Doctor Master</span>
        <Button
          // label="Add Doctor"
          icon="pi pi-plus"
          className="get-latest-button"
          onClick={() => {
            setSelectedDoctor(null);
            setVisible(true);
          }}
        >
          <span style={{ paddingRight: "8px" }} /> Add Doctor
        </Button>
        <Dialog
          header={dialogHeader}
          visible={visible}
          style={{ width: "80%" }}
          onHide={hideDialog}
        >
          <AddDoctor
            doctor={selectedDoctor}
            onCancel={hideDialog}
            onSuccess={handleSuccess}
          />
        </Dialog>
      </div>

      <div className="mt-4">
        <TabView>
          <TabPanel header="NN1 Rajajinagar">
            <NN1Rajajinagar
              onEdit={showModal}
              onDelete={confirmDelete}
              refresh={refresh}
              baseUrl={BASE_URL}
            />
          </TabPanel>
          <TabPanel header="NN2 Bommasandra">
            <NN2Bommasandra
              onEdit={showModal}
              onDelete={confirmDelete}
              refresh={refresh}
              baseUrl={BASE_URL}
            />
          </TabPanel>
          <TabPanel header="NN3 Indiranagar">
            <NN3Indiranagar
              onEdit={showModal}
              onDelete={confirmDelete}
              refresh={refresh}
              baseUrl={BASE_URL}
            />
          </TabPanel>
          <TabPanel header="NN4 Bannerghatta Road">
            <NN4Bannerghatta
              onEdit={showModal}
              onDelete={confirmDelete}
              refresh={refresh}
              baseUrl={BASE_URL}
            />
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default DoctorMaster;
