import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function StudentQuiz() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [quizResults, setQuizResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const [prn, setPrn] = useState('');
  const [role, setRole] = useState('');
  useEffect(() => {
    const storedPrn = sessionStorage.getItem('prn');
    const storedRole = sessionStorage.getItem('role');

    if (storedPrn) setPrn(storedPrn);
    if (storedRole) setRole(storedRole);
  }, []);

  useEffect(() => {
    if (showResults) {
      fetchQuizResults();
    } else {
      fetchQuizzes();
    }
  }, [showResults]);

  const fetchQuizResults = async () => {
    if (!prn) {
      console.error("PRN not found in session storage.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/QuizManagement/get-results-by-prn/${prn}`);
      let results = response.data;

      // Fetch quiz title for each result
      const updatedResults = await Promise.all(
        results.map(async (result) => {
          try {
            const quizResponse = await axios.get(`http://localhost:5000/api/QuizManagement/get-quiz/${result.quizId}`);
            return { ...result, quizTitle: quizResponse.data.quizTitle };
          } catch (error) {
            console.error(`Error fetching quiz title for quizId ${result.quizId}`, error);
            return { ...result, quizTitle: "Unknown Quiz" };
          }
        })
      );

      setQuizResults(updatedResults);
    } catch (error) {
      console.error("Error fetching results by PRN:", error);
      setQuizResults([]);
    }
  };

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/QuizManagement/getAll");
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="relative">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Quiz Management</h1>
            <h2 className="text-xl font-semibold">Quizzes</h2>

            <button
              className="bg-blue-500 text-white p-2 me-4"
              style={{ backgroundColor: "#007bff", color: "white", borderRadius: "5px" }}
              onClick={() => navigate("/GenrateQuiz")}
            >
              Practice Quiz
            </button>


            <button
              className="bg-blue-500 text-white p-2 mb-4"
              style={{ backgroundColor: "#007bff", color: "white", borderRadius: "5px" }}
              onClick={() => setShowResults(!showResults)}
            >
              {showResults ? "Show Quizzes" : "Show Quiz Results"}
            </button>

            {showResults ? (
              <div>
                <h2 className="text-xl font-semibold">Quiz Results</h2>

                {/* Quiz Results Table */}
                {quizResults.length === 0 ? (
                  <p>No results available.</p>
                ) : (
                  <Table striped bordered hover>
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border p-2">PRN</th>
                        <th className="border p-2">Quiz Title</th>
                        <th className="border p-2">Obtained Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quizResults.map((result) => (
                        <tr key={result.resultId} className="border">
                          <td className="border p-2">{result.prn}</td>
                          <td className="border p-2">{result.quizTitle}</td>
                          <td className="border p-2">{result.obtainedMarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </div>
            ) : (
              <div>
                {quizzes.length === 0 ? (
                  <p>No quizzes available.</p>
                ) : (
                  quizzes.map((quiz) => (
                    <div
                      key={quiz.quizId}
                      className="border p-5 rounded-xl shadow-lg bg-white w-full hover:shadow-xl transition flex justify-between items-center"
                    >
                  <div>
                  <h3 className="font-bold text-xl text-gray-800">{quiz.quizTitle}</h3>
                  <div className="mt-2 text-gray-700">
                    <p>
                      <span className="font-semibold">Date:</span> {new Date(quiz.date).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-semibold">Marks:</span> {quiz.marks}
                    </p>
                    
                  <p>
                    <span className="font-semibold">Start Time:</span> {new Date(`1970-01-01T${quiz.startTime}`).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}
                  </p>
                  <p>
                    <span className="font-semibold">End Time:</span> {new Date(`1970-01-01T${quiz.endTime}`).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}
                  </p>
                  </div>
                  <a
                    href={quiz.link} style={{ color: "#0000FF", backgroundColor: "black", padding: "5px 10px", borderRadius: "5px" }}
                  >
                    ➤ Go to Quiz
                  </a>
                </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
