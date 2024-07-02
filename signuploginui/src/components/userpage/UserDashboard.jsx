import { useState, useEffect } from "react";
import { getUsers } from "../service/UserService";

export default function UserDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const response = await getUsers(token);

      setUsers(response.appUserList); // Assuming the list of users is under the key 'usersList'
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="container justify-content-center w-50 mt-5">
      <h2>Users List</h2>

      <table className="mt-5 mb-2">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
