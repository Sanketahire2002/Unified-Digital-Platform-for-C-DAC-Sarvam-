import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Container, Table, Button, Form, Card, Row, Col, Modal } from "react-bootstrap";
import { FaTrash } from "react-icons/fa"; // Import trash icon
import { BsTrash3Fill } from "react-icons/bs";
import { Trash2 } from "lucide-react";
import { BsDownload } from "react-icons/bs";
import { Download } from "lucide-react";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [studyMaterial, setStudyMaterial] = useState({
    title: "",
    fileName: "",
    moduleName: "",
    uploadedBy: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  //const currentRows = studyMaterials.slice(indexOfFirstRow, indexOfLastRow);
  const [selectedModule, setSelectedModule] = useState("");
  const uniqueModules = [...new Set(studyMaterials.map((item) => item.moduleName))];
  const handleModuleChange = (e) => {
    setSelectedModule(e.target.value);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const handleClearFilters = () => {
    setSearchTerm("");
    setSearchDate("");
    setSelectedModule("");
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    handleClearDate();
  };


  const handleDateChange = (e) => {
    setSearchDate(e.target.value);
  };

  const handleClearDate = () => {
    setSearchDate("");
  };

  const [prn, setPrn] = useState('');
  const [sessionFirstName, setFirstName] = useState('');
  const [sessionLastName, setlastName] = useState('');
  useEffect(() => {
    setPrn(sessionStorage.getItem('prn'));
    setFirstName(sessionStorage.getItem('firstName'));
    setlastName(sessionStorage.getItem('lastName'));
  }, []);


  const [searchDate, setSearchDate] = useState("");


  // Filter rows based on search term
  const filteredRows = studyMaterials.filter((material) => {
    const matchesText =
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.moduleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.createdAt.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = searchDate
      ? new Date(material.createdAt).toISOString().slice(0, 10) === searchDate
      : true;

    const matchesModule = selectedModule ? material.moduleName === selectedModule : true;

    return matchesText && matchesDate && matchesModule;
  });


  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);


  const fetchStudyMaterials = () => {
    axios.get("http://localhost:8080/study-materials/all")
      .then((response) => {
        setStudyMaterials(response.data); // Store data in state
      })
      .catch((error) => {
        console.error("Error fetching study materials:", error);
      });
  };

  const [modules, setModules] = useState([]); // State to store modules

  const fetchModules = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/modules");
      setModules(response.data); // Store fetched data in state     
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  useEffect(() => {
    if (modules && Array.isArray(modules)) {
      const moduleNames = modules.map(module => module.moduleName);
      console.log(moduleNames);
    }
  }, [modules]);


  // Call fetchStudyMaterials when component loads
  useEffect(() => {
    fetchFiles();
    fetchStudyMaterials();
    fetchModules();

  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/files/all")
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
      });
  }, []);

  const fetchFiles = () => {
    axios
      .get("http://localhost:8080/files/all")
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
      });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleChange = (e) => {
    setStudyMaterial({ ...studyMaterial, [e.target.name]: e.target.value });
  };

  const allowedFileTypes = [
    "image/png",
    "image/jpeg",
    "application/pdf",
    "text/plain",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "application/vnd.ms-powerpoint", // .ppt
    "video/mp4" 
  ];

  const MAX_FILE_SIZE = 100 * 1024 * 1024; // 5 MB

  const uploadFile = async () => {
    if (!studyMaterial.title || !studyMaterial.moduleName) {
      alert("Please fill in all fields.");
      return;
    }
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    // Validate file type
    if (!allowedFileTypes.includes(selectedFile.type)) {
      alert("Invalid file type. Please upload a PNG, JPEG, PDF, TXT, DOCX, XLSX, or PPT file.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      alert("File size exceeds 100MB. Please upload a smaller file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:8080/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const message = response.data;
      setStudyMaterial({ ...studyMaterial, fileName: message });

      // Now send study material data to backend
      saveStudyMaterial(message);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  };

  const saveStudyMaterial = (fileName) => {
    const payload = {
      title: studyMaterial.title,
      fileName: fileName, // Extracted file name
      moduleName: studyMaterial.moduleName,
      uploadedBy: sessionFirstName + " " + sessionLastName,
    };

    axios.post("http://localhost:8080/study-materials/add", payload)
      .then(() => {
        alert("Study material added successfully!");
        setShowModal(false);
        fetchStudyMaterials(); // Refresh list after adding new item    
        fetchFiles();
        setStudyMaterial({
          title: "",
          fileName: "",
          moduleName: "",
          customModuleName: "", // In case of "Other" selection
        });
      })
      .catch((error) => {
        console.error("Error adding study material:", error);
        alert("Failed to add study material.");
      });
  };


  const handleDownload = async (fileName) => {
    try {
      const response = await axios.get(`http://localhost:8080/files/download/${fileName}`, {
        responseType: "blob", // Important: tells Axios to handle binary data
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName.split('_').slice(1).join('_')); // Extract clean file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download file.");
    }
  };

  const downloadFile = (fileName) => {
    axios({
      url: `http://localhost:8080/files/download/${fileName}`,
      method: "GET",
      responseType: "blob", // Important: tells Axios to handle binary response
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
        alert("Failed to download file.");
      });
  };

  const handleDelete = async (id, fileName) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      // Step 1: Delete the file from the server
      await axios.delete(`http://localhost:8080/files/delete/${fileName}`);
      console.log(`File deleted: ${fileName}`);

      // Step 2: Delete the study material record
      await axios.delete(`http://localhost:8080/study-materials/delete/${id}`);
      console.log(`Study material deleted: ${id}`);

      alert("Deleted successfully!");
      fetchStudyMaterials(); // Refresh list after deletion
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Failed to delete the item.");
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4" style={{ marginTop: "80px" }}>Study Materials</h1>
      <div className="d-flex justify-content-start my-4">
        <Button variant="primary" size="lg" className="d-flex align-items-center gap-2" onClick={() => setShowModal(true)}>
          <i className="bi bi-upload"></i> Upload File
        </Button>
      </div>


      <div className="d-flex mb-3">
        <div className="">
          <Form.Control
            type="text"
            placeholder="Search by Title, Module, or Uploaded By"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: "500px" }}
          />
        </div>

        <div className="ms-4">
          <Form.Control
            type="date"
            value={searchDate}
            onChange={handleDateChange}
            style={{ width: "180px" }}
          />
        </div>
        <div className="">
          {/* Module Dropdown */}
          <Form.Select
            value={selectedModule}
            onChange={handleModuleChange}
            style={{ width: "200px", marginLeft: "10px" }}
          >
            <option value="">All Modules</option>
            {uniqueModules.map((module, index) => (
              <option key={index} value={module}>
                {module}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="ms-auto">
          <Button variant="primary" onClick={handleClearFilters}>Clear</Button>
        </div>
      </div>

      <table className="table table-bordered table-striped rounded" style={{ borderRadius: "10px", overflow: "hidden" }}>

        <thead className="table-dark">
          <tr>
            <th style={{ width: "50px" }}>Sr. No.</th>
            <th style={{ width: "200px" }}>Title</th>
            <th style={{ width: "150px" }}>Module Name</th>
            <th style={{ width: "250px" }}>File Name</th>
            <th style={{ width: "150px" }}>Uploaded By</th>
            <th style={{ width: "180px" }}>Upload Date</th>
            <th style={{ width: "100px" }}>Download</th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">No matching records found</td>
            </tr>
          ) : (
            currentRows.map((material, index) => (

              <tr key={material.id}>
                <td>{index + 1}</td>
                <td title={material.title} style={{ maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {material.title}
                </td>
                <td title={material.moduleName} style={{ maxWidth: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {material.moduleName}
                </td>
                <td title={material.fileName.split('_').slice(1).join('_')} style={{ maxWidth: "250px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {material.fileName.split('_').slice(1).join('_')}
                </td>
                <td title={material.uploadedBy} style={{ maxWidth: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {material.uploadedBy}
                </td>
                <td>
                  {new Date(material.createdAt).toISOString().slice(0, 10).split("-").reverse().join("-")}{" "}
                  {new Date(material.createdAt).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                
                <td>
                  <button className="btn btn-primary btn-sm d-flex align-items-center gap-1" onClick={() => handleDownload(material.fileName)}>
                    <Download size={16} /> Download
                  </button>
                </td>
              </tr>
            )))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <Form.Select
          style={{ width: "120px" }}
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
        >
          <option value="5">5 Rows</option>
          <option value="10">10 Rows</option>
          <option value="15">15 Rows</option>
          <option value="20">20 Rows</option>
          <option value="25">25 Rows</option>
          <option value="30">30 Rows</option>
        </Form.Select>

        <div>
          <Button
            variant="secondary"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ◀ Prev
          </Button>
          <span className="mx-2">Page {currentPage}</span>
          <Button
            variant="secondary"
            size="sm"
            disabled={indexOfLastRow >= studyMaterials.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next ▶
          </Button>
        </div>
      </div>


      {/* Modal for New Study Material */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>➕ Add New Study Material</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={studyMaterial.title} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Module Name</Form.Label>
              <Form.Select
                name="moduleName"
                value={studyMaterial.moduleName}
                onChange={handleChange}
              >
                <option value="">Select a module</option>
                {modules && modules.map((module, index) => (
                  <option key={index} value={module.moduleName}>
                    {module.moduleName}
                  </option>
                ))}
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>


            <Form.Group className="mb-3 d-none">
              <Form.Label>Uploaded By</Form.Label>
              <Form.Control
                type="text"
                name="uploadedBy"
                value={sessionFirstName + " " + sessionLastName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload File</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button variant="primary" onClick={uploadFile} className="w-100">
              Upload & Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default FileUpload;
