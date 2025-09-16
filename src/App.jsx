import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Header from "./Layout/Header";
import ProtectedRoute from "./ProtectedRoute";
import AllUsers from "./Components/AllUsers";
import AddUser from "./Components/AddUser";
import ActiveUsers from "./Components/ActiveUsers";
import DisableUsers from "./Components/DisableUsers";
import ExpiredUsers from "./Components/ExpiredUsers";
import IOSHomeScreen from "./Components/IOSHomeScreen";
import MatchUploaded from "./Components/MatchUploaded";
import UserAddon from "./Components/UserAddon";
import { useAuth } from "./Context/AuthContext";
import PageLoader from "./Components/PageLoader";

const App = () => {
  const { authUser, authLoading } = useAuth();
  const isAuthenticated = Boolean(authUser);

  if (authLoading) return <PageLoader />;

  return (
    <div>
      <Header />
      <Routes>
        {/* Protected Routes - Only logged-in users can access */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/activeUsers" element={<ActiveUsers />} />
          <Route path="/disableUsers" element={<DisableUsers />} />
          <Route path="/expiredUsers" element={<ExpiredUsers />} />
          <Route path="/IOSHomeScreen" element={<IOSHomeScreen />} />
          <Route path="/match-uploaded" element={<MatchUploaded />} />
          <Route path="/user-addons/:userId" element={<UserAddon />} />
        </Route>
        {/* Public Route */}
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;
