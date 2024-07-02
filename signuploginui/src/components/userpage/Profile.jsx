/* eslint-disable*/
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { getProfile } from "../service/UserService";

export default function Profile() {
  const [profileInfo, setProfileInfo] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      if (!token) {
        throw new Error("Token not found in localStorage");
      }
      const response = await getProfile(token);
      setProfileInfo(response);
    } catch (error) {
      console.error("Error fetching profile information:", error);
      setError(error.message);
    }
  };
  return (
    // <div className="container d-flex justify-content-center mt-5">
    //   <div className="card p-3">
    //     <h3 className="card-header">Profile Information</h3>
    //     <p>Name: {profileInfo.name}</p>
    //     <p>Email: {profileInfo.email}</p>
    //     <p>Role: {profileInfo.role}</p>
    //   </div>
    // </div>

    <div
      className="card justify-content-center m-auto mt-5"
      style={{ width: "18rem" }}
    >
      <div className="card-header">
        <h3>Profile Information</h3>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <b>Name:</b> {profileInfo.name}
        </li>
        <li className="list-group-item">
          <b>Email:</b> {profileInfo.email}
        </li>
        <li className="list-group-item">
          <b>Role:</b> {profileInfo.role}
        </li>
      </ul>
    </div>
  );
}
