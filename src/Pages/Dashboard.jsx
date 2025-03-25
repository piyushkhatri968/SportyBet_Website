import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 px-4 mt-4 items-center justify-center">
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
    </div>
  );
};

export default Dashboard;
