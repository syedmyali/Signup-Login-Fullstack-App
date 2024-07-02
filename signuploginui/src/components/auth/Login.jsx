import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../service/UserService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(email, password);

      if (userData.token) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);
        if (userData.role === "ADMIN") {
          navigate("/admin/dashboard");
        } else if (userData.role === "USER") {
          navigate("/user/dashboard");
        } else {
          navigate("/profile");
        }
      } else {
        setError(userData.error);
      }
    } catch (error) {
      console.log(error);
      setError(error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      {error && <p className="error-message">{error}</p>}
      <form
        style={{ backgroundColor: "#777" }}
        className="col-5 col-offset-3 box text-white shadow p-4 rounded"
        onSubmit={handleSubmit}
      >
        <h2>Login </h2>
        <div className="form-group">
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="btn bg-primary p-2 me-2 text-white mb-2 w-100"
          type="submit"
        >
          Login
        </button>
        <b>Are you not registered yet!</b>
        <Link
          to={"/register"}
          className="btn mt-1 w-100 bg-success p-2 text-white"
        >
          Signup
        </Link>
      </form>
    </div>
  );
}
