import React, { useState } from "react";
import "./LoginForm.css";

function LoginForm() {
  const [showPass, setShowPass] = useState(false);

  return (
    <>
      <div>
        <input type="email" placeholder="Email" className="login-input" />
      </div>

      <div>
        <input
          type={showPass ? "Text" : "password"}
          placeholder="Password"
          className="login-input"
        />
        <button
          className="show-btn"
          onClick={() => setShowPass((prev) => !prev)}
        >
          {showPass ? "Hide" : "Show"}
        </button>
      </div>

      <button className="login-button">Login</button>
      <button className="login-button">Sign up</button>
    </>
  );
}

export default LoginForm;
