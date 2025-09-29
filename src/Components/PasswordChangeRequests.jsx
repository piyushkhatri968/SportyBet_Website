import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { backend_URL } from "../config/config";

const StatusBadge = ({ status }) => {
  const color =
    status === "approved"
      ? "bg-green-100 text-green-700"
      : status === "rejected"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700";
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${color}`}>{status}</span>
  );
};

const PasswordChangeRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("pending");
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [rejectReasons, setRejectReasons] = useState({});

  const fetchRequests = async (status) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `${backend_URL}/admin/password-change/requests${status ? `?status=${status}` : ""}`,
        { withCredentials: true }
      );
      setRequests(res.data?.requests || []);
    } catch (e) {
      setError(e.response?.data?.message || e.message || "Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const approveRequest = async (id) => {
    try {
      setActionLoadingId(id);
      await axios.put(
        `${backend_URL}/admin/password-change/approve/${id}`,
        {},
        { withCredentials: true }
      );
      await fetchRequests(filter);
    } catch (e) {
      alert(e.response?.data?.message || e.message || "Failed to approve");
    } finally {
      setActionLoadingId(null);
    }
  };

  const rejectRequest = async (id) => {
    try {
      setActionLoadingId(id);
      const reason = rejectReasons[id] || "";
      await axios.put(
        `${backend_URL}/admin/password-change/reject/${id}`,
        { reason },
        { withCredentials: true }
      );
      await fetchRequests(filter);
      setRejectReasons((prev) => ({ ...prev, [id]: "" }));
    } catch (e) {
      alert(e.response?.data?.message || e.message || "Failed to reject");
    } finally {
      setActionLoadingId(null);
    }
  };

  const tableRows = useMemo(() => requests, [requests]);

  return (
    <div className="px-2 md:px-6 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-semibold">Password Change Requests</h2>
        <select
          className="border rounded px-2 py-1"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {error ? (
        <div className="text-red-600 text-sm mb-3">{error}</div>
      ) : null}

      <div className="overflow-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2">User</th>
              <th className="text-left p-2">Request ID</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Requested At</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-3" colSpan={5}>Loading...</td>
              </tr>
            ) : tableRows.length === 0 ? (
              <tr>
                <td className="p-3" colSpan={5}>No requests</td>
              </tr>
            ) : (
              tableRows.map((r) => (
                <tr key={r._id} className="border-t">
                  <td className="p-2">{r.userId?.email || r.userId?.username || r.userId}</td>
                  <td className="p-2">{r._id}</td>
                  <td className="p-2"><StatusBadge status={r.status} /></td>
                  <td className="p-2">{new Date(r.createdAt).toLocaleString()}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        disabled={r.status !== "pending" || actionLoadingId === r._id}
                        className="px-3 py-1 rounded bg-green-600 text-white disabled:opacity-50"
                        onClick={() => approveRequest(r._id)}
                      >
                        {actionLoadingId === r._id ? "..." : "Approve"}
                      </button>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Reason (optional)"
                          className="border rounded px-2 py-1"
                          value={rejectReasons[r._id] || ""}
                          onChange={(e) =>
                            setRejectReasons((prev) => ({ ...prev, [r._id]: e.target.value }))
                          }
                        />
                        <button
                          disabled={r.status !== "pending" || actionLoadingId === r._id}
                          className="px-3 py-1 rounded bg-red-600 text-white disabled:opacity-50"
                          onClick={() => rejectRequest(r._id)}
                        >
                          {actionLoadingId === r._id ? "..." : "Reject"}
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PasswordChangeRequests;


