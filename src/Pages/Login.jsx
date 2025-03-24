import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { backend_URL } from "../config/config.js";
import { useAuth } from "../Context/AuthContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [signinLoading, setSigninLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!formData.email || !formData.password) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      setSigninLoading(true);
      const response = await axios.post(
        `${backend_URL}/admin/login`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setError(null);
      setSuccessMessage(response.data.message);
      login(response.data.token);
      // setTimeout(() => {
      //   navigate("/");
      // }, 500);
    } catch (error) {
      setSuccessMessage(null);
      setError(
        error.response?.data?.message || "An error occurred during signin."
      );
    } finally {
      setSigninLoading(false);
    }
  };
  return (
    <div className="w-full h-screen bg-[#F3F4F6] flex flex-col gap-6 justify-center items-center ">
      <Link to="/" className="flex items-center justify-center gap-2">
        <p className="text-2xl font-bold">SportyBat Admin Dashboard</p>
      </Link>
      <form
        className="bg-white p-[2rem] w-full max-w-lg rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col justify-center items-start gap-1 w-full max-w-lg mt-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            onChange={handleFormChange}
            value={formData.email}
            className="border border-gray-300 focus:outline-blue-600 p-2 rounded-md w-full max-w-lg"
          />
        </div>
        <div className="flex flex-col justify-center items-start gap-1 w-full max-w-lg mt-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            onChange={handleFormChange}
            value={formData.password}
            className="border border-gray-300 focus:outline-blue-600 p-2 rounded-md w-full max-w-lg"
          />
        </div>

        <div className="flex justify-end items-center gap-3 mt-3">
          <button
            type="submit"
            className="cursor-pointer bg-[#1F2937] rounded-lg text-white pt-2 pb-2 pl-4 pr-4 text-sm font-semibold"
          >
            {signinLoading ? "Loading ..." : "Login"}
          </button>
        </div>
        {error && (
          <div className="text-red-600 mt-3 bg-red-100 p-2 rounded-md text-center">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="text-green-600 mt-3 bg-green-100 p-2 rounded-md text-center">
            {successMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
