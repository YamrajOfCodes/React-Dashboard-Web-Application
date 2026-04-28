import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";

import PrivateRoute from "./utils/ProtectedRoutes/ProtectedRoutes";
import PublicRoute from "./utils/PublicRoutes/PublicRoutes";

const App = () => {
  return (
    <Routes>

      {/* Public Route */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

    </Routes>
  );
};

export default App;