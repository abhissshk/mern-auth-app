import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utlis";

function Singup() {
  const [signupInfo, setsignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    address: "",
  });

  const navigate=useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copysignupInfo = { ...signupInfo };
    copysignupInfo[name] = value;
    setsignupInfo(copysignupInfo);
  };

  const handleSignup = async (e) => {
  e.preventDefault();

  const { name, email, password, confirmpassword, address } = signupInfo;

  if (!name || !email || !password || !confirmpassword || !address) {
    return handleError("All field is required");
  }

  try {
const response = await fetch(
  "https://mern-auth-app-oj1e.onrender.com/api/signup",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(signupInfo)
  }
);
    const result = await response.json();
    const { success, message, error } = result;

    if (success) {
      handleSuccess(message);
      setTimeout(() => navigate("/login"), 1000);

    } else if (error) {
      const details = error?.details?.[0]?.message;
      handleError(details);

    } else {
      handleError(message);
    }

    console.log(result);

  } catch (error) {
    handleError(error.message);
    console.log(error);
  }
};

  return (
    <>
      <div className="container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignup}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              autoFocus
              placeholder="Enter your name"
              value={signupInfo.name}
            />
          </div>

          <div>
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              name="email"
              id=""
              onChange={handleChange}
              autoFocus
              placeholder="Enter your email"
              value={signupInfo.email}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              id=""
              onChange={handleChange}
              autoFocus
              placeholder="Enter your password"
              value={signupInfo.password}
            />
          </div>

          <div>
            <label htmlFor="confirmpassword">Confirm-password</label>
            <input
              type="text"
              name="confirmpassword"
              id=""
              onChange={handleChange}
              autoFocus
              placeholder="Enter your Confirmpassword"
              value={signupInfo.confirmpassword}
            />
          </div>

          <div>
            <label htmlFor="name">Address</label>
            <input
              type="text"
              name="address"
              id=""
              onChange={handleChange}
              autoFocus
              placeholder="Enter your Address"
              value={signupInfo.address}
            />
          </div>

          <button type="submit">Signup</button>
          <span>
            Already have an account ?<Link to="/login">Login</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default Singup;
