import React from "react";
import { useNavigate } from "react-router-dom";
import { pagenotfound } from "../static";
const NotFound = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-light vh-100 d-flex justify-content-center align-items-center text-center">
      <div>
        <h1 className="mb-4">Not Found</h1>
        <img src={pagenotfound} alt="page not fumd" />
        <p className="lead fw-bolder mt-5">Hmmm.... The page you are looking for does not exit</p>
        <button className="btn text-white m-1 p-2" onClick={goBack} style={{backgroundColor:"#6C63FF"}}>
          Go back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
