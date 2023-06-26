import React from 'react'
import {CircularProgressbar,buildStyles} from "react-circular-progressbar"


const Cards = ({color,title,icon,ticketCount,pathColor}) => {
  return (
    <div className="col-xs-11 col-lg-3 col-md-6 my-1">
    <div
      className={`card shadow bg-${color} bg-opacity-50 text-center`}
      style={{ width: 15 + "rem" }}
    >
      <h5 className={`card-subtitle my-2 fw-bolder text-${color}`}>
        <i className={`bi bi-${icon} text-${pathColor} mx-2`}></i>
        {title}
      </h5>
      <hr />
      <div className="row mb-2 d-flex align-items-center">
        <div className={`col text-${color} mx-4 fw-bolder display-6`}>
          {ticketCount}
        </div>
        <div className="col">
          {/* Size of circular bar */}
          <div style={{ width: 40, height: 40 }}>
            {/* How to use ? 
                Import from top
                value={the count of tickets}
                buildStyles({}) : a function that accepts obj. Obj takes css styles in key value format. Colors can be accepted in hex, rgpa, and text names
              */}
            <CircularProgressbar
              value={ticketCount}
              styles={buildStyles({
                pathColor: `${pathColor}`,
              })}
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  )
}

export default Cards