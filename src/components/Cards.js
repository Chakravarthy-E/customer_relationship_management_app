import React from 'react'
import {CircularProgressbar,buildStyles} from "react-circular-progressbar"


const Cards = () => {
  return (
    <div className="row ms-5 ps-5 mb-3">
    {/** 1 */}
    <div className="col-xs-12 col-lg-3 col-md-6">
      <div
        className="card shadow bg-primary bg-opacity-75 text-center"
        style={{ width: "15rem" }}
      >
        <h5 className="card-subtitl fw-bolder my-2 text-light">
          <i className="bi bi-envelope-open text-white mx-2">Open</i>
        </h5>
        <hr />
        <div className="row mb-1 d-flex align-items-center">
          <div className="col text-light mx-4 fw-bolder display-6">15</div>
          <div className="col">
            <div style={{ width: 40, height: 40 }}>
              <CircularProgressbar
                value={15}
                styles={buildStyles({ pathColor: "darkblue" })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/** 2 */}
    <div className="col-xs-12 col-lg-3 col-md-6">
      <div
        className="card shadow bg-warning bg-opacity-75 text-center"
        style={{ width: "15rem" }}
      >
        <h5 className="card-subtitle fw-bolder my-2 text-light">
          <i className="bi bi-hourglass-split text-white mx-2">Progress</i>
        </h5>
        <hr />
        <div className="row mb-1  d-flex align-items-center">
          <div className="col text-white mx-4 fw-bolder display-6">22</div>
          <div className="col">
            <div style={{ width: 40, height: 40 }}>
              <CircularProgressbar
                value={22}
                styles={buildStyles({ pathColor: "brown" })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/** 3 */}

    <div className="col-xs-12 col-lg-3 col-md-6">
      <div
        className="card shadow bg-success bg-opacity-75 text-center"
        style={{ width: "15rem" }}
      >
        <h5 className="card-subtitle fw-bolder my-2 text-light">
          <i className="bi bi-check-circle-fill text-white mx-2">Closed</i>
        </h5>
        <hr />
        <div className="row mb-1  d-flex align-items-center">
          <div className="col text-white mx-4 fw-bolder display-6">79</div>
          <div className="col">
            <div style={{ width: 40, height: 40 }}>
              <CircularProgressbar
                value={79}
                styles={buildStyles({ pathColor: "darkgreen" })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/** 4 */}
    <div className="col-xs-12 col-lg-3 col-md-6">
      <div
        className="card shadow bg-secondary bg-opacity-75 text-center"
        style={{ width: "15rem" }}
      >
        <h5 className="card-subtitle fw-bolder my-2 text-light">
          <i className="bi bi-slash-circle text-white mx-2">Blocked</i>
        </h5>
        <hr />
        <div className="row mb-1  d-flex align-items-center">
          <div className="col text-white mx-4 fw-bolder display-6">10</div>
          <div className="col">
            <div style={{ width: 40, height: 40 }}>
              <CircularProgressbar
                value={10}
                styles={buildStyles({ pathColor: "black" })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/**w end */}
  </div>

  )
}

export default Cards