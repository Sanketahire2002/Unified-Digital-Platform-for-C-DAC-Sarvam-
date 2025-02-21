import React, { useEffect, useState, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Test = () => {
  const [warningCount, setWarningCount] = useState(0);
  const [warningMessage, setWarningMessage] = useState("");
  const [isDisqualified, setIsDisqualified] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [answers, setAnswers] = useState({}); // Store user's answers to questions
  const [score, setScore] = useState(null); // Store score after submission
  const [showModal, setShowModal] = useState(false); // Flag to show score modal
  const videoRef = useRef(null); // Reference to the video element
  const [isVideoEnabled, setIsVideoEnabled] = useState(false); // Flag to track if video is enabled
  const [prn, setPrn] = useState('');
  const [sessionFirstName, setFirstName] = useState('');
  const [sessionLastName, setlastName] = useState('');
  useEffect(() => {
    setPrn(sessionStorage.getItem('prn'));
    setFirstName(sessionStorage.getItem('firstName'));
    setlastName(sessionStorage.getItem('lastName'));
  }, []);
  // List of MCQs
  const questions = [
    { id: 1, text: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Rome"], correctAnswer: "Paris" },
    { id: 2, text: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Venus", "Jupiter"], correctAnswer: "Mars" },
    { id: 3, text: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Dickens", "Hemingway", "Austen"], correctAnswer: "Shakespeare" },
    { id: 4, text: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], correctAnswer: "Pacific" },
    { id: 5, text: "What is the square root of 64?", options: ["6", "8", "10", "12"], correctAnswer: "8" },
    { id: 6, text: "Who painted the Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Rembrandt"], correctAnswer: "Da Vinci" },
    { id: 7, text: "Which element has the chemical symbol 'O'?", options: ["Oxygen", "Osmium", "Ozone", "Oganesson"], correctAnswer: "Oxygen" },
    { id: 8, text: "In which year did the Titanic sink?", options: ["1912", "1920", "1905", "1898"], correctAnswer: "1912" },
    { id: 9, text: "What is the largest mammal?", options: ["Elephant", "Blue Whale", "Giraffe", "Shark"], correctAnswer: "Blue Whale" },
    { id: 10, text: "What is the currency of Japan?", options: ["Yuan", "Won", "Yen", "Ringgit"], correctAnswer: "Yen" },
  ];

  // Function to calculate score after submitting answers
  const calculateScore = () => {
    const isConfirmed = window.confirm("Are you sure you want to start the quiz?");
    if (!isConfirmed) {
      return;
    }
    let totalCorrect = 0;

    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        totalCorrect++;
      }
    });

    setScore(totalCorrect); // Set the score
    setShowModal(true); // Show the modal with score
    setTimeout(() => window.close(), 5000); // Close window after 5 seconds
  };

  // Function to handle answers change for questions
  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  // Start video stream
  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsVideoEnabled(true);
    } catch (err) {
      console.error("Error accessing webcam:", err);
      setIsVideoEnabled(false);
    }
  };

  useEffect(() => {
    startVideo();

    // Cleanup: stop the webcam stream when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  // Detect if the window loses focus (minimized, switched tabs, etc.)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setWarningCount((prevCount) => prevCount + 1);
        if (warningCount >= 9) {
          setIsDisqualified(true);
        } else {
          setWarningMessage("You have switched tabs or minimized the window.");
          setTimeout(() => {
            setWarningMessage(""); // Clear the warning message after 3 seconds
          }, 3000); // Disable warning message after 3 seconds
        }
      }
    };

    const handleBlur = () => {
      setWarningCount((prevCount) => prevCount + 1);
      if (warningCount >= 9) {
        setIsDisqualified(true);
      } else {
        setWarningMessage("You have switched tabs or minimized the window.");
        setTimeout(() => {
          setWarningMessage(""); // Clear the warning message after 3 seconds
        }, 3000); // Disable warning message after 3 seconds
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, [warningCount]);

  useEffect(() => {
    if (isDisqualified && countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            window.close(); // Close the window when countdown hits 0
            clearInterval(interval);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);

      return () => clearInterval(interval); // Cleanup the interval when the component unmounts or countdown changes
    }
  }, [isDisqualified, countdown]);

  return (
    <div className="container mt-5">
      {/* Warning Message */}
      {warningMessage && !isDisqualified && (
        <div
          className="alert alert-danger text-center fadeInDown"
          role="alert"
          style={{ position: "fixed", top: "10%", left: "50%", transform: "translateX(-50%)", zIndex: 999 }}
        >
          {warningMessage}
        </div>
      )}

      {/* Disqualification Full-Screen Overlay */}
      {isDisqualified && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            zIndex: 1000,
          }}
        >
          <div className="text-center">
            <p style={{ fontSize: "32px", color: "red" }}>🚨 You Have Been Disqualified! 🚨</p>
            <p>Closing in {countdown} seconds...</p>
          </div>
        </div>
      )}

      {/* Main Test Content */}
      <div
        style={{
          position: "fixed",
          top: "10px",
          left: "10px",
          zIndex: 999, // Ensure it stays on top of other content
          textAlign: "left",
        }}
      >

        <p style={{ color: "red" }}>Do not minimize <br />
          Do not switch tabs<br />
          Do not  open other applications.</p>

        {/* Warning Message */}
        {warningMessage && !isDisqualified && (
          <div
            className="alert alert-danger text-center fadeInDown"
            role="alert"
            style={{
              position: "fixed",
              top: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 999,
            }}
          >
            <strong>Warning:</strong> {warningMessage}
          </div>
        )}

        <p style={{ color: "red" }}>Warnings: {warningCount}/10</p>

        {/* Show Total Marks */}
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>
          Total Marks: {questions.length} <br />
          Time: 30 minutes
        </p>
      </div>

      {/* Video Box */}
      <div className="text-center mt-4" style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: 999 // Ensure it is on top of other elements
      }}>
        <h2>PRN: {prn}</h2>
        <h2>Name: {sessionFirstName + " " + sessionLastName}</h2>
        <h2 className="text-success  mt-5">Self Video</h2>
        <div
          className="border border-secondary rounded mb-3 shadow-lg"
          style={{ width: "320px", height: "240px", overflow: "hidden" }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          ></video>
        </div>
        {!isVideoEnabled && <p>Unable to access webcam.</p>}
      </div>

      {/* MCQ Questions */}
      <div>
        <h2 className="text-center mb-4 text-dark">C-DAC Test - Multiple Choice Questions</h2>
        {questions.map((question, index) => (
          <div key={question.id} className="card mb-4 shadow-lg">
            <div className="card-body">
              {/* Display Question Number */}
              <h5 className="card-title text-primary">
                Q.{index + 1} : {question.text}
              </h5>
              <div className="form-check">
                {question.options.map((option, index) => (
                  <div key={index} className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={() => handleAnswerChange(question.id, option)}
                    />
                    <label className="form-check-label">{option}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="text-center mt-4">
        <button className="btn btn-primary btn-lg" onClick={calculateScore}>Submit Answers</button>
      </div>

      {/* Right Panel for Question List with color indication */}
      <div
        className="d-flex flex-column align-items-start position-fixed"
        style={{ top: "200px", left: "100px", zIndex: 999, width: "200px" }}
      >
        <h3 className="text-primary">Question List</h3>
        <div className="list-group">
          {questions.map((question, index) => (
            <button
              key={question.id}
              className={`list-group-item list-group-item-action ${answers[question.id] ? "bg-success text-white" : "bg-secondary text-white"}`}
              style={{ marginBottom: "5px" }}
            >
              Q{index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Modal to show the score */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Your Score</h5>
                <button type="button" className="close" data-dismiss="modal" onClick={() => setShowModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body text-center">
                <p style={{ fontSize: "24px", color: "green" }}>
                  Your score: {score} / {questions.length}
                </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => window.close()}>
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
