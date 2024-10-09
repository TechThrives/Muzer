import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchService from "../services/fetchService";
import Host from "./Host";
import User from "./User";

const Room = () => {
  const { roomCode } = useParams();
  const [isHost, setIsHost] = useState(null);

  useEffect(() => {
    const checkIfHost = async () => {
      const url = `/api/room/${roomCode}/isHost`;
      const options = {
        method: "GET",
        credentials: "include",
      }
      const response = await fetchService(url, options);
      if(response){
        setIsHost(response.isHost);
      }
    };
    checkIfHost();
  }, [roomCode]);

  if (isHost === null) {
    return <div>Loading...</div>;
  }

  return isHost ? <Host /> : <User />;
};

export default Room;
