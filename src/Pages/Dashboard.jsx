import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex items-center justify-center w-full py-2 px-4">
      <Link to="/users" className="bg-black w-full text-white py-3 px-4 rounded-md text-xl font-semibold text-center">
        Users
      </Link>
    </div>
  );
};

export default Dashboard;
