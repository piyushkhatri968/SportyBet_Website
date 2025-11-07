import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoArrowBack } from "react-icons/io5";
import { backend_URL } from "../config/config";

const UserAddon = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddon, setSelectedAddon] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUserAddons();
  }, [userId]);

  const fetchUserAddons = async () => {
    try {
      const response = await axios.get(`${backend_URL}/all/${userId}`);
      setAddons(response.data);
    } catch (error) {
      console.error("Error fetching addons:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAddon = async () => {
    if (!selectedAddon) return;
    try {
      const res = await axios.post(`${backend_URL}/addon/buy`, {
        userId,
        addonId: selectedAddon._id,
      });

      alert(res.data.message);
      setShowModal(false);
      setSelectedAddon(null);
      fetchUserAddons();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to process addon");
    }
  };

console.log(addons)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <button
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-4 sm:mb-6 font-semibold transition-colors duration-200 text-sm sm:text-base"
          onClick={() => navigate("/users")}
        >
          <IoArrowBack className="text-lg sm:text-xl" />
          Back to Users
        </button>

        <div className="mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-1 sm:mb-2">
            User Addons
          </h2>
          <p className="text-gray-300 text-sm sm:text-base">Manage user addon subscriptions</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <svg className="animate-spin h-12 w-12 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-xl font-semibold text-gray-300">Loading addons...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addons.map((addon) => (
              <div
                key={addon._id}
                className="bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg border border-gray-700 p-4 sm:p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg sm:text-xl text-gray-100 mb-1 sm:mb-2">{addon.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-300">{addon.description}</p>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                      addon.isActive 
                        ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl"
                        : addon.price === 0
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg hover:shadow-xl"
                    }`}
                    onClick={() => {
                      if (addon.price === 0 && addon.isActive) return;
                      setSelectedAddon(addon);
                      setShowModal(true);
                    }}
                  >
                    {addon.isActive 
                      ? "Deactivate"
                      : addon.price === 0
                      ? "Free (Inactive)"
                      : `Activate ₹${addon.price}`}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && selectedAddon && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-100 mb-2">
                {selectedAddon.status === "active"
                  ? "Deactivate Addon"
                  : "Activate Addon"}
              </h3>
              <p className="text-gray-300 text-center mb-6">
                Are you sure you want to{" "}
                <strong className="text-gray-100">
                  {selectedAddon.status === "active" ? "deactivate" : "activate"}
                </strong>{" "}
                this addon?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedAddon(null);
                  }}
                  className="px-6 py-3 bg-gray-700 text-gray-200 rounded-xl font-semibold hover:bg-gray-600 transform hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleToggleAddon}
                  className={`px-6 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 ${
                    selectedAddon.status === "active"
                      ? "bg-gradient-to-r from-red-500 to-red-600"
                      : "bg-gradient-to-r from-indigo-500 to-purple-500"
                  }`}
                >
                  {selectedAddon.isActive ? "Deactivate" : "Activate"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAddon;
