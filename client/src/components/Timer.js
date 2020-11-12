import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:4001";

export default function Timer() {
  const [response, setResponse] = useState("");
  useEffect(() => {
    
    var options = {
    rememberUpgrade:true,
    transports: ['websocket'],
    secure:true, 
    rejectUnauthorized: false
        }
    const socket = socketIOClient(ENDPOINT, options);
    socket.on("timer", data => {
      setResponse(data);
    });
    return () => socket.disconnect();
  }, []);

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}