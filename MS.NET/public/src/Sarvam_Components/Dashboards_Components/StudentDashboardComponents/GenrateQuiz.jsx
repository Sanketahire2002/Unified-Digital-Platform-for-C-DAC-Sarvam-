import React, { useState, useEffect } from "react";

const AdminQuiz = () => {
  
  const [modules, setModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/MasterModule");
        const data = await response.json();
        setModules(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    fetchModules();
  }, []);

  const fetchQuiz = async () => {
    if (!selectedModuleId) return;

    try {
      const response = await fetch("http://localhost:5000/api/Quiz/GenerateQuiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId: Number(selectedModuleId), questionCount: 20 }),
      });

      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  const handleAnswerChange = (questionId, selectedAnswer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedAnswer }));
  };

  const submitQuiz = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/Quiz/SubmitAnswers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          questions.map((q) => ({ questionId: q.questionId, selectedAnswer: answers[q.questionId] || "" }))
        ),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  const resetQuiz = () => {
    setSelectedModuleId("");
    setQuestions([]);
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="p-2 max-w-lg mx-auto bg-gray-100 rounded-xl shadow-md space-y-6">
      {!questions.length ? (
        <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold mb-4">Start a Quiz</h2>
        <div className="w-full flex flex-col items-center">
          <select
            value={selectedModuleId}
            onChange={(e) => setSelectedModuleId(e.target.value)}
            className="border p-3 w-72 rounded-md mb-4"
          >
            <option value="">Select a Module</option>
            {modules.map((mod) => (
              <option key={mod.moduleId} value={mod.moduleId}>
                {mod.moduleName}
              </option>
            ))}
          </select>
          <button
            className="bg-blue-500 text-white p-2 me-4"
            style={{ backgroundColor: "#007bff", color: "white", borderRadius: "5px" }}
            onClick={fetchQuiz}
            disabled={!selectedModuleId}
          >
            Start Quiz
          </button>
        </div>
      </div>
      
      ) : result ? (
        <div className="text-center bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-green-600">Quiz Results</h2>
          <p className="mt-2 text-lg">Total Questions: <span className="font-bold">{result.totalQuestions}</span></p>
          <p className="text-lg">Correct Answers: <span className="font-bold">{result.correctAnswers}</span></p>
          <p className="text-lg">Total Marks: <span className="font-bold">{result.totalMarks}</span></p>
          <button
            className="bg-blue-500 text-white p-2 me-4"
            style={{ backgroundColor: "#007bff", color: "white", borderRadius: "5px" }}
            onClick={resetQuiz}
          >
            Back
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-center">Quiz Questions</h2>
          {questions.map((q, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow mb-4">
              <p className="font-semibold text-xl">Q{index + 1}. {q.questionText}</p>
              <div className="mt-3 space-y-3">
                {[q.option1, q.option2, q.option3, q.option4].map((option, idx) => (
                  <label key={idx} className="flex items-center space-x-4 cursor-pointer hover:bg-gray-50 p-2 rounded-md">
                    <input
                      type="radio"
                      name={`question-${q.questionId}`}
                      value={option}
                      checked={answers[q.questionId] === option}
                      onChange={(e) => handleAnswerChange(q.questionId, e.target.value)}
                      className="form-radio h-6 w-6 text-blue-600"
                    />
                    <span className="text-lg text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            className="bg-blue-500 text-white p-2 me-4"
            style={{ backgroundColor: "#007bff", color: "white", borderRadius: "5px" }}
            onClick={submitQuiz}
          >
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminQuiz;
