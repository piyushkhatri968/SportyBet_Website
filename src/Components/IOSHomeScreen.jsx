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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4 sm:mb-6 md:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-1 sm:mb-2 px-4">
            Upload & Preview Images
          </h1>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg px-4">Update iOS home screen images</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
          {[1, 2, 3].map((id) => (
            <div
              key={id}
              className="bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-gray-700 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <label className="block text-center font-bold text-gray-100 mb-3 sm:mb-4 text-base sm:text-lg">
                Image {id}
              </label>
              <div className="w-full h-48 sm:h-56 md:h-64 border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 relative group hover:border-indigo-400 transition-colors duration-200">
                {images[id] ? (
                  <img
                    src={images[id]}
                    alt={`Preview ${id}`}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="text-center">
                    <FaCloudUploadAlt className="mx-auto text-5xl text-gray-400 mb-2" />
                    <span className="text-gray-500 text-sm font-medium">No Image Selected</span>
                  </div>
                )}
              </div>
              <label className="mt-4 flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg">
                <FaCloudUploadAlt className="text-lg" />
                Select Image
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

        <div className="flex justify-center">
          <button
            onClick={handleUpload}
            disabled={
              uploading || Object.values(files).every((file) => file === null)
            }
            className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base shadow-lg transform transition-all duration-200 ${
              uploading || Object.values(files).every((file) => file === null)
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-xl hover:scale-105 active:scale-95"
            }`}
          >
            {uploading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </>
            ) : (
              <>
                <MdUpload className="text-xl" />
                Upload Images
              </>
            )}
          </button>
        </div>

        {success && (
          <div className="mt-6 flex justify-center">
            <div className="p-4 bg-green-900/30 border-l-4 border-green-500 rounded-lg text-green-300 text-sm font-semibold flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Images Uploaded Successfully!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IOSHomeScreen;
