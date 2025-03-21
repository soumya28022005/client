import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const VideoSolution = ({topic}) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchVideoSolution = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://exam-prep-rp4x.onrender.com/api/video/soln", {topic}
      );
      console.log("Video:",response)
      setVideoUrl(response.data.videoUrl); // Assuming API returns { videoUrl: "video_link" }
    } catch (error) {
      console.error("Error fetching video solution:", error);
      setVideoUrl(null);
    }
    setLoading(false);
  };

  return (
    <div style={{ marginTop: "20px", textAlign: "center", maxWidth: "100%" }}>
      {/* Get Video Solution Button */}
      <motion.button
        onClick={fetchVideoSolution}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: loading ? "#007bff" : "#4CAF50",
          color: "#fff",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background-color 0.3s ease, transform 0.2s ease",
          boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)",
          marginTop: "10px",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {loading ? "Loading..." : "Get Video Solution"}
      </motion.button>

      {/* Video Display */}
      {videoUrl && (
        <div style={{ 
          marginTop: "15px",
          maxWidth: "100%",
          overflow: "hidden" // Prevent video from breaking layout
        }}>
          <h3>Video Solution:</h3>
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
            <iframe 
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              src={videoUrl.includes("youtube.com") ? videoUrl.replace("watch?v=", "embed/") : videoUrl} 
              title="Video Solution"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoSolution;