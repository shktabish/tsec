import React, { useState } from "react";

function HomePage() {
  const [roomId, setRoomId] = useState("");
  const [roomLink, setRoomLink] = useState(""); // State to store the room link

  // Generate a random room ID with a timestamp
  const handleRoomIdGenerate = () => {
    const randomId = Math.random().toString(36).substring(2, 9);
    const timestamp = Date.now().toString().substring(-4);
    const generatedRoomId = randomId + timestamp;
    setRoomId(generatedRoomId);
    
    // Create the group call URL and store it in state
    const generatedRoomLink = `room/${generatedRoomId}?type=group-call`;
    setRoomLink(generatedRoomLink);
  };

  return (
    <div className="homepage-container">
      <div className="homepage-content">
        <h1 className="homepage-title">Welcome to Video Calling App</h1>
        <p className="homepage-subtitle">
          Start a group video call with a randomly generated Room ID
        </p>
        <div className="room-id-container">
          <input
            type="text"
            className="room-id-input"
            placeholder="Generated Room ID"
            value={roomId}
            readOnly
          />
          <button className="generate-button" onClick={handleRoomIdGenerate}>
            Generate Group Call Link
          </button>
        </div>
        
        {/* Display the generated room link as a clickable link */}
        {roomLink && (
          <div className="room-link-container">
            <p className="room-link-title">Your Group Call Link:</p>
            <a href={`/${roomLink}`} className="room-link" target="_blank" rel="noopener noreferrer">
              {window.location.protocol + "//" + window.location.host + "/" + roomLink}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
