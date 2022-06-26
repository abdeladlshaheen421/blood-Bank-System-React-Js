import React from "react";
import { Link } from "react-router-dom";
export function NavComponent() {
  return (
    <>
      <nav
        className="navbar  navbar-expand-lg rounded"
        style={{ backgroundColor: " #1F2322" }}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">
              <span className="badge bg-danger fs-5">Blood Bank</span>
            </Link>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item mx-4">
                <Link className="nav-link text-light rounded" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item mx-4">
                <Link className="nav-link text-white rounded" to="/donate">
                  Donate
                </Link>
              </li>
              <li className="nav-item mx-4">
                <Link className="nav-link  text-white rounded" to="/register">
                  Register Doner
                </Link>
              </li>
              <li className="nav-item mx-4">
                <Link className="nav-link text-white rounded" to="/request">
                  Request Blood
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
