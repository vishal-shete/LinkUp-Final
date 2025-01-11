import { ZegoExpressEngine } from "zego-express-engine-webrtc";

const appID = YOUR_APP_ID; // Replace with your ZEGOCLOUD App ID
const serverSecret = YOUR_SERVER_SECRET; // Replace with your ZEGOCLOUD App Secret

const handleVideoCall = () => {
  const zegoEngine = new ZegoExpressEngine(appID, serverSecret);

  const userID = `user_${Math.floor(Math.random() * 10000)}`; // Unique user ID
  const roomID = "videoChatRoom"; // Replace with your room ID

  // Login to the room
  zegoEngine.loginRoom(
    roomID,
    { userID, userName: `User_${userID}` },
    { userUpdate: true }
  );

  // Start local video
  zegoEngine.createStream({ camera: true, microphone: true }).then((localStream) => {
    const localVideo = document.createElement("video");
    localVideo.srcObject = localStream;
    localVideo.autoplay = true;
    localVideo.muted = true;
    localVideo.style.width = "300px";
    document.body.appendChild(localVideo); // Append local video to the DOM
    zegoEngine.startPublishingStream(userID, localStream);
  });

  // Handle remote video stream
  zegoEngine.on("playerStreamAdded", (streamID) => {
    zegoEngine.startPlayingStream(streamID).then((remoteStream) => {
      const remoteVideo = document.createElement("video");
      remoteVideo.srcObject = remoteStream;
      remoteVideo.autoplay = true;
      remoteVideo.style.width = "300px";
      document.body.appendChild(remoteVideo); // Append remote video to the DOM
    });
  });

  // Clean up on component unmount
  return () => {
    zegoEngine.stopPublishingStream(userID);
    zegoEngine.logoutRoom(roomID);
    zegoEngine.destroyEngine();
  };
};
