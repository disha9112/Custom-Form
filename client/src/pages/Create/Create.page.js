import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Create.styles.css";

function Create() {
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

  async function signUpSubmit(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:8000/auth/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        status,
      }),
    });

    const data = await response.json();

    if (data.userExists === true) {
      alert("Given credentials already exist in the database, kindly log in");
    } else {
      if (data.token) {
        alert("Given credentials have been signed up successfully");
        localStorage.setItem("token", data.token);
        navigate("/users");
      } else {
        alert("Please check the data entered");
      }
    }
  }

  return (
    <div className="form-body">
      <div className="form-title">Create</div>
      <form onSubmit={signUpSubmit}>
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
    </div>
  );
}

export default Create;
