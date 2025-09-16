import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { backend_URL } from "../config/config";

const Header = () => {
  const { setAuthUser, authUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${backend_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      setAuthUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };

  return (
    <div className="flex items-center justify-between w-sm sm:w-full p-2 px-4 md:px-40 border-b border-gray-300">
      <Link to="/" className="text-xl md:text-3xl font-medium">
        SportyBet
      </Link>
      {!authUser ? null : (
        <button
          className="border py-1.5 px-4 rounded-md bg-black text-white cursor-pointer"
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Header;
