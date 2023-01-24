import React from "react";
import ChatUi from "./ChatUi";
import SocketConnection from "./SocketConnection";

function App() {
  return (
    <div>
      <SocketConnection />
      <ChatUi />
    </div>
  );
}

export default App;
