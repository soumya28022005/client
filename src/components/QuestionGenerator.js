import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import VideoSolution from "./VideoSolution";

const QuestionGenerator = () => {
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [selectedClass, setSelectedClass] = useState("class-5"); // Default to class 5

  const classLevels = [
    { id: "class-1", label: "Class 1" },
    { id: "class-2", label: "Class 2" },
    { id: "class-3", label: "Class 3" },
    { id: "class-4", label: "Class 4" },
    { id: "class-5", label: "Class 5" },
    { id: "class-6", label: "Class 6" },
    { id: "class-7", label: "Class 7" },
    { id: "class-8", label: "Class 8" },
    { id: "class-9", label: "Class 9" },
    { id: "class-10", label: "Class 10" },
    { id: "class-11", label: "Class 11" },
    { id: "class-12", label: "Class 12" }
  ];

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
    setSelectedOption(null);
    setShowAnswer(false);
    try {
      const response = await axios.post(
        "https://exam-prep-rp4x.onrender.com/api/questions/generate-mcq",
        { topic, classLevel: selectedClass }
      );
      console.log(response);
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

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowAnswer(true);
    setQuestionsAnswered(prev => prev + 1);
    
    if (option === question.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const getOptionStyle = (option) => {
    if (!showAnswer || selectedOption !== option) {
      return {
        padding: "16px",
        margin: "12px 0",
        borderRadius: "12px",
        border: selectedOption === option ? "2px solid #007bff" : "1px solid #e0e0e0",
        cursor: "pointer",
        backgroundColor: selectedOption === option ? "#e6f2ff" : "#fff",
        transition: "all 0.3s ease",
        boxShadow: selectedOption === option 
          ? "0 4px 12px rgba(0, 123, 255, 0.15)" 
          : "0 2px 8px rgba(0, 0, 0, 0.05)",
        position: "relative", // Added position relative
        display: "flex",      // Added display flex
        alignItems: "center", // Added align items center
        justifyContent: "space-between" // Added justify content
      };
    }

    // Check if selected option is correct
    const isCorrect = option === question.correctAnswer;
    
    return {
      padding: "16px",
      margin: "12px 0",
      borderRadius: "12px",
      border: "2px solid",
      borderColor: isCorrect ? "#28a745" : "#dc3545",
      cursor: "pointer",
      backgroundColor: isCorrect ? "rgba(40, 167, 69, 0.1)" : "rgba(220, 53, 69, 0.1)",
      transition: "all 0.3s ease",
      boxShadow: isCorrect 
        ? "0 4px 12px rgba(40, 167, 69, 0.15)" 
        : "0 4px 12px rgba(220, 53, 69, 0.15)",
      position: "relative", // Added position relative
      display: "flex",      // Added display flex
      alignItems: "center", // Added align items center
      justifyContent: "space-between" // Added justify content
    };
  };

  const extractLetter = (option) => {
    const match = option.match(/^([A-D])\)/);
    return match ? match[1] : "";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        margin: "30px auto",
        maxWidth: "700px",
        minHeight: "600px",
        overflow: "hidden",
        padding: "0 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ 
          marginBottom: "30px",
          background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(99, 102, 241, 0.2)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            top: "-30px",
            left: "-30px",
          }}
        />
        <motion.div
          style={{
            position: "absolute",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            bottom: "-20px",
            right: "40px",
          }}
        />
        <h2 style={{ 
          fontSize: isMobile ? "24px" : "30px", 
          color: "#fff",
          margin: "0",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          AI-Powered Exam Preparation
        </h2>
        {questionsAnswered > 0 && (
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "15px"
          }}>
            <div style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              padding: "5px 15px",
              borderRadius: "20px",
              fontSize: "14px",
              color: "#fff"
            }}>
              Score: {score}/{questionsAnswered}
            </div>
            <div style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              padding: "5px 15px",
              borderRadius: "20px",
              fontSize: "14px",
              color: "#fff"
            }}>
              Accuracy: {questionsAnswered > 0 ? Math.round((score/questionsAnswered) * 100) : 0}%
            </div>
          </div>
        )}
      </motion.div>

      {/* Class Level Dropdown */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          marginBottom: "20px",
          background: "#fff",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.06)",
        }}
      >
        <h3 style={{
          margin: "0 0 15px 0",
          fontSize: "18px",
          color: "#4B5563",
          fontWeight: "600"
        }}>
          Select Class Level
        </h3>
        <div style={{
          display: "flex",
          width: "100%",
          maxWidth: "300px",
          position: "relative"
        }}>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: "16px",
              borderRadius: "12px",
              border: "1px solid #e0e0e0",
              backgroundColor: "#fff",
              appearance: "none", // Removes default arrow
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              color: "#4B5563",
              fontWeight: "500",
              transition: "all 0.2s ease",
              outline: "none"
            }}
          >
            {classLevels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.label}
              </option>
            ))}
          </select>
          <div style={{
            position: "absolute",
            right: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none"
          }}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              width="18" 
              height="18" 
              fill="none" 
              stroke="#6366F1" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Search Box */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: isMobile ? "column" : "row",
          gap: "12px",
          width: "100%",
          marginBottom: "30px",
          background: "#fff",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div style={{ 
          display: "flex", 
          alignItems: "center",
          width: isMobile ? "100%" : "70%", 
          position: "relative",
          backgroundColor: "#f5f7fa",
          borderRadius: "12px",
          padding: "4px",
        }}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            width="24" 
            height="24" 
            fill="none" 
            stroke="#6366F1" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ margin: "0 8px" }}
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <motion.input
            type="text"
            placeholder="Enter a topic (e.g., Physics, History, Art...)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={handleKeyPress}
            style={{
              padding: "12px 8px",
              borderRadius: "8px",
              border: "none",
              width: "100%",
              fontSize: "16px",
              outline: "none",
              backgroundColor: "transparent",
            }}
            whileFocus={{ boxShadow: "0px 0px 0px 2px rgba(99, 102, 241, 0.2)" }}
          />
        </div>

        <motion.button
          onClick={generateQuestion}
          disabled={loading}
          style={{
            padding: "14px 24px",
            fontSize: "16px",
            borderRadius: "12px",
            border: "none",
            backgroundColor: loading ? "#a5a7f3" : "#6366F1",
            color: "#fff",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 14px rgba(99, 102, 241, 0.2)",
            width: isMobile ? "100%" : "auto",
            fontWeight: "600",
            letterSpacing: "0.5px",
          }}
          whileHover={{ scale: 1.03, boxShadow: "0 6px 20px rgba(99, 102, 241, 0.3)" }}
          whileTap={{ scale: 0.97 }}
        >
          {loading ? (
            <span className="loader"></span>
          ) : (
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              Generate
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                width="18" 
                height="18" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{ marginLeft: "8px" }}
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </span>
          )}
        </motion.button>
      </motion.div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        {question && !loading && (
          <motion.div 
            key={question.question}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ 
              background: "#fff", 
              borderRadius: "16px",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.06)",
              overflow: "hidden",
              padding: "25px",
              marginBottom: "20px",
              textAlign: "left",
              position: "relative",
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "6px",
                background: "linear-gradient(90deg, #6366F1, #8B5CF6)",
              }}
            />
            
            <motion.h3 
              variants={itemVariants}
              style={{ 
                fontSize: "20px", 
                marginBottom: "25px",
                fontWeight: "600",
                lineHeight: "1.5",
                color: "#111827",
              }}
            >
              {question.question}
            </motion.h3>

            {/* Display difficulty level tag */}
            <motion.div
              variants={itemVariants}
              style={{
                display: "inline-block",
                padding: "4px 10px",
                backgroundColor: "rgba(99, 102, 241, 0.1)",
                color: "#6366F1",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "15px"
              }}
            >
              {classLevels.find(level => level.id === selectedClass)?.label || "Class 5"} Level
            </motion.div>

            {/* Options Container */}
            <div>
              {question.options.map((option, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  onClick={() => !showAnswer && handleOptionSelect(option)}
                  style={getOptionStyle(option)}
                  whileHover={!showAnswer ? { 
                    scale: 1.02, 
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
                  } : {}}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      backgroundColor: selectedOption === option ? 
                        (showAnswer ? 
                          (option === question.correctAnswer ? "#28a745" : "#dc3545") 
                          : "#6366F1") 
                        : "#f3f4f6",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "16px",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: selectedOption === option ? "#fff" : "#4b5563",
                      transition: "all 0.3s ease",
                      boxShadow: selectedOption === option ? 
                        "0 2px 6px rgba(0, 0, 0, 0.1)" : "none",
                    }}>
                      {extractLetter(option)}
                    </div>
                    <span style={{
                      color: "#1f2937",
                      fontSize: "16px",
                      fontWeight: selectedOption === option ? "500" : "normal",
                    }}>
                      {option}
                    </span>
                  </div>
                  
                  {/* Show check or x mark for answered questions */}
                  {showAnswer && (
                    <div style={{
                      marginRight: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      {option === question.correctAnswer ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      ) : selectedOption === option ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc3545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      ) : null}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            
            {/* Show correct answer when wrong option is selected */}
            <AnimatePresence>
              {showAnswer && selectedOption !== question.correctAnswer && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    marginTop: "20px",
                    padding: "16px",
                    backgroundColor: "rgba(40, 167, 69, 0.08)",
                    borderRadius: "12px",
                    border: "1px solid rgba(40, 167, 69, 0.3)",
                  }}
                >
                  <p style={{ 
                    margin: 0, 
                    fontWeight: "600", 
                    color: "#28a745",
                    display: "flex",
                    alignItems: "center",
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}>
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    Answer: {question.correctAnswer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Next Question button that appears after answering */}
            <AnimatePresence>
              {showAnswer && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  onClick={generateQuestion}
                  style={{
                    marginTop: "25px",
                    padding: "14px 20px",
                    fontSize: "16px",
                    fontWeight: "600",
                    borderRadius: "12px",
                    border: "none",
                    backgroundColor: "#10B981",
                    color: "#fff",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                  whileHover={{ scale: 1.02, boxShadow: "0 6px 16px rgba(16, 185, 129, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Next Question
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "8px" }}>
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Initial prompt if no question */}
      {!question && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            backgroundColor: "#f3f4f6",
            borderRadius: "16px",
            padding: "30px",
            marginTop: "20px",
            boxShadow: "inset 0 2px 6px rgba(0, 0, 0, 0.05)",
            textAlign: "center",
          }}
        >
          <div style={{ 
            width: "70px", 
            height: "70px", 
            margin: "0 auto 20px",
            borderRadius: "50%",
            backgroundColor: "rgba(99, 102, 241, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <h3 style={{ color: "#374151", marginTop: "0" }}>Ready to test your knowledge?</h3>
          <p style={{ color: "#6B7280", fontSize: "16px", lineHeight: "1.6" }}>
            Select your class level and enter a topic to create a custom quiz question.
          </p>
          <p style={{ color: "#6B7280", fontSize: "14px", marginTop: "20px" }}>
            Try topics like: Physics, World History, Literature, Computer Science...
          </p>
        </motion.div>
      )}

      {/* Loading State */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
            backgroundColor: "#f3f4f6",
            borderRadius: "16px",
            margin: "20px 0",
          }}
        >
          <div className="fancy-loader"></div>
          <p style={{ marginTop: "20px", color: "#6B7280" }}>
            Generating your {classLevels.find(level => level.id === selectedClass)?.label || "Class 5"} level question...
          </p>
        </motion.div>
      )}

      {question && showAnswer && <VideoSolution topic={question.question} classLevel={selectedClass} />}

      {/* CSS Animations */}
      <style>
        {`
          .loader {
            width: 18px;
            height: 18px;
            border: 2px solid #fff;
            border-top: 2px solid transparent;
            border-radius: 50%;
            display: inline-block;
            animation: spin 0.8s linear infinite;
          }
          
          .fancy-loader {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(99, 102, 241, 0.2);
            border-top: 3px solid #6366F1;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          button.next-btn:hover {
            background-color: #0ea572 !important;
          }

          button:hover {
            transform: translateY(-2px);
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes pulse {
            0% { transform: scale(0.95); opacity: 0.7; }
            50% { transform: scale(1); opacity: 1; }
            100% { transform: scale(0.95); opacity: 0.7; }
          }
          
          select:focus {
            border-color: #6366F1;
            box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
          }
          
          select:hover {
            border-color: #6366F1;
          }
        `}
      </style>
    </div>
  );
};

export default QuestionGenerator;