import React from "react";
import { SocketProvider } from "./SocketContext";
import { AudioPlayerProvider } from "./AudioPlayerContext";
import { AuthProvider } from "./AuthContext";

const ContextWrapper = ({ children }) => {
  return (
    <AuthProvider>
      <SocketProvider>
        <AudioPlayerProvider>{children}</AudioPlayerProvider>
      </SocketProvider>
    </AuthProvider>
  );
};

export default ContextWrapper;
