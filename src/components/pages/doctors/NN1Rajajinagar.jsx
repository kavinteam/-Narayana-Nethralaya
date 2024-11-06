import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import api from "../../api/api";
const NN1Rajajinagar = ({ onEdit, onDelete, refresh, baseUrl }) => {
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);

  const UserID = sessionStorage.getItem("UserID");
  const Password = sessionStorage.getItem("Password");
  const toast = useRef(null);

  const doctorsList = async () => {
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
      // console.log("res", result.responsemessage);
      if (result.status === "1") {
        const selectedId = "1";

        const rolesWithSlno = result.responsemessage
          .filter((doctor) => {
            const locationIds = doctor.fld_practice_location_id.split("$");
            return locationIds.includes(selectedId);
          })
          .map((doctor, index) => {
            const locationIds = doctor.fld_practice_location_id.split("$");
            const locationNames = doctor.fld_practice_location_name.split("$");

            const locationMap = locationIds.reduce((map, id, idx) => {
              map[id] = locationNames[idx];
              return map;
            }, {});

            const locationName = locationMap[selectedId] || "";
            // console.log("locations",locationNames)

            return {
              ...doctor,
              slno: index + 1,
              fld_practice_location_name: locationName,
              allLocationNames: locationNames,
            };
          });

        setDoctors(rolesWithSlno);
      } else {
        console.log("api res", result.responsemessage);
      }
    } catch (error) {
      console.error("Error fetching requested data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    doctorsList();
  }, [refresh]);

  const actionBodyTemplate = (rowData) => {
    return (
      <div>
        <Button className="edit-btn" onClick={() => onEdit(rowData)}>
          Edit{" "}
        </Button>
        <Button
          className="remove-btn"
          onClick={() => onDelete(rowData)}
          // onClick={() => deleteDoctor(rowData, toast)}
        >
          Remove
        </Button>
      </div>
    );
  };

  return (
    <div className="doctor-master-table">
      {/* <Toast ref={toast} /> */}

      {loading && (
        <div className="backdrop">
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
        value={doctors}
        className="doctor-table"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
      >
        <Column field="slno" header="Sl.No" />
        <Column
          field="fld_image_of_doctor"
          header="Image"
          body={(rowData) => {
            return (
              <img
                src={`${baseUrl}${rowData.fld_image_of_doctor}`}
                alt="Doctor"
                className="rounded-image"
              />
            );
          }}
        />
        <Column
          field="fld_doc_name"
          header="Doctor Name"
          style={{ width: "15%" }}
        />
        <Column field="fld_specialization" header="Specialization" />
        <Column field="fld_designation" header="Designation" />
        <Column field="fld_work_experience" header="Experience" />
        <Column header="Action" body={actionBodyTemplate} />
      </DataTable>
      {/* <ConfirmDialog /> */}
    </div>
  );
};

export default NN1Rajajinagar;
