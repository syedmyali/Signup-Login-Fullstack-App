import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteUser, getUsers } from "../service/UserService";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users data when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const response = await getUsers(token);
      console.log(response);
      setUsers(response.appUserList); // Assuming the list of users is under the key 'usersList'
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUserById = async (userId) => {
    try {
      // Prompt for confirmation before deleting the user
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );

      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      if (confirmDelete) {
        await deleteUser(userId, token);
        // After deleting the user, fetch the updated list of users
        fetchUsers();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <div className="user-management-container">
      <h2>Admin Dashboard</h2>

      <Link className="btn btn-primary mt-5 mb-3 btn-md w-25" to="/register">
        Add User
      </Link>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Link className="btn btn-info btn-md me-1" to={"/profile"}>
                  View
                </Link>

                <Link
                  className="btn btn-success btn-md me-1"
                  to={`/update/${user.id}`}
                >
                  Update
                </Link>

                <button
                  className=" btn btn-md btn-danger"
                  onClick={() => deleteUserById(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
