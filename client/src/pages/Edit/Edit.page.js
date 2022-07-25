import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Edit.styles.css";

function Edit() {
  const navigate = useNavigate();

  const { id } = useParams();

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

  async function userDetails(id) {
    const response = await fetch(`http://localhost:8000/users/getUser/${id}`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await response.json();

    if (data.user) {
      setName(data.user.name);
      setEmail(data.user.email);
      setStatus(data.user.status);
    } else {
      alert("An error was encountered, please try again");
    }
  }

  async function updateUser(event) {
    event.preventDefault();

    const response = await fetch(
      `http://localhost:8000/users/updateUser/${id}`,
      {
        method: "PUT",
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

    if (data.message) {
      alert("User credentials have been updated successfully");
      navigate("/users");
    } else {
      alert("An error was encountered, please try again");
    }
  }

  useEffect(() => {
    userDetails(id);
  }, []);

  return (
    <div className="form-body">
      <div className="form-title">Edit</div>
      <form onSubmit={updateUser}>
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
        <button>EDIT</button>
      </form>
    </div>
  );
}

export default Edit;
