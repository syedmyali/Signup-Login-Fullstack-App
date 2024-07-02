import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../service/UserService";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        appUserList: [formData],
      };
      //call signup function
      const token = localStorage.getItem("token");

      await register(requestData, token);
      //clear the form fields

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "",
      });
      alert("User registered successfully");
      navigate("/login");
    } catch (error) {
      console.log("Error registering user", error);
      alert("An error occurred while registering user");
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <form
        style={{ backgroundColor: "#777" }}
        className="col-5 col-offset-3 box shadow text-white p-4 rounded"
        onSubmit={handleSubmit}
      >
        <h2>Register Here..</h2>
        <div className="form-group ">
          <label htmlFor="">Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Email: </label>
          <input
            type="email"
            value={formData.email}
            name="email"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Password: </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="">Role: </label>

          <select
            className="form-select"
            name="role"
            value={formData.role}
            aria-label="Default select example"
            onChange={handleInputChange}
          >
            <option value="">Select Role</option>
            <option value={"USER"}>USER</option>
            <option value={"ADMIN"}>ADMIN</option>
          </select>

          {/* <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          /> */}
        </div>
        <button
          to={"/login"}
          className="btn mb-3 bg-primary w-100 text-white"
          type="submit"
        >
          Register
        </button>
        <b>Are you already registered!</b>
        <Link to={"/login"} className="btn bg-success  text-white w-100 mt-1">
          Login
        </Link>
      </form>
    </div>
  );
}
