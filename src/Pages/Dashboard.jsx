import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 mt-4 md:px-6">
      <Link
        to="/users"
        className="bg-black w-full text-white py-3 px-4 rounded-md text-xl font-semibold text-center"
      >
        Users
      </Link>
      <Link
        to="/activeUsers"
        className="bg-black w-full text-white py-3 px-4 rounded-md text-xl font-semibold text-center"
      >
        Active Users
      </Link>
      <Link
        to="/disableUsers"
        className="bg-black w-full text-white py-3 px-4 rounded-md text-xl font-semibold text-center"
      >
        Disable Users
      </Link>
      <Link
        to="/adduser"
        className="bg-black w-full text-white py-3 px-4 rounded-md text-xl font-semibold text-center"
      >
        Add User
      </Link>
      <Link
        to="/expiredUsers"
        className="bg-black w-full text-white py-3 px-4 rounded-md text-xl font-semibold text-center"
      >
        Expired User
      </Link>
      <Link
        to="/IOSHomeScreen"
        className="bg-black w-full text-white py-3 px-4 rounded-md text-xl font-semibold text-center"
      >
        Update Home Screen
      </Link>
      <Link
        to="/match-uploaded"
        className="bg-black w-full text-white py-3 px-4 rounded-md text-xl font-semibold text-center"
      >
        Match Uploaded
      </Link>
    </div>
  );
};

export default Dashboard;
