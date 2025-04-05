import axios from "axios";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdUpload } from "react-icons/md";
import { backend_URL } from "../config/config";
import { FaL } from "react-icons/fa6";

const IOSHomeScreen = () => {
  const [images, setImages] = useState({ 1: null, 2: null, 3: null });
  const [files, setFiles] = useState({ 1: null, 2: null, 3: null });
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (event, id) => {
    const file = event.target.files[0];
    if (file) {
      setImages((prev) => ({ ...prev, [id]: URL.createObjectURL(file) }));
      setFiles((prev) => ({ ...prev, [id]: file }));
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();

    // Append files using the same field name as multer ("images")
    Object.values(files).forEach((file) => {
      formData.append("images", file); // Ensure this matches multer array field name
    });

    try {
      setUploading(true);
      const response = await axios.post(
        `${backend_URL}/uploadImages`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUploading(false);

      console.log(response.data);
      alert("Images uploaded");
    } catch (error) {
      setUploading(false);
      console.error("Upload failed", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="md:text-3xl font-bold text-gray-800 mb-8 text-center text-2xl">
        Upload & Preview Images
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
        {[1, 2, 3].map((id) => (
          <div
            key={id}
            className="bg-white p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105"
          >
            <label className="block text-center font-semibold text-gray-700 mb-3">
              Image {id}
            </label>
            <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-gray-100 relative group">
              {images[id] ? (
                <img
                  src={images[id]}
                  alt={`Preview ${id}`}
                  className="object-cover w-full h-full group-hover:opacity-75 transition"
                />
              ) : (
                <span className="text-gray-400 text-sm">No Image Selected</span>
              )}
            </div>
            <label className="mt-4 flex items-center justify-center cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition">
              <FaCloudUploadAlt className="mr-2" /> Select Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e, id)}
              />
            </label>
          </div>
        ))}
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={
          uploading || Object.values(files).every((file) => file === null)
        }
        className={`mt-6 flex items-center px-5 py-2 rounded-md text-white font-medium transition ${
          uploading || Object.values(files).every((file) => file === null)
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {uploading ? (
          <span>Uploading...</span>
        ) : (
          <>
            <MdUpload className="mr-2 text-lg" />
            Upload
          </>
        )}
      </button>

      {/* Success Message */}
      {success && (
        <p className="mt-4 text-green-600 font-semibold">
          Images Uploaded Successfully! ✅
        </p>
      )}
    </div>
  );
};

export default IOSHomeScreen;
