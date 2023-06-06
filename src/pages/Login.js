import React, { useState } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
const Login = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [userType, setUserType] = useState("CUSTOMER");
  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };
  const myStyle = {
    backgroundColor: "#8fc4b7",
    color: "white",
    fontSize: "16px",
  };
  const handleSelect = (e) => {
        setUserType(e)
  }
  return (
    <div
      style={myStyle}
      className="vh-100 d-flex justify-content-center align-items-center"
    >
      <div className="card p-3 rounded-4 shadow-lg" style={{ width: "20rem" }}>
        <h4 className="text-center text-success">
          {showSignUp ? "Sign Up" : "Log In"}
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control m-1"
              placeholder="User ID"
            />
          </div>
          {showSignUp && (
            <>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control m-1"
                  placeholder="Username"
                />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control m-1"
                  placeholder="Email"
                />
              </div>
              <div className="d-flex justify-content-center align-items-center ">
                <div
                  className="card p-1 rounded-3 shadow-lg"
                  style={{ width: "18rem", height: "3rem" }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="m-0">User Type</span>
                    <DropdownButton
                      align="end"
                      title={userType}
                      id="userType"
                      variant="success"
                      onSelect={handleSelect}
                    >
                      <Dropdown.Item eventKey="CUSTOMER">
                        CUSTOMER
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="ENGINEER">
                        ENGINEER
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="inpput-group">
            <input
              type="password"
              className="form-control m-1"
              placeholder="Password"
            />
          </div>
          <div className="input-group">
            <input
              type="submit"
              className="btn btn-success form-control rounded-3 m-1 text-white"
              value={showSignUp ? "Sign Up" : "Log In"}
            />
          </div>
          <div
            className="m-1 text-center text-success"
            onClick={toggleSignUp}
            style={{ cursor: "pointer" }}
          >
            {showSignUp
              ? "Already have an account? Log In"
              : "Don't have an account? Sign Up"}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
