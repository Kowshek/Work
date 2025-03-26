import React from "react";
import video from "../assets/videoplayback.mp4";
import welcome from "../assets/welcome.jpg";

function Samplevideo() {
  return (
    <div class="video-container">
      <video 
        autoPlay 
        muted 
        loop 
        poster={welcome}
        >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}

export default Samplevideo;
