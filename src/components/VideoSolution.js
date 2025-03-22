import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const VideoSolution = ({ topic, classLevel }) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchVideoSolution = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://exam-prep-rp4x.onrender.com/api/video/soln", 
        { topic }
      );
      setVideoUrl(response.data.videoUrl);
    } catch (error) {
      console.error("Error fetching video solution:", error);
      setVideoUrl(null);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <motion.button
        onClick={fetchVideoSolution}
        disabled={loading}
        className="video-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        {loading ? (
          <div className="spinner" />
        ) : (
          <>
            <span className="button-text">Get Video Reference</span>
            <span className="button-icon">🎥</span>
          </>
        )}
      </motion.button>

      {videoUrl && (
        <motion.div 
          className="video-container"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="video-title">Video Reference</h3>
          <div className="video-wrapper">
            <iframe 
              src={videoUrl.includes("youtube.com") ? 
                videoUrl.replace("watch?v=", "embed/") : videoUrl} 
              title="Video Solution"
              allowFullScreen
              className="video-iframe"
            />
          </div>
        </motion.div>
      )}

      <style jsx>{`
        .container {
          margin: 2rem auto;
          max-width: 800px;
          padding: 0 1rem;
        }

        .video-button {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 1rem 2rem;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #00c6fb 0%, #005bea 100%);
          color: white;
          font-size: 1.1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 6px rgba(0, 103, 255, 0.1);
          position: relative;
          overflow: hidden;
        }

        .video-button:disabled {
          background: linear-gradient(135deg, #f0f0f0 0%, #d0d0d0 100%);
          cursor: not-allowed;
        }

        .button-text {
          letter-spacing: 0.5px;
        }

        .button-icon {
          font-size: 1.2rem;
          filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1));
        }

        .spinner {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
          margin: 0 auto;
        }

        .video-container {
          margin-top: 2rem;
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .video-title {
          margin: 1.5rem 0 1rem;
          text-align: center;
          color: #2d3748;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .video-wrapper {
          position: relative;
          padding-bottom: 56.25%;
          background: #000;
        }

        .video-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default VideoSolution;