import React, {
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
  import SocketIoClient from "socket.io-client";
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
    const [user, setUser] = useState({email:"", password:""});
  
    useEffect(() => {
      if (!user) return;
  
      socket.on("error", ({ message }) => {
        notify(400, message);
      });

      socket.on("success", ({ message }) => {
        notify(200, message);
      });
  
      return () => {
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
    const context = useContext(SocketContext);

    if (context === undefined) {
      throw new Error(
        'useSocket must be used within a SocketProvider'
      );
    }
    
    return context;
  };