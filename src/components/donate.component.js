import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { axiosInstance } from "../axiosConfig";

export function DonateComponent() {
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
  const [virusTestResult, setVirusTestResult] = useState([
    "negative",
    "positive",
  ]);
  const [donateData, setDonateData] = useState({
    nationalId: "",
    bloodType: "A+",
    virusTest: "positive",
  });
  const [validationErrors, setValidationErrors] = useState({
    nationalIdError: "",
  });
  useEffect(() => validate(), [donateData]);
  const nationalIdRegex = /^[0-9]{14}$/;
  const validate = () => {
    setValidationErrors({
      nationalIdError: !donateData.nationalId.match(nationalIdRegex)
        ? "please enter a valid national identifier"
        : "",
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    validate();
    if (
      !validationErrors.nationalIdError &&
      !validationErrors.bloodTypeError &&
      !validationErrors.virusTestError
    ) {
      axiosInstance
        .post("/donate", donateData)
        .then((res) => {
          if (res.status == 200) {
            toast.error(
              "Sorry Donation is Rejected, Check your email address for details",
              { theme: "dark" }
            );
          } else if (res.status == 201) {
            toast.success("donation is accepted thanks 👌", { theme: "dark" });
          }
          setDonateData({ name: "", email: "", city: "", nationalId: "" });
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
        className="w-50 mx-auto p-4 rounded my-5"
        style={{ backgroundColor: "#A0A0A0" }}
      >
        <h2 className="text-center mb-4">
          <span className="badge bg-secondary">Donation Form</span>
        </h2>
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <div className="form-outline mb-2">
            <label className="form-label" htmlFor="form5Example1">
              National Id
            </label>
            <input
              type="text"
              id="form5Example1"
              name="nationalId"
              placeholder="enter doner national Id"
              className="form-control"
              value={donateData.nationalId}
              onChange={(e) =>
                setDonateData({ ...donateData, nationalId: e.target.value })
              }
            />
            {donateData.nationalId && (
              <label className="text-danger">
                {validationErrors.nationalIdError}
              </label>
            )}
          </div>
          <div className="form-outline mb-2">
            <label className="form-label" htmlFor="form5Example1">
              Blood Type
            </label>
            <select
              className="form-select"
              value={donateData.bloodType}
              onChange={(e) =>
                setDonateData({ ...donateData, bloodType: e.target.value })
              }
            >
              {bloodTypes.map((bloodType) => (
                <option value={bloodType} key={bloodType}>
                  {bloodType}
                </option>
              ))}
            </select>
            {donateData.bloodType && (
              <label className="text-danger">
                {validationErrors.bloodTypeError}
              </label>
            )}
          </div>
          <div className="form-outline mb-2">
            <label className="form-label" htmlFor="form5Example1">
              Blood Type
            </label>
            <select
              className=" form-select"
              value={donateData.virusTest}
              onChange={(e) =>
                setDonateData({ ...donateData, virusTest: e.target.value })
              }
            >
              {virusTestResult.map((result) => (
                <option key={result} value={result}>
                  {result}
                </option>
              ))}
            </select>
            {donateData.bloodType && (
              <label className="text-danger">
                {validationErrors.bloodTypeError}
              </label>
            )}
          </div>
          <div className="text-center">
            <input
              type="submit"
              value="Register"
              className="btn btn-primary btn-block my-2"
            />
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}
