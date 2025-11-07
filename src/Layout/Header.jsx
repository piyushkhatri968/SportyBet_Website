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
    <header className="flex items-center justify-between w-full p-4 sm:p-5 md:px-8 lg:px-12 backdrop-blur-xl bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 shadow-lg border-b border-white/10 sticky top-0 z-50 transition-all duration-300">
      <Link 
        to="/" 
        className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] hover:bg-[length:100%_auto] transition-all duration-500 hover:scale-105"
      >
        SportyBet
      </Link>
      {!authUser ? null : (
        <button
          className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white text-sm sm:text-base font-semibold shadow-lg hover:shadow-red-500/25 transform hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden group"
          onClick={() => handleLogout()}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="hidden sm:inline relative z-10">Logout</span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        </button>
      )}
    </header>
  );
};

export default Header;
