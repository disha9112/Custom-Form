import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import "./Users.styles.css";

function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    const response = await fetch(
      "https://custom-form-live.herokuapp.com/users/getUsers",
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const data = await response.json();

    if (data.users) {
      setUsers(data.users);
    } else {
      alert("Error retrieving notes");
    }
  }

  async function deleteUser(id) {
    const response = await fetch(
      `https://custom-form-live.herokuapp.com/users/deleteUser/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (data.message) {
      alert("User credentials have been deleted successfully");
      fetchUsers();
    } else {
      alert("An error was encountered, please try again");
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } else {
      fetchUsers();
    }
  }, []);

  if (!users.length) {
    return <div className="users-body">Loading...</div>;
  } else {
    return (
      <div className="users-body">
        <h2>Users Data</h2>
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Account status</th>
            <th></th>
          </tr>
          {users.map((user, i) => {
            return (
              <tr key={i}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </td>
                <td className="table-icons">
                  <FaTrash onClick={() => deleteUser(user.id)} />
                  <Link className="link" to={`/edit/${user.id}`}>
                    <FaEdit />
                  </Link>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}

export default Users;
