import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Form.styles.css";

function Form() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value.toLowerCase());
  };

  async function logInSubmit(event) {
    event.preventDefault();

    const response = await fetch(
      "https://custom-form-live.herokuapp.com/auth/logIn",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          status,
        }),
      }
    );

    const data = await response.json();

    if (data.userExists === false) {
      alert("Given credentials don't exist in the database, kindly sign up");
    } else {
      if (data.token) {
        alert("Given credentials have been logged in successfully");
        localStorage.setItem("token", data.token);
        navigate("/users");
      } else {
        alert("Please check the data entered");
      }
    }
  }

  return (
    <div className="form-body">
      <div className="form-title">Crud Operations</div>
      <form onSubmit={logInSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        ></input>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        ></input>
        <select id="form-dropdown" value={status} onChange={handleStatusChange}>
          <option value="select">Select Status</option>
          <option value="pending">Pending</option>
          <option value="verified">Verified</option>
        </select>
        <button>SUBMIT</button>
      </form>
      <ul>
        <Link className="link" to="/create">
          <li>Create account</li>
        </Link>
        <li>Forgot password?</li>
      </ul>
    </div>
  );
}

export default Form;
