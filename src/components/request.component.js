import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { axiosInstance } from "../axiosConfig";
export function RequestComponent() {
  const quantityRegex = /^[1-9]{1}[0-9]*$/;
  const nameRegex = /^[a-zA-Z ]{3,}$/;
  const [requestData, setRequestData] = useState({
    bloodType: "A+",
    city: "",
    quantity: "",
    patientStatus: "immediate",
    HospitalId: "empty",
  });
  const [hospitals, setHospitals] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/hospitals")
      .then((res) => setHospitals(res.data.hospitals))
      .catch(() => toast.error("unexpected error while getting hospitals!"));
  }, []);
  useEffect(() => {
    validate();
  }, [requestData]);
  const [patientStatus, setPatientStatus] = useState([
    "immediate",
    "Urgent",
    "Normal",
  ]);
  const [bloodTypes, setBloodTypes] = useState([
    "A+",
    "B+",
    "AB+",
    "O+",
    "A-",
    "B-",
    "AB-",
    "O-",
  ]);
  const [validationErrors, setValidationErrors] = useState({
    quantityError: "",
    cityError: "",
    hospitalError: "",
  });

  const validate = () => {
    setValidationErrors({
      quantityError: !requestData.quantity.match(quantityRegex)
        ? "please enter a valid quantity"
        : "",
      cityError: !requestData.city.match(nameRegex)
        ? "please enter a valid city name"
        : "",
      hospitalError:
        requestData.HospitalId == "empty"
          ? "please enter a valid hospital"
          : "",
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      !validationErrors.quantityError &&
      !validationErrors.cityError &&
      !validationErrors.hospitalError
    ) {
      console.log(requestData);
      axiosInstance
        .post("/makeRequest", requestData)
        .then((res) => {
          toast.success("Hospital request accepted successfully👌", {
            theme: "dark",
          });
          setRequestData({
            bloodType: "",
            HospitalId: "",
            city: "",
            patientStatus: "",
            quantity: "",
          });
        })
        .catch((res) => {
          if (res.response.status == 422) {
            res.response.data.errors.map((err) =>
              toast.error(err, { theme: "dark" })
            );
          } else if (res.response.status == 500) {
            toast.error("Internal server error", { theme: "dark" });
          } else {
            toast.error("Unexpected error", { theme: "dark" });
          }
        });
    } else {
      toast.warning("please fill all data first", { theme: "dark" });
    }
  };
  return (
    <>
      <div
        className="w-50 mx-auto p-4 rounded my-3"
        style={{ backgroundColor: "#A0A0A0" }}
      >
        <h2 className="text-center mb-1">
          <span className="badge bg-secondary">Donation Form</span>
        </h2>
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <div className="form-outline mb-2">
            <label className="form-label" htmlFor="form5Example1">
              Blood Type
            </label>
            <select
              className="form-select"
              name="bloodType"
              value={requestData.bloodType}
              onChange={(e) =>
                setRequestData({ ...requestData, bloodType: e.target.value })
              }
            >
              {bloodTypes.map((bloodType) => (
                <option value={bloodType} key={bloodType}>
                  {bloodType}
                </option>
              ))}
            </select>
          </div>
          <div className="form-outline mb-1">
            <label className="form-label" htmlFor="form5Example1">
              patient status
            </label>
            <select
              className="form-select"
              name="patientStatus"
              value={requestData.patientStatus}
              onChange={(e) =>
                setRequestData({
                  ...requestData,
                  patientStatus: e.target.value,
                })
              }
            >
              {patientStatus.map((status) => (
                <option value={status} key={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="form-outline mb-1">
            <label className="form-label" htmlFor="form5Example1">
              hospital name
            </label>
            <select
              className="form-select"
              name="HospitalId"
              value={requestData.HospitalId}
              onChange={(e) =>
                setRequestData({
                  ...requestData,
                  HospitalId: e.target.value,
                })
              }
            >
              <option value="empty" disabled>
                select a hospital
              </option>
              {hospitals.map((hospital) => (
                <option value={hospital.id} key={hospital.id}>
                  {hospital.name}
                </option>
              ))}
            </select>
            {validationErrors.hospitalError && (
              <label className="text-danger">
                {validationErrors.hospitalError}
              </label>
            )}
          </div>
          <div className="form-outline mb-1">
            <label className="form-label" htmlFor="form5Example1">
              City name
            </label>
            <input
              type="text"
              id="form5Example1"
              name="city"
              placeholder="enter city name"
              className="form-control"
              value={requestData.city}
              onChange={(e) =>
                setRequestData({ ...requestData, city: e.target.value })
              }
            />
            {requestData.city && (
              <label className="text-danger">
                {validationErrors.cityError}
              </label>
            )}
          </div>
          <div className="form-outline mb-1">
            <label className="form-label" htmlFor="form5Example1">
              Blood quantity
            </label>
            <input
              type="text"
              id="form5Example1"
              name="quantity"
              placeholder="enter quantity of bags"
              className="form-control"
              value={requestData.quantity}
              onChange={(e) =>
                setRequestData({ ...requestData, quantity: e.target.value })
              }
            />
            {requestData.quantity && (
              <label className="text-danger">
                {validationErrors.quantityError}
              </label>
            )}
          </div>
          <div className="text-center">
            <input
              type="submit"
              value="Register"
              className="btn btn-primary btn-block mt-2"
            />
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}
