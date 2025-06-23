import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegTrashAlt } from "react-icons/fa";
import { backend_URL } from "../config/config";
import { Link } from "react-router-dom";

const Users = () => {
  const [deleteModelOpen, setDeleteModelOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userID, setUserID] = useState("");

  const formatDataTime = (timeStamp) => {
    const date = new Date(timeStamp);
    return `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getFullYear())}`;
  };

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backend_URL}/admin/getAllUsers`);
        setUsers(response.data.allUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleDeleteModel = (userId) => {
    setUserID(userId);
    setDeleteModelOpen(true);
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `${backend_URL}/admin/deleteUser/${id}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert(response.data.message);
      setUsers(users.filter((user) => user._id !== id));
      setDeleteModelOpen(false);
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting user");
    }
  };

  const toggleUserStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Hold" : "Active";
    const confirmMessage =
      currentStatus === "Active"
        ? "Are you sure you want to deactivate this user?"
        : "Are you sure you want to activate this user again?";

    if (!window.confirm(confirmMessage)) return;

    try {
      const response = await axios.patch(
        `${backend_URL}/update-status/${id}`,
        { status: newStatus },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert(response.data.message);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, accountStatus: newStatus } : user
        )
      );
    } catch (error) {
      alert(error.response?.data?.error || "Error updating user status");
    }
  };

  return (
    <>
      <main className="relative flex-1 px-1">
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
                  <th>Addons</th>
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
                    <td>
                      <Link
                        to={`/user-addons/${user._id}`}
                        className="flex items-center gap-1 text-white bg-[#333] hover:bg-black px-2 py-1 rounded text-xs"
                        title="Manage Addons"
                      >
                        Addons
                      </Link>
                    </td>
                    <td className="px-4 py-2">
                      {formatDataTime(user.createdAt)}
                    </td>
                    <td className="px-4 py-2">
                      {formatDataTime(user.expiry)}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() =>
                          toggleUserStatus(user._id, user.accountStatus)
                        }
                        className={`px-2 py-1 rounded-md text-xs font-semibold ${
                          user.accountStatus === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.accountStatus === "Active" ?"Active": "Deactive"}
                      </button>
                    </td>
                    <td className="px-4 py-2 flex gap-3 items-center">
                      <FaRegTrashAlt
                        title="Delete User"
                        className="text-red-600 cursor-pointer hover:scale-110"
                        onClick={() => handleDeleteModel(user._id)}
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

      {deleteModelOpen && (
        <div
          className="fixed inset-0 p-5 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <div className="w-full bg-white rounded-lg shadow-lg md:w-1/3 p-6 h-64 flex flex-col items-center justify-center text-center">
            <h2 className="text-xl font-semibold">
              Are you sure you want to delete this user?
            </h2>
            <div className="flex gap-4 mt-4 items-center justify-center">
              <button
                onClick={() => setDeleteModelOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-md cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteUser(userID)}
                className="bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
