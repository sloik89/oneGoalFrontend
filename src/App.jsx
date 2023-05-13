import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard } from "./components";
import { Home, Register, PrivateRoute, Edit } from "./page";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/job/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
