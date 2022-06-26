import React from "react";
export function HomeComponent() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <div
          id="carouselExampleDark"
          className="carousel carousel-dark slide w-75 my-4"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="3"
              aria-label="Slide 4"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="10000">
              <img
                src="../img1.jpg"
                className="d-block w-75 mx-auto rounded"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block bg-dark w-50 mx-auto opacity-75 text-white rounded">
                <h5>Blood bank management</h5>
                <p>
                  Blood bank management is the most important part between doner
                  and patient.
                </p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img
                src="../img2.jpg"
                className="d-block w-75 mx-auto rounded"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block bg-dark w-50 mx-auto opacity-75 text-white rounded">
                <h5>The Doner</h5>
                <p>The important part of the system which is helpful .</p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="../img3.jpg"
                className="d-block w-75 mx-auto rounded"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block bg-dark w-50 mx-auto opacity-75 text-white rounded">
                <h5>Blood Stock</h5>
                <p>
                  we safe blood in safe place with special treatment and special
                  pressure and temperature.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="../img4.png"
                className="d-block w-75 mx-auto rounded"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block bg-dark w-50 mx-auto opacity-75 text-white rounded">
                <h5>The Patient</h5>
                <p>
                  Last part of the system which hospitals ask blood for patient
                  to make him a life.
                </p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
}
