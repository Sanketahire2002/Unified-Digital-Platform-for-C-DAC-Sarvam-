import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Quiz = () => {
  const openTestPage = () => {
    // Show confirmation before starting the quiz
    const isConfirmed = window.confirm("Are you sure you want to start the quiz?");

    if (isConfirmed) {
      const testWindow = window.open("/give-test-browser", "_blank", "width=" + screen.width + ",height=" + screen.height);
      if (testWindow) {
        testWindow.moveTo(0, 0);
        testWindow.resizeTo(screen.width, screen.height);
      } else {
        alert("Please allow pop-ups for this site!");
      }
    } else {
    }
  };

  return (
    <div className="container text-center" style={{ marginTop: "100px" }}>
      <div className="card shadow-lg p-4 mb-5 bg-white rounded">
        <h1 className="display-4 text-primary mb-4">Welcome to the Quiz</h1>
        <p className="lead mb-4 text-muted">Click the button below to start the test. Make sure your pop-ups are allowed!</p>
        <button
          onClick={openTestPage}
          className="btn btn-primary btn-lg px-5 py-3"
          style={{ fontSize: "18px", borderRadius: "30px" }}
        >
          Start Test
        </button>
      </div>
      <footer className="mt-5">
      </footer>
    </div>
  );
};

export default Quiz;
