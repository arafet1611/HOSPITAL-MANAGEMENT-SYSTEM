import Banner from "../components/Banner";
import Features from "../components/Features";
import { useState, useEffect } from "react";
import CapacityOverview from "../components/CapacityOverview";
import io from 'socket.io-client';

function Home() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    newSocket.on('notification', (data) => {
      setMessage(data.message);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  console.log(message); 

  return (
    <div>
      <Banner />
      <CapacityOverview />
      <Features />
    </div>
  );
}

export default Home;
