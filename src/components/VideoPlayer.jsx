import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ videoLink }) => (
  <div className="w-full aspect-video bg-black shadow-lg rounded-lg overflow-hidden">
    <ReactPlayer
      url={videoLink || ""}
      height="100%"
      width="100%"
      controls
      style={{ backgroundColor: "#000000" }}
      playing={true}
    />
  </div>
);

export default VideoPlayer;
