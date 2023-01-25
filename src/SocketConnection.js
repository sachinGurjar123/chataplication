import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://172.105.41.247:5004");

function SocketConnection({ handleReceivedMessage }) {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("message-receive", (e) => {
      // console.log("essage-receive__00->", e);
      handleReceivedMessage(e);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  return (
    <div>
      <h1>Socket.io Connected: {"" + isConnected}</h1>
    </div>
  );
}

export default SocketConnection;
