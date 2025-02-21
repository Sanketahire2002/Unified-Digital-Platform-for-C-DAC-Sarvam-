import React, { useState, useEffect } from 'react';
import { Button, Table, Form, Modal, Alert } from "react-bootstrap";
import axios from 'axios';

const AdminMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [meetingData, setMeetingData] = useState({
    meetingTopic: "",
    conductedBy: "",
    meetingDate: "",
    fromTime: "",
    endTime: "",
    meetingLink: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  // Fetch meetings from the backend
  useEffect(() => {
    axios.get('http://localhost:8080/api/meetings')
      .then(response => {
        setMeetings(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the meetings:", error);
      });
  }, []);

  // Handle input changes for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeetingData({
      ...meetingData,
      [name]: value,
    });
  };

  // Form validation
  const validateForm = () => {
    let errors = [];
    if (!meetingData.meetingTopic) errors.push("Meeting Topic is required.");
    if (!meetingData.conductedBy) errors.push("Conducted By is required.");
    if (!meetingData.meetingDate) errors.push("Meeting Date is required.");
    if (!meetingData.fromTime) errors.push("From Time is required.");
    if (!meetingData.endTime) errors.push("End Time is required.");
    if (!meetingData.meetingLink || !/^https?:\/\/[^\s]+$/.test(meetingData.meetingLink)) {
      errors.push("A valid Meeting Link is required.");
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  // Open Modal for Adding Meeting
  const handleShowModal = () => {
    setShowModal(true);
    setIsEdit(false); // Reset the state for adding a new meeting
    setMeetingData({
      meetingTopic: "",
      conductedBy: "",
      meetingDate: "",
      fromTime: "",
      endTime: "",
      meetingLink: "",
    });
    setValidationErrors([]);
  };

  // Open Modal for Editing Meeting
  const handleEditMeeting = (meeting) => {
    // console.log("Meeting Data to be sent:", meeting);
    setShowModal(true);
    setIsEdit(true);
    setMeetingData({ ...meeting });
    setValidationErrors([]);
  };

  // Add or Update meeting
  const handleSaveMeeting = () => {
    if (validateForm()) {
      console.log("Meeting Data to be sent:", meetingData); // Log the data being sent to the backend
      console.log("Meeting Data to be sent:", meetingData.meetingId)
      if (isEdit) {
        // Edit existing meeting
        axios.put(`http://localhost:8080/api/meetings/${meetingData.meetingId}`, meetingData)
          .then(response => {
            setMeetings(meetings.map(meeting => (meeting.meetingId === meetingData.meetingId ? response.data : meeting)));
            handleCloseModal();
          })
          .catch(error => {
            console.error("There was an error updating the meeting:", error.response?.data || error.message);
          });
      } else {
        // Add new meeting
        axios.post('http://localhost:8080/api/meetings', meetingData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            setMeetings([...meetings, response.data]);
            handleCloseModal();
          })
          .catch(error => {
            console.error("There was an error adding the meeting:", error.response?.data || error.message);
          });
      }
    }
  };

  // Delete meeting
  const handleDeleteMeeting = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this meeting?");
    if (confirmDelete) {
      axios.delete(`http://localhost:8080/api/meetings/${id}`)
        .then(() => {
          setMeetings(meetings.filter(meeting => meeting.meetingId !== id)); // Adjusted for meetingId
        })
        .catch(error => {
          console.error("There was an error deleting the meeting:", error.response?.data || error.message);
        });
    }
  };
  
  

  // Close Modal
  const handleCloseModal = () => {
    setShowModal(false);
    setMeetingData({
      meetingTopic: "",
      conductedBy: "",
      meetingDate: "",
      fromTime: "",
      endTime: "",
      meetingLink: "",
    });
    setValidationErrors([]);
  };

  return (
    <div className="container mt-5">
      <h1 style={{ textAlign: 'center' }}>Meetings</h1>
      {/* <Button variant="primary" onClick={handleShowModal}>Add New Meeting</Button> */}

      <Table striped bordered hover className="mt-4">
        <thead className="table-dark">
          <tr>
            <th>Sr. No.</th>
            <th>Meeting Topic</th>
            <th>Conducted By</th>
            <th>Date</th>
            <th>From Time</th>
            <th>End Time</th>
            <th>Meeting Link</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {meetings.length > 0 ? (
            meetings.map((meeting, index) => (
              <tr key={meeting.id}>
                <td>{index + 1}</td>
                <td>{meeting.meetingTopic}</td>
                <td>{meeting.conductedBy}</td>
                <td>{meeting.meetingDate}</td>
                <td>{meeting.fromTime}</td>
                <td>{meeting.endTime}</td>
                <td>
                  <a href={meeting.meetingLink} target="_blank" rel="noopener noreferrer" className="admin-assignment-custom-link">
                    Join Meeting
                  </a>
                </td>
                {/* <td>
                  <Button variant="warning" className="mx-2" onClick={() => handleEditMeeting(meeting)}>Edit</Button>
                  <Button variant="danger" className="mx-2" onClick={() => handleDeleteMeeting(meeting.meetingId)}>Delete</Button>
                </td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">No meetings scheduled</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit Meeting" : "Add New Meeting"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {validationErrors.length > 0 && (
            <Alert variant="danger">
              <ul>
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}

          <Form>
            {/* Meeting Topic */}
            <Form.Group controlId="formTopic">
              <Form.Label>Meeting Topic</Form.Label>
              <Form.Control
                type="text"
                name="meetingTopic"
                value={meetingData.meetingTopic}
                onChange={handleInputChange}
                placeholder="Enter Meeting Topic"
              />
            </Form.Group>

            {/* Conducted By */}
            <Form.Group controlId="formConductedBy" className="mt-3">
              <Form.Label>Conducted By</Form.Label>
              <Form.Control
                type="text"
                name="conductedBy"
                value={meetingData.conductedBy}
                onChange={handleInputChange}
                placeholder="Enter Name of Person Conducting"
              />
            </Form.Group>

            {/* Date */}
            <Form.Group controlId="formDate" className="mt-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="meetingDate"
                value={meetingData.meetingDate}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* From Time */}
            <Form.Group controlId="formFromTime" className="mt-3">
              <Form.Label>From Time</Form.Label>
              <Form.Control
                type="time"
                name="fromTime"
                value={meetingData.fromTime}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* End Time */}
            <Form.Group controlId="formEndTime" className="mt-3">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                name="endTime"
                value={meetingData.endTime}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Meeting Link */}
            <Form.Group controlId="formLink" className="mt-3">
              <Form.Label>Meeting Link</Form.Label>
              <Form.Control
                type="url"
                name="meetingLink"
                value={meetingData.meetingLink}
                onChange={handleInputChange}
                placeholder="Enter Meeting Link"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleSaveMeeting}>
            {isEdit ? "Save Changes" : "Add Meeting"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminMeetings;
