import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Header from "./Layout/Header";
import ProtectedRoute from "./ProtectedRoute";
import AllUsers from "./Components/AllUsers";

const App = () => {
  return (
    <div className="">
      <Header />
      <Routes>
        {/* Protected Routes - Only logged-in users can access */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<AllUsers />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
