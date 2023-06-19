import React from "react";
import { useNavigate } from "react-router-dom";
import { access } from "../static";

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-light vh-100 d-flex justify-content-center align-items-center text-center">
      <div>
      <h3 className="mb-4">Access Denied : Unauthorized Page</h3>
        <img src={access} alt="page not fumd" />
        <p className="lead fw-bolder my-3">You do not have access to the requested page.</p>
        <button className="btn btn-danger text-white m-2 p-2" onClick={goBack} style={{backgroundColor:""}}>
          Go back
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
