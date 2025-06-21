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
    <div className="p-5">
      <button
        className="flex items-center text-blue-600 mb-5 w-full"
        onClick={() => navigate("/users")}
      >
        <IoArrowBack className="mr-2" /> Back to Users
      </button>

      <h2 className="text-2xl font-bold mb-4">User Addons</h2>

      {loading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : (
        <div className="flex flex-row flex-wrap justify-between">
          {addons.map((addon) => (
            <div
              key={addon._id}
              className="border rounded p-4 flex justify-between items-center w-[48%] mb-5"
            >
              <div>
                <h3 className="font-semibold text-lg">{addon.title}</h3>
                <p className="text-sm text-gray-600">{addon.description}</p>
              </div>

              <button
                className={`px-4 py-1.5 rounded text-sm ${
                  addon.isActive 
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : addon.price === 0
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
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
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && selectedAddon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {selectedAddon.status === "active"
                ? "Deactivate Addon"
                : "Activate Addon"}
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to{" "}
              <strong>
                {selectedAddon.status === "active" ? "deactivate" : "activate"}
              </strong>{" "}
              this addon?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedAddon(null);
                }}
                className="px-4 py-2 bg-gray-300 text-black rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleToggleAddon}
                className={`px-4 py-2 rounded ${
                  selectedAddon.status === "active"
                    ? "bg-red-600 text-white"
                    : "bg-blue-600 text-white"
                }`}
              >
                {selectedAddon.isActive ? "Deactivate" : "Activate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAddon;
