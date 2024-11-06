import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { ProgressSpinner } from "primereact/progressspinner";
import api from "../api/api";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleLogin = () => {
    navigate("/main/dashboard");
  };
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toast = useRef(null);
  const formik = useFormik({
    initialValues: {
      userid: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      userid: Yup.string().required("User name is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      if (values.rememberMe) {
        localStorage.setItem("remembereduserid", values.userid);
        localStorage.setItem("rememberedPassword", values.password);
      } else {
        localStorage.removeItem("remembereduserid");
        localStorage.removeItem("rememberedPassword");
      }
      try {
        setLoading(true);
        const additionalData = {
          synceddatetime: "2023-01-24 11:57:34",
          FormCode: "201",
          ApiKey: "kavin",
          AppTypeNo: "3",
          AppVersion: "1.0.0",
          DbVersion: "10.4.1",
          DbSource: "W",
        };
        const response = await api.login(
          values.userid,
          values.password,
          additionalData
        );
        // console.log("res", response);
        if (response && response.status === "1") {
          const sessionID = uuidv4();
          sessionStorage.setItem("sessionId", sessionID);
          sessionStorage.setItem(
            "RoleCode",
            response.loged_in_details[0].fld_role_code
          );
          sessionStorage.setItem(
            "UserID",
            response.loged_in_details[0].fld_user_id
          );
          sessionStorage.setItem(
            "Password",
            response.loged_in_details[0].fld_password
          );
          navigate("/main/dashboard");
        } else {
          console.log("api res", response.responsemessage);
          const errorMessage = response
            ? response.responsemessage || "Invalid username or password"
            : "Unexpected API response format";
          toast.current.show({
            severity: "error",
            summary: "Login Failed",
            detail: errorMessage,
          });
        }
      } catch (error) {
        console.error("Error:", error);
        toast.current.show({
          severity: "error",
          summary: "Login Failed",
          detail: "An unexpected error occurred. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    },
  });
  useEffect(() => {
    const storeduserid = localStorage.getItem("remembereduserid");
    const storedPassword = localStorage.getItem("rememberedPassword");

    if (storeduserid && storedPassword) {
      formik.setValues({
        ...formik.values,
        userid: storeduserid,
        password: storedPassword,
      });
    }
  }, []);

  return (
    <div className="body">
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
      <div>
        <div className="grid log-grid">
          {windowWidth >= 900 && (
            <div className="col bg-login">
              <img src="/Mask.png" alt="background" className="Login-img" />
              <div className="mid-img">
                <img
                  src="/Group.png"
                  alt="logo"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          )}
          <div className="col log-grid ">
            <form onSubmit={formik.handleSubmit} style={{ minWidth: "60%" }}>
            {/* <form style={{ minWidth: "60%" }}> */}
              <div>
                <h2 className="login-h2">Welcome to</h2>
                <h2 className="nn-h2">Narayana Nethralaya</h2>
                <h2 className="nn-h2">Review Management System</h2>

                <div className="mt-2">
                  <label htmlFor="userid">User Name</label>
                  <div className="mt-2">
                    <InputText
                      style={{ width: "100%", borderRadius: "15px" }}
                      id="userid"
                      name="userid"
                      placeholder="Enter User Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.userid}
                      className={
                        formik.errors.userid && formik.touched.userid
                          ? "p-invalid p-inputtext"
                          : "p-inputtext"
                      }
                    />
                  </div>

                  {formik.errors.userid && formik.touched.userid && (
                    <span className="p-error">{formik.errors.userid}</span>
                  )}
                </div>
                <br></br>
                <div>
                  <label htmlFor="password"> Password</label>
                  <div className="mt-2">
                    <Password
                      id="password"
                      name="password"
                      style={{ width: "100%" }}
                      placeholder="Enter Password"
                      toggleMask
                      feedback={false}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      className={
                        formik.errors.password && formik.touched.password
                          ? "p-invalid p-password loginPage"
                          : "p-password loginPage"
                      }
                    />
                  </div>

                  {formik.errors.password && formik.touched.password && (
                    <span className="p-error">{formik.errors.password}</span>
                  )}
                </div>
                <br />
                <div className="mb-3 flex align-items-center">
                  <Checkbox
                    inputId="rememberMe"
                    name="rememberMe"
                    onChange={formik.handleChange}
                    checked={formik.values.rememberMe}
                    className="custom-checkbox"
                  />
                  <label htmlFor="rememberMe" className="ml-2">
                    Remember Me
                  </label>
                </div>
              </div>
              <Toast ref={toast} position="top-right" />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  // onClick={handleLogin}
                  className="login-btn"
                  type="submit"
                  label="Login"
                />
              </div>
            </form>
            <div
              style={{
                position: "fixed",
                bottom: "10px",
                fontSize: "14px",
              }}
            >
              <span
                style={{
                  color: "#9D9D9D",
                  fontWeight: "500",
                  fontSize: "12px",
                }}
              >
                Powered by KavinTech Corporation, Bangalore{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
