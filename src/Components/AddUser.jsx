import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backend_URL } from "../config/config";

const AddUser = () => {
  const navigate = useNavigate();
  const [addUserSuccessMessage, setAddUserSuccessMessage] = useState(null);
  const [addUserErrorMessage, setAddUserErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    mobileNumber: "",
    expiryDate: "",
    expiryPeriod: "",
    subscription: "Basic",
    role: "user",
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      setAddUserErrorMessage(null);
      setAddUserSuccessMessage(null);
      setLoading(true);

      const now = new Date();
      const daysToAdd = parseInt(formData.expiryDate);
      const expiryDateISO = new Date(now.setDate(now.getDate() + daysToAdd)).toISOString();

      const payload = {
        ...formData,
        expiryDate: expiryDateISO,
        expiryPeriod: formData.expiryDate
      };

      const res = await axios.post(`${backend_URL}/register`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      setAddUserSuccessMessage(res.data.message);
      setLoading(false);
      setTimeout(() => navigate("/users"), 1000);
    } catch (error) {
      setAddUserSuccessMessage(null);
      setAddUserErrorMessage(
        error.response?.data?.message || "Unknown error occurred."
      );
      setLoading(false);
    }
  };


  return (
    <div className="p-5 flex items-center justify-center">
      <div className="w-full bg-white rounded-lg shadow-lg sm:w-sm md:w-md lg:w-lg xl:w-xl">
        <div className="p-6">
          <header className="flex justify-between items-center mb-2 pb-5 border-b-[1px] border-black">
            <h3 className="text-xl font-bold">Add New User</h3>
          </header>

          {addUserErrorMessage && (
            <div className="my-2 w-full bg-red-100 py-1 text-center rounded-md text-red-600 border border-red-200">
              {addUserErrorMessage}
            </div>
          )}
          {addUserSuccessMessage && (
            <div className="my-2 w-full bg-green-100 py-1 text-center rounded-md text-green-600 border border-green-200">
              {addUserSuccessMessage}
            </div>
          )}

          <form onSubmit={handleAddUser}>
            <div className="mb-4">
              <label className="block text-gray-900 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChangeInput}
                placeholder="User's Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChangeInput}
                placeholder="User's Username"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChangeInput}
                placeholder="User's Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 font-medium">Mobile Number</label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChangeInput}
                placeholder="User's Mobile"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChangeInput}
                placeholder="User's Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 font-medium">Subscription Type</label>
              <select
                name="subscription"
                value={formData.subscription}
                onChange={handleChangeInput}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 font-medium">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChangeInput}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 font-medium">Expiry</label>
              <select
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChangeInput}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Expiry</option>
                <option value={14}>2 Weeks</option>
                <option value={30}>1 Month</option>
                <option value={60}>2 Months</option>
                <option value={90}>3 Months</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                {loading ? "Adding..." : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
