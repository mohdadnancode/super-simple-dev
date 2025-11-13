import { useState } from "react";
import { Chatbot } from "supersimpledev";
import dayjs from "dayjs";
import "./ChatInput.css";
import LoadingSpinner from "../assets/loading-spinner.gif";


function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");
  const [isLoding, setIsLoding] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoding || inputText === "") {
      return;
    }

    setIsLoding(true);

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      },
    ];

    setChatMessages([
      ...newChatMessages,
      // This creates a temporary Loading... message.
      // Because we don't save this message in newChatMessages,
      // it will be removed later, when we add the response.
      {
        message: <img src={LoadingSpinner} className="loading-spinner" />,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      },
    ]);

    setIsLoding(false);

    setInputText("");
  }

  function keyHandle(event) {
    if (event.key === "Enter") {
      sendMessage();
    } else if (event.key === "Escape") {
      setInputText("");
    }
  }

  function clearMessages(){
    setChatMessages([]);
  }

  return (
    <div className="chat-input-container">
      <input
        type="text"
        className="chat-input"
        placeholder="Send a message to Chat-Bot"
        size="30"
        onChange={saveInputText}
        onKeyDown={keyHandle}
        value={inputText}
      />
      <button className="send-btn" onClick={sendMessage}>
        Send
      </button>
      <button className="clear-btn" onClick={clearMessages}>Clear</button>
    </div>
  );
}

export default ChatInput;