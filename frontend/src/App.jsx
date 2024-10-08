import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ToastContainer from "./components/ToastContainer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Host from "./pages/Host";
import Room from "./pages/Room";
import ContextWrapper from "./context/ContextWrapper";
import PrivateRoute from "./utils/PrivateRoute";
import Logout from "./pages/Logout";

function App() {
  return (
    <Router>
      <ContextWrapper>
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/host/:roomCode"
            element={
              <PrivateRoute>
                <Host />
              </PrivateRoute>
            }
          />
          <Route
            path="/room/:roomCode"
            element={
              <PrivateRoute>
                <Room />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ContextWrapper>
    </Router>
  );
}

export default App;
