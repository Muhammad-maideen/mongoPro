import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const AttendanceTracker = () => {
  const API_URL = "http://localhost:5000/api/posts"; // Example URL


  // List of students
  const students = [
    "John Doe", "Jane Smith", "Sam Wilson", "Emily Davis", "Michael Brown",
    "Chris Johnson", "Sarah Lee", "Jessica Jones", "Daniel Harris", "Sophia Miller",
    "James Anderson", "Olivia Garcia", "Ethan Martin", "Ava Robinson", "Liam Clark",
    "Isabella Lewis", "Noah Walker", "Mia Hall", "Lucas Allen", "Amelia Young",
    "Mason Hernandez", "Charlotte King", "Logan Wright", "Harper Hill", "Elijah Scott",
    "Abigail Green", "Oliver Adams", "Chloe Baker", "Alexander Campbell", "Ella Moore"
  ];

  const [attendance, setAttendance] = useState(
    students.reduce((acc, student) => {
      acc[student] = null; // Initialize attendance for each student as null
      return acc;
    }, {})
  );

  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // Update attendance status for a student
  const updateAttendance = (student, status) => {
    setAttendance((prev) => ({
      ...prev,
      [student]: status,
    }));
  };

  // Submit all attendance records
  const submitAttendance = async () => {
    const records = Object.entries(attendance).map(([name, status]) => ({
      name,
      status,
      timestamp: new Date().toISOString(),
    }));

    try {
      const response = await axios.post(API_URL, records);
      setAttendanceRecords(response.data);
      alert("Attendance submitted successfully!");
    } catch (error) {
      console.error("Error submitting attendance:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Attendance Tracker</h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {students.map((student) => (
          <motion.div
            key={student}
            className="card bg-gray-100 shadow-lg p-4 flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg font-semibold mb-2">{student}</h2>
            <div className="flex justify-between gap-2">
              <button
                className={`btn btn-sm ${
                  attendance[student] === "Present" ? "btn-success" : "btn-outline"
                }`}
                onClick={() => updateAttendance(student, "Present")}
              >
                Present
              </button>
              <button
                className={`btn btn-sm ${
                  attendance[student] === "Absent" ? "btn-error" : "btn-outline"
                }`}
                onClick={() => updateAttendance(student, "Absent")}
              >
                Absent
              </button>
              <button
                className={`btn btn-sm ${
                  attendance[student] === "Leave" ? "btn-warning" : "btn-outline"
                }`}
                onClick={() => updateAttendance(student, "Leave")}
              >
                Leave
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center mt-6">
        <button
          className="btn btn-primary px-6 py-2 text-lg"
          onClick={submitAttendance}
        >
          Submit Attendance
        </button>
      </div>
    </div>
  );
};

export default AttendanceTracker;
