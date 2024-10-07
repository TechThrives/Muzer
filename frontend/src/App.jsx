
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ToastContainer from "./components/ToastContainer";
import Home from "./pages/Home";
import Host from "./pages/Host";
import Room from "./pages/Room";
import ContextWrapper from "./context/ContextWrapper";

function App() {
  return (
    <Router>
      <ContextWrapper>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/host/:roomCode" element={<Host />} />
          <Route path="/room/:roomCode" element={<Room />} />
        </Routes>
      </ContextWrapper>
    </Router>
  );
}

export default App;
