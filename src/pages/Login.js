import React, { useState } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { userSignIn } from "../api/auth";

/**
 * Post API
 * 1.grab the data
 * 2.store the data
 * 3.call the api
 */
const Login = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [userType, setUserType] = useState("CUSTOMER");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  const updateSignUpData = (e) => {
    if (e.target.id === "userid") {
      setUserId(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    }
  };

  const signupFn = () => {
    console.log("sign up btn triggered");
  };
  const loginFn = (e) => {
    e.preventDefault();
    const data = {
      userId: userId,
      password: password,
    };

    userSignIn(data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const myStyle = {
    backgroundColor: "light",
    color: "white",
    fontSize: "16px",
  };
  const handleSelect = (e) => {
    setUserType(e);
  };
  return (
    <div
      style={myStyle}
      className="vh-100 d-flex justify-content-center align-items-center"
    >
      <div className="card p-3 rounded-4 shadow-lg" style={{ width: "20rem" }}>
        <h4 className="text-center">{showSignUp ? "Sign Up" : "Log In"}</h4>
        <form onSubmit={showSignUp ? signupFn : loginFn}>
          <div className="input-group">
            <input
              type="text"
              className="form-control m-1"
              placeholder="User ID"
              value={userId}
              onChange={updateSignUpData}
              id="userid"
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
                      variant="light"
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
              value={password}
              onChange={updateSignUpData}
              id="password"
            />
          </div>
          <div className="input-group">
            <input
              type="submit"
              className="btn form-control rounded-3 m-1 text-white"
              style={{ backgroundColor: "#6C63FF" }}
              value={showSignUp ? "Sign Up" : "Log In"}
            />
          </div>
          <div
            className="m-1 text-center"
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
