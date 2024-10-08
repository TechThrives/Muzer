import React, { createContext, useContext, useEffect, useState } from "react";
import SocketIoClient from "socket.io-client";
import { notify } from "../services/toastService";
import { useAuth } from "./AuthContext";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      const newSocket = SocketIoClient(process.env.REACT_APP_SERVER, {
        withCredentials: true,
        transports: ["polling", "websocket"],
      });

      setSocket(newSocket);

      newSocket.on("error", ({ message }) => {
        notify(400, message);
      });

      newSocket.on("success", ({ message }) => {
        notify(200, message);
      });

      return () => {
        newSocket.disconnect();
      };
    } else {
      if (socket) {
        socket.disconnect();
      }
      setSocket(null);
    }
  }, [isAuthenticated, user]);

  const onEvent = (event, handler) => {
    if (!socket) return;

    socket.on(event, handler);

    return () => {
      socket.off(event, handler);
    };
  };

  const emitEvent = (event, data) => {
    if (socket) {
      socket.emit(event, data);
    }
  };

  const contextValues = {
    onEvent,
    emitEvent,
  };

  return (
    <SocketContext.Provider value={contextValues}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }

  return context;
};
