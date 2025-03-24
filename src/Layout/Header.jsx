import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex items-center justify-between w-sm sm:w-full p-2 px-6 md:px-40 border-b border-gray-300">
      <Link to="/" className="text-xl md:text-3xl font-medium">
        SportyBet
      </Link>
      {!user ? null : (
        <button
          className="border py-1.5 px-4 rounded-md bg-black text-white cursor-pointer"
          onClick={() => logout()}
        >
          logout
        </button>
      )}
    </div>
  );
};

export default Header;
