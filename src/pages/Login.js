import React, { useState } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { userSignIn, userSignUp } from "../api/auth";
import { BarLoader } from "react-spinners";
import "../App.css";

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
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  const signupFn = (e) => {
    const data = {
      name: userName,
      userId: userId,
      email: userEmail,
      userType: userType,
      password: password,
    };
    e.preventDefault();
    setIsLoading(true);

    userSignUp(data)
      .then(function (response) {
        if (response.status === 201) {
          setShowSignUp(false);
          setMessage("User Signed Up Successfully...");
          setIsLoading(false);
        }
      })
      .catch(function (error) {
        setMessage(error.response.data.message);
        setIsLoading(false);
      });
  };

  const updateSignupData = (e) => {
    if (e.target.id === "userId") setUserId(e.target.value);
    else if (e.target.id === "password") setPassword(e.target.value);
    else if (e.target.id === "username") setUserName(e.target.value);
    else setUserEmail(e.target.value);
  };

  const loginFn = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      userId: userId,
      password: password,
    };

    userSignIn(data)
      .then((response) => {
        const { status, data } = response;
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("userTypes", response.data.userTypes);
        localStorage.setItem("userStatus", response.data.userStatus);
        localStorage.setItem("token", response.data.accessToken);
        if (response.data.userTypes === "CUSTOMER") navigate("/customer");
        else if (response.data.userTypes === "ENGINEER") navigate("/engineer");
        else if (response.data.userTypes === "ADMIN") navigate("/admin");
        else navigate("/");

        if (status === 200) {
          console.log(data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
        setIsLoading(false);
      });
  };

  const myStyle = {
    backgroundColor: "#000000",
    color: "white",
    fontSize: "16px",
  };
  const handleSelect = (e) => {
    setUserType(e);
  };

  return (
    <div>
      <div id="login" style={myStyle} className="vh-100">
        <div className="context m-1">
          <h1 className="mb-5" style={{ color: "#6C63FF" }}>
            CRM Plus
          </h1>
          <h3>
            The Art of Exceptional
            <br /> Customer Experiences.
            <br /> Powered by CRM.
          </h3>
        </div>
        <div
          className="card p-3 rounded-4 shadow-light"
          style={{ width: "20rem" }}
        >
          <h4 className="text-center">{showSignUp ? "Sign Up" : "Log In"}</h4>
          <form onSubmit={showSignUp ? signupFn : loginFn}>
            <div className="input-group">
              <input
                type="text"
                className="form-control m-1"
                placeholder="User ID"
                value={userId}
                onChange={updateSignupData}
                id="userId"
              />
            </div>
            {showSignUp && (
              <>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control m-1"
                    placeholder="Username"
                    value={userName}
                    onChange={updateSignupData}
                    id="username"
                  />
                </div>
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control m-1"
                    placeholder="Email"
                    value={userEmail}
                    onChange={updateSignupData}
                  />
                </div>

                <div className="d-flex flex-row justify-content-center align-items-center border rounded-md">
                  <span className="mb-2 m-2">User Type</span>
                  <DropdownButton
                    align="end"
                    title={userType}
                    id="userType"
                    variant="light"
                    onSelect={handleSelect}
                  >
                    <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
                    <Dropdown.Item eventKey="ENGINEER">ENGINEER</Dropdown.Item>
                    <Dropdown.Item eventKey="ADMIN">ADMIN</Dropdown.Item>
                  </DropdownButton>
                </div>
              </>
            )}

            <div className="inpput-group">
              <input
                type="password"
                className="form-control m-1"
                placeholder="Password"
                value={password}
                onChange={updateSignupData}
                id="password"
              />
            </div>
            <div className="input-group">
              <button
                type="submit"
                className="btn form-control rounded-3 m-1 text-white"
                style={{
                  backgroundColor: "#6C63FF",
                  position: "relative",
                  width: "120px", // Set a fixed width for the button
                  height: "40px", // Set a fixed height for the button
                }}
                disabled={isLoading} // Disable the button when loading
              >
                {isLoading && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <BarLoader color="#ffffff" loading={true} size={20} />
                  </div>
                )}
                {!isLoading && (showSignUp ? "Sign Up" : "Log In")}
              </button>
            </div>
            <div
              className="m-1 text-center"
              onClick={toggleSignUp}
              style={{ cursor: "pointer", color: "#6C63FF", fontSize: "14px" }}
            >
              {showSignUp
                ? "Already have an account? Log In"
                : "Don't have an account? Sign Up"}
            </div>
            <div className="text-center text-warning">{message}</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
