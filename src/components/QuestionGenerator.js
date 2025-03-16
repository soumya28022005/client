import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const QuestionGenerator = () => {
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generateQuestion = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const response = await axios.post(
        "https://exam-prep-rp4x.onrender.com/api/questions/generate",
        { topic }
      );
      setQuestion(response.data);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
    setLoading(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      generateQuestion();
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "20px auto", maxWidth: "600px", overflow: "hidden" }}>
      {/* Animated Header on Mobile, Static on Laptop */}
      {isMobile ? (
        <motion.h2
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          exit={{ x: "100%" }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "restart" }}
          style={{
            fontSize: "20px",
            whiteSpace: "nowrap",
            position: "relative",
          }}
        >
          AI-Powered Exam Generator (S)
        </motion.h2>
      ) : (
        <h2 style={{ fontSize: "30px" }}>AI-Powered Exam Generator (S)</h2>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: isMobile ? "column" : "row",
          gap: "10px",
          width: "100%",
          marginTop: "20px",
        }}
      >
        {/* Input Field */}
        <motion.input
          type="text"
          placeholder="Enter topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={handleKeyPress}
          style={{
            padding: "14px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: isMobile ? "100%" : "300px",
            fontSize: "16px",
            outline: "none",
            transition: "box-shadow 0.3s ease",
            boxShadow: "inset 2px 2px 5px rgba(0, 0, 0, 0.2)",
            textAlign: "left",
          }}
          whileFocus={{ boxShadow: "0px 0px 10px rgba(0, 0, 255, 0.5)" }}
        />

        {/* Generate Button */}
        <motion.button
          onClick={generateQuestion}
          disabled={loading}
          style={{
            padding: isMobile ? "8px 16px" : "10px 20px",
            fontSize: isMobile ? "16px" : "16px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: loading ? "#007bff" : "#ff4081",
            color: "#fff",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background-color 0.3s ease, transform 0.2s ease",
            boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? <span className="loader"></span> : "Generate"}
        </motion.button>
      </div>

      {question && !loading && (
        <div style={{ marginTop: "15px", textAlign: "left" }}>
          <h3>{question.question}</h3>
          {question.options.map((opt, index) => (
            <p key={index} style={{ margin: "5px 0" }}>
              {opt}
            </p>
          ))}
        </div>
      )}

      {/* CSS Animations */}
      <style>
        {`
          .loader {
            width: 14px;
            height: 14px;
            border: 2px solid #fff;
            border-top: 2px solid transparent;
            border-radius: 50%;
            display: inline-block;
            animation: spin 0.8s linear infinite;
          }
          
          button:hover {
            background-color: #ff6384;
            transform: scale(1.05);
            box-shadow: 0px 5px 15px rgba(255, 99, 132, 0.5);
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default QuestionGenerator;
