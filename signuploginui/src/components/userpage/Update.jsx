import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../service/UserService";
import { Link } from "react-router-dom";

export default function Update() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    fetchUserDataById(userId); // Pass the userId to fetchUserDataById
  }, [userId]); //wheen ever there is a chane in userId, run this

  const fetchUserDataById = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await getUserById(userId, token); // Pass userId to getUserById
      console.log("API response:", response);
      const { name, email, role } = response.appUserList[0];
      setUserData({ name, email, role });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const confirmUpdate = window.confirm(
        "Are you sure you want to update this user?"
      );
      if (confirmUpdate) {
        const token = localStorage.getItem("token");
        const res = await updateUser(userId, userData, token);
        console.log(res);
        // Redirect to profile page or display a success message
        navigate("/admin/user-management");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      alert(error);
    }
  };
  return (
    <div className="container d-flex justify-content-center mt-5">
      <form
        className="col-5 col-offset-3 box shadow p-4 rounded"
        onSubmit={handleSubmit}
      >
        <h2>Update User</h2>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={userData.role}
            onChange={handleInputChange}
          />
        </div>
        <Link
          to={"/admin/dashboard"}
          className="btn btn-primary w-100"
          type="submit"
        >
          Update
        </Link>
      </form>
    </div>
  );
}
