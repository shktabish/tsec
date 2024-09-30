import React, { useRef, useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function Room() {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const zpRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [joined, setJoined] = useState(false);
  const [callType, setCallType] = useState(""); // State to store the call type

  // Initialize ZegoUIKit and join room
  const myMeeting = (type) => {
    const appID = 2076824033;
    const serverSecret = "a550b6dbdc01483fec3efff2ad871b74";
    
    // Generate the token for the room
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "Your Name"
    );

    // Create ZegoUIKit instance
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zpRef.current = zp;

    // Check if zp is created successfully
    if (!zp) {
      console.error("Failed to create ZegoUIKit instance.");
      return;
    }

    zp.joinRoom({
      container: videoContainerRef.current,
      sharedLinks: [
        {
          name: "Video Call Link",
          url: window.location.protocol + "//" + window.location.host + "/" + roomId + "?type=" + encodeURIComponent(type),
        },
      ],
      scenario: {
        mode:
          type === "one-on-one"
            ? ZegoUIKitPrebuilt.OneONoneCall
            : ZegoUIKitPrebuilt.GroupCall,
      },
      maxUsers: type === "one-on-one" ? 2 : 10,
      onJoinRoom: () => {
        setJoined(true);
      },
      onLeaveRoom: () => {
        navigate("/mentor");
      },
    });
  };

  // Handle exit from the room
  const handleExit = () => {
    if (zpRef.current) {
      zpRef.current.destroy();
    }
    navigate("/");
  };

  // On component mount, extract call type from location and initialize meeting
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const type = query.get("type");

    setCallType(type); // Update state with call type
  }, [location.search]);

  // Initialize meeting after callType state is set
  useEffect(() => {
    if (callType) {
      myMeeting(callType);
    }

    // Cleanup function for component unmount
    return () => {
      if (zpRef.current) {
        zpRef.current.destroy();
      }
    };
  }, [callType, roomId, navigate]);

  return (
    <div className="room-container">
      {!joined && (
        <>
          {/* <header className="room-header">
            {callType === "one-on-one"
              ? "One-on-One Video Call"
              : "Group Video Call"}
          </header> */}
          <button className="exit-button" onClick={handleExit}>
            Exit
          </button>
        </>
      )}
      <div ref={videoContainerRef} className="video-container" />
    </div>
  );
}

export default Room;
