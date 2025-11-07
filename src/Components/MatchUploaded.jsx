import React, { useEffect, useState } from "react";
import axios from "axios";
import { backend_URL, backend_URL1 } from "../config/config";

const MatchUploaded = () => {
  const [matches, setMatches] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newMatch, setNewMatch] = useState({
    league: "",
    time: "",
    day: "",
    leftTeamName: "",
    rightTeamName: "",
    oddsOne: "",
    oddsDraw: "",
    oddsTwo: "",
  });
  const [leftLogo, setLeftLogo] = useState(null);
  const [rightLogo, setRightLogo] = useState(null);
console.log(matches)
  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await axios.get(`${backend_URL}/topmatches`);
      setMatches(res.data);
    } catch (err) {
      console.error("Error fetching matches", err);
    }
  };

  const handleInputChange = (e) => {
    setNewMatch({ ...newMatch, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, team) => {
    if (team === "left") setLeftLogo(e.target.files[0]);
    else setRightLogo(e.target.files[0]);
  };

  const addMatch = async () => {
    const formData = new FormData();
    Object.entries(newMatch).forEach(([key, value]) =>
      formData.append(key, value)
    );
    if (leftLogo) formData.append("leftLogo", leftLogo);
    if (rightLogo) formData.append("rightLogo", rightLogo);

    try {
      await axios.post(`${backend_URL}/topmatches`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchMatches();
      setShowForm(false);
      resetForm();
    } catch (err) {
      console.error("Error adding match", err);
    }
  };

  const resetForm = () => {
    setNewMatch({
      league: "",
      time: "",
      day: "",
      leftTeamName: "",
      rightTeamName: "",
      oddsOne: "",
      oddsDraw: "",
      oddsTwo: "",
    });
    setLeftLogo(null);
    setRightLogo(null);
  };

  const deleteMatch = async (id) => {
    await axios.delete(`${backend_URL}/topmatches/${id}`);
    fetchMatches();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Add Match button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-6 md:mb-8 gap-3 sm:gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-1 sm:mb-2">
              Match Management
            </h2>
            <p className="text-gray-300 text-sm sm:text-base">Manage and upload matches</p>
          </div>
          <button
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm sm:text-base rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 w-full md:w-auto"
            onClick={() => setShowForm(true)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Match
          </button>
        </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-3 sm:p-4 animate-fadeIn">
          <div className="bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 w-full max-w-lg relative max-h-[90vh] overflow-y-auto mx-2">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-100 text-3xl font-bold transition-colors duration-200"
              onClick={() => setShowForm(false)}
              aria-label="Close modal"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Add New Match
            </h3>
            <div className="flex flex-col space-y-4">
              <input
                name="league"
                placeholder="League"
                value={newMatch.league}
                onChange={handleInputChange}
                className="px-4 py-3 border-2 border-gray-700 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50 outline-none transition-all duration-200 bg-gray-900/50 text-gray-100 placeholder-gray-400 hover:bg-gray-800"
              />
              <input
                name="time"
                placeholder="Time"
                value={newMatch.time}
                onChange={handleInputChange}
                className="px-4 py-3 border-2 border-gray-700 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50 outline-none transition-all duration-200 bg-gray-900/50 text-gray-100 placeholder-gray-400 hover:bg-gray-800"
              />
              <input
                name="day"
                placeholder="Day"
                value={newMatch.day}
                onChange={handleInputChange}
                className="px-4 py-3 border-2 border-gray-700 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50 outline-none transition-all duration-200 bg-gray-900/50 text-gray-100 placeholder-gray-400 hover:bg-gray-800"
              />
              <input
                name="leftTeamName"
                placeholder="Left Team Name"
                value={newMatch.leftTeamName}
                onChange={handleInputChange}
                className="px-4 py-3 border-2 border-gray-700 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50 outline-none transition-all duration-200 bg-gray-900/50 text-gray-100 placeholder-gray-400 hover:bg-gray-800"
              />
              <label className="px-4 py-3 border-2 border-gray-700 rounded-xl bg-gray-900/50 hover:bg-gray-800 cursor-pointer transition-all duration-200 text-gray-300">
                <span className="text-sm font-medium">Left Team Logo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "left")}
                  className="mt-2 text-sm"
                />
              </label>
              <input
                name="rightTeamName"
                placeholder="Right Team Name"
                value={newMatch.rightTeamName}
                onChange={handleInputChange}
                className="px-4 py-3 border-2 border-gray-700 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50 outline-none transition-all duration-200 bg-gray-900/50 text-gray-100 placeholder-gray-400 hover:bg-gray-800"
              />
              <label className="px-4 py-3 border-2 border-gray-700 rounded-xl bg-gray-900/50 hover:bg-gray-800 cursor-pointer transition-all duration-200 text-gray-300">
                <span className="text-sm font-medium">Right Team Logo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "right")}
                  className="mt-2 text-sm"
                />
              </label>
              <input
                name="oddsOne"
                placeholder="Odds 1"
                value={newMatch.oddsOne}
                onChange={handleInputChange}
                className="px-4 py-3 border-2 border-gray-700 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50 outline-none transition-all duration-200 bg-gray-900/50 text-gray-100 placeholder-gray-400 hover:bg-gray-800"
              />
              <input
                name="oddsDraw"
                placeholder="Odds X"
                value={newMatch.oddsDraw}
                onChange={handleInputChange}
                className="px-4 py-3 border-2 border-gray-700 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50 outline-none transition-all duration-200 bg-gray-900/50 text-gray-100 placeholder-gray-400 hover:bg-gray-800"
              />
              <input
                name="oddsTwo"
                placeholder="Odds 2"
                value={newMatch.oddsTwo}
                onChange={handleInputChange}
                className="px-4 py-3 border-2 border-gray-700 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50 outline-none transition-all duration-200 bg-gray-900/50 text-gray-100 placeholder-gray-400 hover:bg-gray-800"
              />
              <button
                onClick={addMatch}
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Submit Match
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List of Matches */}
      <div className="bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl border border-gray-700 p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-100 mb-4 sm:mb-6">All Matches</h3>
        {matches.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-300 text-lg">No matches found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {matches.map((match) => (
              <div
                key={match._id}
                className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-700 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-3">
                  <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                    <img
                      src={`${backend_URL1}/uploads/${match.leftTeam.logo}`}
                      alt={match.leftTeam.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-full bg-gray-800 p-1 border-2 border-gray-700"
                    />
                    <div className="text-center flex-1 sm:flex-none">
                      <span className="text-base sm:text-lg md:text-xl font-bold text-gray-100">{match.leftTeam.name}</span>
                      <span className="text-gray-500 mx-2 sm:mx-3">vs</span>
                      <span className="text-base sm:text-lg md:text-xl font-bold text-gray-100">{match.rightTeam.name}</span>
                    </div>
                    <img
                      src={`${backend_URL1}/uploads/${match.rightTeam.logo}`}
                      alt={match.rightTeam.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-full bg-gray-800 p-1 border-2 border-gray-700"
                    />
                  </div>
                  <span className="text-gray-300 font-semibold bg-gray-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base">{match.time}</span>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <span className="text-gray-300 font-semibold text-sm sm:text-base">
                      Odds: 1 - <strong className="text-teal-400">{match.odds.one}</strong>, X -{" "}
                      <strong className="text-teal-400">{match.odds.draw}</strong>, 2 -{" "}
                      <strong className="text-teal-400">{match.odds.two}</strong>
                    </span>
                  </div>
                  <button
                    onClick={() => deleteMatch(match._id)}
                    className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm sm:text-base rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 w-full sm:w-auto justify-center"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default MatchUploaded;
