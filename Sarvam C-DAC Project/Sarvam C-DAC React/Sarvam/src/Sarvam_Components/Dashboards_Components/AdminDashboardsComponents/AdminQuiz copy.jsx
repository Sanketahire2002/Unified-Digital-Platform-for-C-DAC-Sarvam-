import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Modal } from 'react-bootstrap';

const AdminQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [newQuiz, setNewQuiz] = useState({
    quizTitle: '',
    marks: '',
    date: '',
    startTime: '',
    endTime: '',
    link: '',
  });
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null); // To store quiz to be edited

  // Fetch quizzes from the backend
  const fetchQuizzes = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/quizzes');
      const data = await response.json();
      setQuizzes(data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuiz((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newQuiz.quizTitle.trim()) {
      newErrors.quizTitle = 'Quiz Title is required.';
    }
    if (!newQuiz.marks || isNaN(newQuiz.marks) || newQuiz.marks <= 0) {
      newErrors.marks = 'Marks must be a positive number.';
    }
    if (!newQuiz.date) {
      newErrors.date = 'Date is required.';
    }
    if (!newQuiz.startTime) {
      newErrors.startTime = 'Start Time is required.';
    }
    if (!newQuiz.endTime) {
      newErrors.endTime = 'End Time is required.';
    } else if (newQuiz.startTime && newQuiz.endTime <= newQuiz.startTime) {
      newErrors.endTime = 'End Time must be later than Start Time.';
    }
    if (!newQuiz.link.trim()) {
      newErrors.link = 'Quiz Link is required.';
    } else if (!/^https?:\/\/[^\s]+$/.test(newQuiz.link)) {
      newErrors.link = 'Quiz Link must be a valid URL.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddQuiz = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:8080/api/quizzes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newQuiz),
        });
        if (response.ok) {
          const addedQuiz = await response.json();
          setQuizzes([...quizzes, addedQuiz]);
          setNewQuiz({
            quizTitle: '',
            marks: '',
            date: '',
            startTime: '',
            endTime: '',
            link: '',
          });
          setShowForm(false);
        }
      } catch (error) {
        console.error('Error adding quiz:', error);
      }
    }
  };

  const handleCancel = () => {
    setErrors({});
    setNewQuiz({
      quizTitle: '',
      marks: '',
      date: '',
      startTime: '',
      endTime: '',
      link: '',
    });
    setShowForm(false);
    setEditingQuiz(null); // Reset editing quiz
  };

  // Handle quiz update
  const handleUpdateQuiz = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        console.error('Error adding quiz:', editingQuiz.quizId)
        const response = await fetch(`http://localhost:8080/api/quizzes/${editingQuiz.quizId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newQuiz),
        });
        if (response.ok) {
          const updatedQuiz = await response.json();
          setQuizzes(
            quizzes.map((quiz) => (quiz.quizId === updatedQuiz.quizId ? updatedQuiz : quiz))
          );
          handleCancel();
        }
      } catch (error) {
        console.error('Error updating quiz:', error);
      }
    }
  };

  // Handle quiz deletion
  const handleDeleteQuiz = async (quizId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/quizzes/${quizId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setQuizzes(quizzes.filter((quiz) => quiz.quizId !== quizId));
      }
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  const handleEditQuiz = (quiz) => {
    setEditingQuiz(quiz);
    setNewQuiz({
      quizTitle: quiz.quizTitle,
      marks: quiz.marks,
      date: quiz.date,
      startTime: quiz.startTime,
      endTime: quiz.endTime,
      link: quiz.link,
    });
    setShowForm(true);
  };

  return (
    <div>
      <h2 className="text-center my-4">Quiz</h2>
      <Table bordered>
        <thead className="table-header table-dark">
          <tr>
            <th>Quiz Title</th>
            <th>Marks</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz, index) => (
            <tr key={index} className="table-row">
              <td>{quiz.quizTitle}</td>
              <td>{quiz.marks}</td>
              <td>{quiz.date}</td>
              <td>{quiz.startTime}</td>
              <td>{quiz.endTime}</td>
              <td>
                <a
                  href={quiz.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-style admin-assignment-custom-link"
                >
                  Click Here
                </a>
              </td>
              <td>
                <Button variant="warning" onClick={() => handleEditQuiz(quiz)} className="mr-2">
                  Update
                </Button>
                <Button variant="danger" onClick={() => handleDeleteQuiz(quiz.quizId)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="text-center">
        <Button className="mt-4" onClick={() => setShowForm(true)}>
          Add Quiz
        </Button>
      </div>

      <Modal show={showForm} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>{editingQuiz ? 'Update Quiz' : 'Add New Quiz'}</Modal.Title>
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
                {editingQuiz ? 'Update' : 'Add'}
              </Button>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminQuiz;
