import React, { useState, useEffect } from "react";
import { axiosInstance } from "../axiosConfig";
import { ToastContainer, toast } from "react-toastify";
export function RegisterComponent() {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    city: "",
    nationalId: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    nameError: "",
    emailError: "",
    cityError: "",
    nationalIdError: "",
  });
  useEffect(() => validate(), [registerData]);
  const nameRegex = /^[a-zA-Z ]{3,}$/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const nationalIdRegex = /^[0-9]{14}$/;
  const validate = () => {
    setValidationErrors({
      nameError: !registerData.name.match(nameRegex)
        ? "please enter a valid name"
        : "",
      emailError: !registerData.email.match(emailRegex)
        ? "please enter a valid email"
        : "",
      cityError: !registerData.city.match(nameRegex)
        ? "please enter a valid city name"
        : "",
      nationalIdError: !registerData.nationalId.match(nationalIdRegex)
        ? "please enter a valid national id"
        : "",
    });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    validate();
    if (
      !validationErrors.nameError &&
      !validationErrors.emailError &&
      !validationErrors.cityError &&
      !validationErrors.nationalIdError
    ) {
      axiosInstance
        .post("/register", registerData)
        .then((res) => {
          toast.success("doner created successfully 👌", { theme: "dark" });
          setRegisterData({ name: "", email: "", city: "", nationalId: "" });
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
    <div
      className="w-50 mx-auto p-4 rounded my-3"
      style={{ backgroundColor: "#A0A0A0" }}
    >
      <h2 className="text-center mb-4">
        <span className="badge bg-dark">Register a new doner</span>
      </h2>
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <div className="form-outline mb-2">
          <label className="form-label" htmlFor="form5Example1">
            Name
          </label>
          <input
            type="text"
            id="form5Example1"
            placeholder="enter doner name"
            name="name"
            className="form-control"
            value={registerData.name}
            onChange={(e) => {
              setRegisterData({ ...registerData, name: e.target.value });
            }}
          />
          {registerData.name && (
            <label className="text-danger">{validationErrors.nameError}</label>
          )}
        </div>

        <div className="form-outline mb-2">
          <label className="form-label" htmlFor="form5Example2">
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="form5Example2"
            placeholder="enter doner email"
            className="form-control"
            value={registerData.email}
            onChange={(e) => {
              setRegisterData({ ...registerData, email: e.target.value });
            }}
          />
          {registerData.email && (
            <label className="text-danger">{validationErrors.emailError}</label>
          )}
        </div>
        <div className="form-outline mb-2">
          <label className="form-label" htmlFor="form5Example1">
            City
          </label>
          <input
            type="text"
            name="city"
            id="form5Example1"
            placeholder="enter doner city name"
            className="form-control"
            value={registerData.city}
            onChange={(e) => {
              setRegisterData({ ...registerData, city: e.target.value });
            }}
          />
          {registerData.city && (
            <label className="text-danger">{validationErrors.cityError}</label>
          )}
        </div>
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
            value={registerData.nationalId}
            onChange={(e) =>
              setRegisterData({ ...registerData, nationalId: e.target.value })
            }
          />
          {registerData.nationalId && (
            <label className="text-danger">
              {validationErrors.nationalIdError}
            </label>
          )}
        </div>
        <div className="text-center">
          <input
            type="submit"
            value="Register"
            className="btn btn-primary btn-block mb-1"
          />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
