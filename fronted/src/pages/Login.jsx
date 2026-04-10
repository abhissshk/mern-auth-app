import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utlis";


function Login() {
  const [LoginInfo, setLoginInfo] = useState({

    email: "",
    password: "",

  });

  const navigate=useNavigate()

  const handleChange = (e) => {
  const { name, value } = e.target;

  setLoginInfo((prev) => ({
    ...prev,
    [name]: value
  }));
};



const handleLogin = async (e) => {
  e.preventDefault();

  const { email, password } = LoginInfo;

  if (!email || !password) {
    return handleError("All field is required");
  }

  try {

const url = "https://your-backend.onrender.com/api/login";

const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(LoginInfo)
});

    const result = await response.json();
    const { success, message, error, user, jwtToken } = result;

    if (success) {
      handleSuccess(message);
      localStorage.setItem("token", jwtToken);
      localStorage.setItem("loggedInUser", user?.name);
      setTimeout(() => navigate("/home"), 1000);

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
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          

          <div>
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              name="email"
              id=""
              onChange={handleChange}
              autoFocus
              placeholder="Enter your email"
              value={LoginInfo.email}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id=""
              onChange={handleChange}
              autoFocus
              placeholder="Enter your password"
              value={LoginInfo.password}
            />
          </div>

        

        

          <button type="submit">Login</button>
          <span>
            Does't have an account ?<Link to="/signup">Signup</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
