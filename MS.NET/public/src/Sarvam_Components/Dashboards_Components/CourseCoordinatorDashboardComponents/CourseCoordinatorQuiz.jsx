import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Table } from "react-bootstrap";

export default function CourseCoordinatorQuiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [newQuiz, setNewQuiz] = useState({
    quizTitle: "",
    marks: 0,
    link: "",
    startTime: "",
    endTime: "",
    date: "",
  });
  const [editQuizId, setEditQuizId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [editingQuiz, setEditingQuiz] = useState(false);

  const [quizResults, setQuizResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [newResult, setNewResult] = useState({ prn: "", quizTitle: "", obtainedMarks: "" });
  const [prn, setPrn] = useState("");
  const [editingResult, setEditingResult] = useState(null);
  const [showFormResult, setShowFormResult] = useState(false);

  useEffect(() => {
    if (showResults) {
      fetchQuizResults();
    } else {
      fetchQuizzes();
    }
  }, [showResults]);

  // // Fetch all quiz results
  // const fetchQuizResults = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/api/QuizManagement/results");
  //     setQuizResults(response.data);
  //   } catch (error) {
  //     console.error("Error fetching results:", error);
  //     setQuizResults([]);
  //   }
  // };

  // Fetch results by PRN
  const handleFetchResultsByPRN = async () => {
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

      console.log(updatedResults);
  
      setQuizResults(updatedResults);
    } catch (error) {
      console.error("Error fetching results by PRN:", error);
      setQuizResults([]);
    }
  };
  

  // Add or Update Result
  const handleAddOrUpdateResult = async (e) => {
    e.preventDefault();
    try {
      const quizTitle = newResult.quizTitle;
  
      // Fetch quiz ID by title
      const quizResponse = await axios.get(`http://localhost:5000/api/QuizManagement/get-quiz-by-title/${quizTitle}`);
      
      if (!quizResponse.data || !quizResponse.data.quizId) {
        throw new Error("Quiz not found");
      }
  
      const quizId = quizResponse.data.quizId;
      
      if (editingResult) {
        // Update existing result
        const updateData = {
          prn: newResult.prn,
          quizId: quizId,
          obtainedMarks: newResult.obtainedMarks
        };

        console.log(updateData);
  
        await axios.put(`http://localhost:5000/api/QuizManagement/update-result/${editingResult.resultId}`, updateData);
      } else {
        // Add new result
        const addData = {
          prn: newResult.prn,
          quizId: quizId,
          obtainedMarks: newResult.obtainedMarks
        };

        console.log(addData);
  
        const response = await axios.post("http://localhost:5000/api/QuizManagement/add-result", addData);
        setQuizResults([...quizResults, response.data]);
      }
  
      // Close modal and refresh results
      setShowFormResult(false);
      setEditingResult(null);
      fetchQuizResults();
  
    } catch (error) {
      console.error("Error adding/updating result:", error);
    }
  };

  const handleUpdateResult = async (resultId, field, value) => {
    try {
      const updatedResults = quizResults.map((result) =>
        result.resultId === resultId ? { ...result, [field]: value } : result
      );
      setQuizResults(updatedResults);
  
      // Prepare update payload with resultId
      const updatedResult = updatedResults.find((r) => r.resultId === resultId);
      const updateData = {
        resultId: updatedResult.resultId,  // Include resultId
        prn: updatedResult.prn,
        quizId: updatedResult.quizId,
        obtainedMarks: updatedResult.obtainedMarks,
      };
  
      console.log("Updating result:", updateData);
  
      // Send update request
      await axios.put(`http://localhost:5000/api/QuizManagement/update-result/${resultId}`, updateData);
    } catch (error) {
      console.error("Error updating result:", error);
    }
  };
  

  // Delete result
  const handleDeleteResult = async (resultId) => {
    try {
      await axios.delete(`http://localhost:5000/api/QuizManagement/delete-result/${resultId}`);
      fetchQuizResults(); // Refresh results
    } catch (error) {
      console.error("Error deleting result:", error);
    }
  };

  // Handle input change
  const handleResultInputChange = (e) => {
    const { name, value } = e.target;
    setNewResult({ ...newResult, [name]: value });
  };

  // Open modal for editing
  const handleEditResult = (result) => {
    setNewResult(result);
    setEditingResult(result);
    setShowFormResult(true);
  };
  

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/QuizManagement/getAll");
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes", error);
    }
  };

  const fetchQuizResults = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/QuizManagement/results");
      const results = response.data;
  
      // Fetch quiz titles for each result
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
      console.error("Error fetching quiz results", error);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuiz((prevQuiz) => ({ ...prevQuiz, [name]: value }));
  };

  const handleAddQuiz = async (e) => {
    e.preventDefault();
    // Basic validation
    const validationErrors = {};
    if (!newQuiz.quizTitle) validationErrors.quizTitle = "Quiz title is required.";
    if (!newQuiz.marks) validationErrors.marks = "Marks are required.";
    if (!newQuiz.startTime) validationErrors.startTime = "Start time is required.";
    if (!newQuiz.endTime) validationErrors.endTime = "End time is required.";
    if (!newQuiz.link) validationErrors.link = "Quiz link is required.";
    if (!newQuiz.date) validationErrors.date = "Date is required.";
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post("http://localhost:5000/api/QuizManagement/add-quiz", newQuiz);
        fetchQuizzes();
        setShowForm(false); // Close form after adding
      } catch (error) {
        console.error("Error adding quiz", error);
      }
    }
  };

  const handleUpdateQuiz = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!newQuiz.quizTitle) validationErrors.quizTitle = "Quiz title is required.";
    if (!newQuiz.marks) validationErrors.marks = "Marks are required.";
    if (!newQuiz.startTime) validationErrors.startTime = "Start time is required.";
    if (!newQuiz.endTime) validationErrors.endTime = "End time is required.";
    if (!newQuiz.link) validationErrors.link = "Quiz link is required.";
    if (!newQuiz.date) validationErrors.date = "Date is required.";
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.put(`http://localhost:5000/api/QuizManagement/update-quiz/${editQuizId}`, newQuiz);
        fetchQuizzes();
        setShowForm(false); // Close form after updating
        setEditQuizId(null); // Reset edit state
      } catch (error) {
        console.error("Error updating quiz", error);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setErrors({});
    setEditingQuiz(false);
  };

  const handleEdit = (quiz) => {
    setNewQuiz({
      quizTitle: quiz.quizTitle,
      marks: quiz.marks,
      link: quiz.link,
      startTime: quiz.startTime,
      endTime: quiz.endTime,
      date: quiz.date,
    });
    setEditQuizId(quiz.quizId);
    setEditingQuiz(true);
    setShowForm(true);
  };

  const deleteQuiz = async (quizId) => {
    const confirmation = window.confirm("Are you sure you want to delete this quiz?");
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:5000/api/QuizManagement/delete-quiz/${quizId}`);
        fetchQuizzes();
      } catch (error) {
        console.error("Error deleting quiz", error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="relative">
      {/* Add/Update Quiz Modal */}
      <Modal show={showForm} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>{editingQuiz ? "Update Quiz" : "Add New Quiz"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editingQuiz ? handleUpdateQuiz : handleAddQuiz}>
            <Form.Group className="mb-3">
              <Form.Label>Quiz Title</Form.Label>
              <Form.Control
                type="text"
                name="quizTitle"
                value={newQuiz.quizTitle}
                onChange={handleInputChange}
                isInvalid={!!errors.quizTitle}
              />
              <Form.Control.Feedback type="invalid">
                {errors.quizTitle}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Marks</Form.Label>
              <Form.Control
                type="number"
                name="marks"
                value={newQuiz.marks}
                onChange={handleInputChange}
                isInvalid={!!errors.marks}
              />
              <Form.Control.Feedback type="invalid">
                {errors.marks}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={newQuiz.date}
                onChange={handleInputChange}
                isInvalid={!!errors.date}
              />
              <Form.Control.Feedback type="invalid">
                {errors.date}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                name="startTime"
                value={newQuiz.startTime}
                onChange={handleInputChange}
                isInvalid={!!errors.startTime}
              />
              <Form.Control.Feedback type="invalid">
                {errors.startTime}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                name="endTime"
                value={newQuiz.endTime}
                onChange={handleInputChange}
                isInvalid={!!errors.endTime}
              />
              <Form.Control.Feedback type="invalid">
                {errors.endTime}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quiz Link</Form.Label>
              <Form.Control
                type="text"
                name="link"
                value={newQuiz.link}
                onChange={handleInputChange}
                isInvalid={!!errors.link}
              />
              <Form.Control.Feedback type="invalid">
                {errors.link}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="text-center">
              <Button type="submit" variant="success" className="mr-2">
                {editingQuiz ? "Update" : "Add"}
              </Button>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      
      {/* Quiz List */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Quiz Management</h1>
        <h2 className="text-xl font-semibold">Quizzes</h2>

        
        <button
        className="bg-blue-500 text-white p-2 me-4"
        style={{ backgroundColor: "#007bff", color: "white", borderRadius: "5px" }}
        onClick={() => setShowResults(!showResults)}
        >
          {showResults ? "Show Quizzes" : "Show Quiz Results"}
        </button>
        
        {showResults ? (
        <div>
          <h2 className="text-xl font-semibold">Quiz Results</h2>

                {/* Add Result Button */}
          <Button className="bg-blue-500 text-white p-2 me-4"
            style={{ backgroundColor: "#007bff", color: "white", borderRadius: "5px" }}
             onClick={() => setShowFormResult(true)}>
            Add Result
          </Button>

          {/* Filter by PRN */}
          <div className="mb-4">
            <input
              type="text"
              className="border p-2 mr-2"
              placeholder="Enter PRN"
              value={prn}
              onChange={(e) => setPrn(e.target.value)}
            />
            <Button variant="primary" onClick={handleFetchResultsByPRN}>
              Get Results by PRN
            </Button>
          </div>

          {/* Modal for Adding/Editing Result */}
          <Modal show={showFormResult} onHide={() => setShowFormResult(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>{editingResult ? "Update Quiz Result" : "Add Quiz Result"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleAddOrUpdateResult}>
                <Form.Group className="mb-3">
                  <Form.Label>Student PRN</Form.Label>
                  <Form.Control
                    type="text"
                    name="prn"
                    value={newResult.prn}
                    onChange={handleResultInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Quiz Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="quizTitle"
                    value={newResult.quizTitle}
                    onChange={handleResultInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Obtained Marks</Form.Label>
                  <Form.Control
                    type="number"
                    name="obtainedMarks"
                    value={newResult.obtainedMarks}
                    onChange={handleResultInputChange}
                    required
                  />
                </Form.Group>
                <div className="text-center">
                  <Button type="submit" variant="success" className="me-2">
                    {editingResult ? "Update" : "Submit"}
                  </Button>
                  <Button variant="secondary" onClick={() => setShowFormResult(false)}>
                    Cancel
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>

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
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizResults.map((result) => (
            <tr key={result.resultId} className="border">
              <td className="border p-2">{result.prn}</td>
              <td className="border p-2">{result.quizTitle}</td>
              <td className="border p-2">
                <input
                  type="number"
                  value={result.obtainedMarks}
                  onChange={(e) => handleUpdateResult(result.resultId, "obtainedMarks", e.target.value)}
                  onBlur={(e) => handleUpdateResult(result.resultId, "obtainedMarks", e.target.value)}
                  className="form-control"
                />
              </td>
              <td className="border p-2">
                <Button variant="danger" size="sm" onClick={() => handleDeleteResult(result.resultId)}>
                  Delete
                </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}


        </div>
        ) : (
        <div>
          {/* Add Quiz Button */}
          <div className="mt-4 p-6">
            <button
              className="bg-blue-500 text-white p-2 me-4"
              style={{ backgroundColor: "#007bff", color: "white", borderRadius: "5px" }}
              onClick={() => {
                setEditingQuiz(false);
                setNewQuiz({
                  quizTitle: "",
                  marks: 0,
                  link: "",
                  startTime: "",
                  endTime: "",
                  date: "",
                });
                setShowForm(true);
              }}
            >
              Add New Quiz
            </button>
          </div>
            
          {quizzes.length === 0 ? (
            <p>No quizzes available.</p>
          ) : (
            // <div className="container mx-auto px-4">
            // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            quizzes.map((quiz) => (
              <div
                key={quiz.quizId}
                className="border p-5 rounded-xl shadow-lg bg-white w-full hover:shadow-xl transition flex justify-between items-center"
              >
                {/* Quiz Details (Left Side) */}
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
                
                {/* Edit & Delete Buttons (Right Side) */}
                <div className="flex space-x-3" style={{ marginTop: "10px" }}>
                  <button 
                    onClick={() => handleEdit(quiz)}
                    className="bg-blue-500 text-white p-2 me-4"
                    style={{ backgroundColor: "#007bff", color: "white", borderRadius: "5px" }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => deleteQuiz(quiz.quizId)}
                    className="bg-blue-500 text-white p-2 me-4"
                     style={{ backgroundColor: "#007bff", color: "white", borderRadius: "5px" }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))          
            // {/* </div>
          // </div> */}

          )}
        </div>
        )}
      </div>
      
    </div>
    </div>
    </div>
  );
}
