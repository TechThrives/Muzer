import React from "react";
import { SocketProvider } from "./SocketContext";
import { AudioPlayerProvider } from "./AudioPlayerContext";

const ContextWrapper = ({ children }) => {
    return (
        <SocketProvider>
            <AudioPlayerProvider>{children}</AudioPlayerProvider>
        </SocketProvider>
    );
};

export default ContextWrapper;
