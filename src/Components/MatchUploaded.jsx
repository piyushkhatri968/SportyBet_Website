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
  console.log(matches);
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
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header with Add Match button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Match Management</h2>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          onClick={() => setShowForm(true)}
        >
          Add Match
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold"
              onClick={() => setShowForm(false)}
              aria-label="Close modal"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">Add New Match</h3>
            <div className="flex flex-col space-y-3">
              <input
                name="league"
                placeholder="League"
                value={newMatch.league}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                name="time"
                placeholder="Time"
                value={newMatch.time}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                name="day"
                placeholder="Day"
                value={newMatch.day}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                name="leftTeamName"
                placeholder="Left Team Name"
                value={newMatch.leftTeamName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "left")}
                className="text-sm"
              />
              <input
                name="rightTeamName"
                placeholder="Right Team Name"
                value={newMatch.rightTeamName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "right")}
                className="text-sm"
              />
              <input
                name="oddsOne"
                placeholder="Odds 1"
                value={newMatch.oddsOne}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                name="oddsDraw"
                placeholder="Odds X"
                value={newMatch.oddsDraw}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                name="oddsTwo"
                placeholder="Odds 2"
                value={newMatch.oddsTwo}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={addMatch}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List of Matches */}
      <h3 className="text-xl font-semibold mb-4">All Matches</h3>
      {matches.length === 0 && (
        <p className="text-gray-500">No matches found.</p>
      )}
      {matches.map((match) => (
        <div
          key={match._id}
          className="mb-4 border-b border-gray-300 pb-2 flex flex-col gap-1"
        >
          <p className="flex items-center gap-2 text-lg font-medium">
            <img
              src={`${backend_URL1}/uploads/${match.leftTeam.logo}`}
              alt={match.leftTeam.name}
              className="w-8 h-8 object-contain"
            />
            {match.leftTeam.name} vs {match.rightTeam.name}
            <img
              src={`${backend_URL1}/uploads/${match.rightTeam.logo}`}
              alt={match.rightTeam.name}
              className="w-8 h-8 object-contain"
            />
            <span className="ml-auto text-gray-600">{match.time}</span>
          </p>
          <p>
            Odds: 1 - <strong>{match.odds.one}</strong>, X -{" "}
            <strong>{match.odds.draw}</strong>, 2 -{" "}
            <strong>{match.odds.two}</strong>
          </p>
          <button
            onClick={() => deleteMatch(match._id)}
            className="self-start bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MatchUploaded;
