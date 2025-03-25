import React, { useEffect, useState } from "react";
import axios from "axios";
import { backend_URL } from "../config/config";
import { Link } from "react-router-dom";
import { MdOutlineSyncDisabled } from "react-icons/md";

const ActiveUsers = () => {
  const [disableModelOpen, setDisableModelOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userID, setUserID] = useState("");

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
        const response = await axios.get(
          `${backend_URL}/admin/getAllUsersByStatus`
        );
        setUsers(response.data.allActiveUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleDisableModel = (userId) => {
    setDisableModelOpen(true);
    setUserID(userId);
  };

  const handleDisableUser = async (id) => {
    try {
      const response = await axios.put(
        `${backend_URL}/admin/updateUserAccountStatus/${id}`
      );
      alert(response.data.message);
      setUsers(users.filter((user) => user._id !== id));
      setDisableModelOpen(false);
    } catch (error) {
      alert(error.response?.data?.message || "Error in disabling user");
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
                    <td className={`px-4 py-2 ${
                        user.accountStatus === "Active"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}>{user.accountStatus}</td>
                    <td className="px-4 py-2">
                      <MdOutlineSyncDisabled
                        size={24}
                        className="text-blue-600 cursor-pointer"
                        onClick={() => handleDisableModel(user._id)}
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

      {/* Delete Confirmation Modal */}
      {disableModelOpen && (
        <div
          className="fixed inset-0 p-5 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <div className="w-full bg-white rounded-lg shadow-lg md:w-1/3 p-6 h-64 flex flex-col items-center justify-center text-center">
            <h2 className="text-xl font-semibold">
              Are you sure you want to disable this user?
            </h2>
            <div className="flex gap-4 mt-4 items-center justify-center">
              <button
                onClick={() => setDisableModelOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-md cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDisableUser(userID)}
                className="bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActiveUsers;
