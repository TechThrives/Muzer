import React, {
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
  import SocketIoClient from "socket.io-client";
  import { useNavigate } from "react-router-dom";
  import { notify } from "../services/toastService";
  
  // Create the context
  export const SocketContext = createContext(null);
  
  // Initialize socket connection
  const socket = SocketIoClient(process.env.REACT_APP_SERVER, {
    withCredentials: true,
    transports: ["polling", "websocket"],
  });
  
  // Context provider component
  export const SocketProvider = ({ children }) => {
    const navigate = useNavigate();
  
    const [user, setUser] = useState({email:"", password:""});
  
    useEffect(() => {
      if (!user) return;
  
      socket.on("error", ({ message }) => {
        notify(400, message);
      });

      socket.on("success", ({ message }) => {
        notify(200, message);
      });
  
      socket.on("roomCreated", (room) => {
        console.log("New room created", room);
        navigate(`/host/${room.code}`);
      });
  
      socket.emit("ready");
  
      return () => {
        socket.off("roomCreated");
        socket.off("error");
        socket.off("success");
      };
    }, [socket, user]);
  
    return (
      <SocketContext.Provider
        value={{
          socket,
          user,
          setUser,
        }}
      >
        {children}
      </SocketContext.Provider>
    );
  };
  
  // Custom hook to use the Socket context
  export const useSocket = () => {
    return useContext(SocketContext);
  };