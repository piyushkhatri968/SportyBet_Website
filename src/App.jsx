import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Header from "./Layout/Header";
import ProtectedRoute from "./ProtectedRoute";
import AllUsers from "./Components/AllUsers";
import AddUser from "./Components/AddUser";
import ActiveUsers from "./Components/ActiveUsers";
import DisableUsers from "./Components/DisableUsers";
import ExpiredUsers from "./Components/ExpiredUsers";

const App = () => {
  return (
    <div className="">
      <Header />
      <Routes>
        {/* Protected Routes - Only logged-in users can access */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/activeUsers" element={<ActiveUsers />} />
          <Route path="/disableUsers" element={<DisableUsers />} />
          <Route path="/expiredUsers" element={<ExpiredUsers />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
