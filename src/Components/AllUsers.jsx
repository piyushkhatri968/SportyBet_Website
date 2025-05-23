import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegTrashAlt } from "react-icons/fa";
import { backend_URL } from "../config/config";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]); // ✅ FIXED: Initialized as an array
  const [loading, setLoading] = useState(false);

  // Function to format date
  const formatDataTime = (timeStamp) => {
    const date = new Date(timeStamp);
    return `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getFullYear())}`;
  };

  // Fetch Users from Backend
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backend_URL}/admin/getAllUsers`);
        setUsers(response.data.allUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // ✅ Ensures loading state is updated correctly
      }
    };
    getUsers();
  }, []);

  // Delete User Function
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `${backend_URL}/admin/deleteUser/${id}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert(response.data.message);
      setUsers(users.filter((user) => user._id !== id)); // ✅ FIXED: Proper filtering
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting user");
      console.log(error);
    }
  };

  return (
    <>
      <main className="relative flex-1 px-1">
        {/* Header */}
        <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center mt-3 px-1 md:px-3">
          <h2 className="text-xl font-medium md:text-2xl md:font-semibold">
            Registered Users
          </h2>
          <Link
            to="/adduser"
            className="border py-1.5 px-4 rounded-md bg-black text-white cursor-pointer"
          >
            Add User
          </Link>
        </header>

        {/* Table */}
        {loading ? (
          <div className="text-center text-3xl font-semibold">Loading ...</div>
        ) : users.length > 0 ? (
          <div className="mt-6 overflow-auto bg-white rounded-md shadow-lg text-sm sm:text-base">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Username</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Subscription Type</th>
                  <th className="px-4 py-2 text-left">Registered On</th>
                  <th className="px-4 py-2 text-left">Expiry</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user._id}
                    className={(index + 1) % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.username}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">
                      {user.subscription} : (2 Weeks)
                    </td>
                    <td className="px-4 py-2">
                      {formatDataTime(user.createdAt)}
                    </td>
                    <td className="px-4 py-2">{formatDataTime(user.expiry)}</td>
                    <td
                      className={`px-4 py-2 ${
                        user.accountStatus === "Active"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {user.accountStatus}
                    </td>
                    <td className="px-4 py-2">
                      <FaRegTrashAlt
                        className="text-red-600 cursor-pointer"
                        onClick={() => deleteUser(user._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h3 className="text-xl mt-5 font-medium">
            No registered users found in the library.
          </h3>
        )}
      </main>
    </>
  );
};

export default Users;
