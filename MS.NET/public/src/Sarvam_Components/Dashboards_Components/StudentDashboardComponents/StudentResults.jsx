import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const StudentResults = () => {
  const [results, setResults] = useState([]);
  const [moduleNames, setModuleNames] = useState({});
  const [error, setError] = useState(null);
  const [cceePercentage, setCceePercentage] = useState(0);
  const [totalPercentage, setTotalPercentage] = useState(0);

  const [prn, setPrn] = useState('');
  const [role, setRole] = useState('');
  useEffect(() => {
    const storedPrn = sessionStorage.getItem('prn');
    const storedRole = sessionStorage.getItem('role');

    if (storedPrn) setPrn(storedPrn);
    if (storedRole) setRole(storedRole);
  }, []);

  useEffect(() => {
    if (!prn) return;

    axios
      .get(`http://localhost:5000/api/MasterResult/prn/${prn}`)
      .then(async (response) => {
        setResults(response.data);

        const totalCceeMarks = response.data.reduce((sum, result) => sum + result.ccee60, 0);
        const totalModules = response.data.length;
        const cceePercentage = totalModules > 0 ? (totalCceeMarks / (totalModules * 40)) * 100 : 0;
        setCceePercentage(cceePercentage.toFixed(2));

        // Calculate total percentage
        const totalObtainedMarks = response.data.reduce(
          (sum, result) => sum + result.internals20 + result.lab40 + result.ccee60,
          0
        );
        const totalPossibleMarks = totalModules * (20 + 40 + 40);
        const totalPercentage = totalModules > 0 ? (totalObtainedMarks / totalPossibleMarks) * 100 : 0;
        setTotalPercentage(totalPercentage.toFixed(2));

        const moduleIds = [...new Set(response.data.map((r) => r.moduleId))];
        const modulePromises = moduleIds.map((id) =>
          axios.get(`http://localhost:5000/api/MasterModule/${id}`)
        );

        try {
          const moduleResponses = await Promise.all(modulePromises);
          const modules = moduleResponses.reduce((acc, res) => {
            acc[res.data.moduleId] = res.data.moduleName;
            return acc;
          }, {});
          setModuleNames(modules);
        } catch (moduleError) {
          console.error("Error fetching module names:", moduleError);
          setError("Failed to load module names.");
        }
      })
      .catch((error) => {
        console.error("Error fetching results:", error);
        setError("Failed to load results.");
      });
  }, [prn]);

  const pieDataCcee = [
    { name: "CCEE Obtained", value: parseFloat(cceePercentage) },
    { name: "Remaining", value: 100 - parseFloat(cceePercentage) },
  ];

  const pieDataTotal = [
    { name: "Total Obtained", value: parseFloat(totalPercentage) },
    { name: "Remaining", value: 100 - parseFloat(totalPercentage) },
  ];

  const COLORS = ["#0088FE", "#FFBB28"]; // Blue for obtained, Yellow for remaining

  return (
    <div className="container">
    <div style={{ textAlign: "left" }}>
      <h2>Results for PRN: {prn || "N/A"}</h2>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        {/* Left Section - CCEE Percentage Chart */}
        <div style={{ width: "45%" }}>
          <h3 style={{ color: "blue" }}>Overall CCEE Percentage: {cceePercentage}%</h3>
          <PieChart width={300} height={300}>
            <Pie data={pieDataCcee} cx="50%" cy="50%" innerRadius={60} outerRadius={100} fill="#8884d8" paddingAngle={5} dataKey="value">
              {pieDataCcee.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Right Section - Total Percentage Chart */}
        <div style={{ width: "45%" }}>
          <h3 style={{ color: "green" }}>Overall Total Percentage: {totalPercentage}%</h3>
          <PieChart width={300} height={300}>
            <Pie data={pieDataTotal} cx="50%" cy="50%" innerRadius={60} outerRadius={100} fill="#8884d8" paddingAngle={5} dataKey="value">
              {pieDataTotal.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      {error ? <p style={{ color: "red" }}>{error}</p> : null}

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Result ID</th>
            <th>PRN</th>
            <th>Module Name</th>
            <th>Internals (20)</th>
            <th>Lab (40)</th>
            <th>CCEE (40)</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {results.length > 0 ? (
            results.map((result) => (
              <tr key={result.resultId}>
                <td>{result.resultId}</td>
                <td>{result.prn}</td>
                <td>{moduleNames[result.moduleId] || "Loading..."}</td>
                <td>{result.internals20}</td>
                <td>{result.lab40}</td>
                <td>{result.ccee60}</td>
                <td>{result.internals20 + result.lab40 + result.ccee60}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No results found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );

};

export default StudentResults;
