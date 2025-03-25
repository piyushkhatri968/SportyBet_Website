import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegTrashAlt } from "react-icons/fa";
import { backend_URL } from "../config/config";
import { IoCloseOutline } from "react-icons/io5";

const Users = () => {
  const [deleteModelOpen, setDeleteModelOpen] = useState(false);
  const [users, setUsers] = useState({});
  const [addUserModel, setaddUserModel] = useState(false);
  const [loading, setLoading] = useState(false);

  const formatData = (timeStamp) => {
    const date = new Date(timeStamp);
    const formatedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getFullYear())}`;

    const formatedTime = `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

    const result = `${formatedDate} ${formatedTime}`;
    return result;
  };

  useEffect(() => {
    setLoading(true);
    const getUsers = async () => {
      try {
        const response = await axios.get(`${backend_URL}/admin/getAllUsers`);
        setUsers(response.data.allUsers); // Logging actual data, not the Promise
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching users:", error);
      }
    };

    getUsers();
  }, []);

  const [userID, setUserID] = useState("");

  const handleDeleteModel = (userId) => {
    setDeleteModelOpen(true);
    setUserID(userId);
  };

  const deleteUser = async () => {
    try {
      const res = await axios.delete(`${Frontend_URL}/user/delete/${userID}`, {
        withCredentials: true,
      });
      dispatch(fetchAllUsers());
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data.message || "Unknown error occurred.");
      console.log(error);
    }
  };
  return (
    <>
      <main className="relative flex-1 px-1">
        {/* Sub Header */}
        <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <h2 className="text-xl font-medium md:text-2xl md:font-semibold">
            Registered Users
          </h2>
          <div
            className="border py-1.5 px-4 rounded-md bg-black text-white cursor-pointer"
            onClick={() => setaddUserModel(true)}
          >
            Add User
          </div>
        </header>
        {/* Table */}
        {loading ? (
          <div className="text-center text-3xl font-semibold">Loading ...</div>
        ) : (
          <>
            {" "}
            {users && users.length > 0 ? (
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
                        <td className={`px-4 py-2`}>{user.email}</td>

                        <td className="px-4 py-2">{user.subscription}</td>
                        <td className="px-4 py-2">
                          {formatData(user.createdAt)}
                        </td>
                        <td className="px-4 py-2">
                          <FaRegTrashAlt
                            className="text-red-600 cursor-pointer"
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
                No registered users found in library.
              </h3>
            )}
          </>
        )}
      </main>
      {deleteModelOpen && (
        <div
          className="fixed inset-0 p-5 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }} // 50% transparent black
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
                onClick={() => {
                  deleteUser(userID);
                  setDeleteModelOpen(false);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {addUserModel && (
        <div
          className="fixed inset-0 p-5 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <div className="w-full bg-white rounded-lg shadow-lg md:w-1/3">
            <div className="p-6 ">
              <header className="flex justify-between items-center mb-7 pb-5 border-b-[1px] border-black">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold">Add New User</h3>
                </div>
                <IoCloseOutline
                  alt="icon"
                  size={24}
                  onClick={() => setaddUserModel(false)}
                  className="cursor-pointer"
                />
              </header>

              <form>
                <div className="mb-4 ">
                  <label className="block text-gray-900 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    placeholder="User's Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4 ">
                  <label className="block text-gray-900 font-medium">
                    Username
                  </label>
                  <input
                    type="text"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    placeholder="User's Username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4 ">
                  <label className="block text-gray-900 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    placeholder="User's Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-900 font-medium mb-2">
                    Subscription Type
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="subscription"
                        value="basic"
                        className="cursor-pointer"
                      />
                      Basic
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="subscription"
                        value="premium"
                        className="cursor-pointer"
                      />
                      Premium
                    </label>
                  </div>
                </div>

                <div className="mb-4 ">
                  <label className="block text-gray-900 font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    placeholder="User's Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                {/* Buttons */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setaddUserModel(false)}
                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    // disabled={loading}
                    className="px-4 py-2 bg-black rounded-md hover:bg-gray-800 text-white"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
