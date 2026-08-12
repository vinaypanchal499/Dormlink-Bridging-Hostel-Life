import { useState, useEffect } from "react";
import { getAllStudents } from "../../../utils";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AllStudents() {
  const [allStudents, setallStudents] = useState([]);

  const getCSV = async () => {
    const hostel = JSON.parse(localStorage.getItem('hostel'))._id;
    const res = await fetch("http://localhost:3000/api/student/csv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostel }),
    });
    const data = await res.json();
    if (data.success) {
      const link = document.createElement('a');
      link.href = "data:text/csv;charset=utf-8," + escape(data.csv);
      link.download = 'students.csv';
      link.click();
      toast.success('CSV Downloaded Successfully!', { position: "top-right", autoClose: 3000 });
    } else {
      toast.error(data.errors[0].msg, { position: "top-right", autoClose: 3000 });
    }
  };

  const getAll = async () => {
    const data = await getAllStudents();
    setallStudents(data.students);
  };

  const deleteStudent = async (id) => {
    const res = await fetch("http://localhost:3000/api/student/delete-student", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (data.success) {
      setallStudents(allStudents.filter((student) => student._id !== id));
      toast.success('Student Deleted Successfully!', { position: "top-right", autoClose: 3000, theme: "dark" });
    } else {
      toast.error(data.errors[0].msg, { position: "top-right", autoClose: 3000 });
    }
  };

  useEffect(() => {
    getAll();
  }, [allStudents.length]);

  // Group students by course
  const groupedStudents = allStudents.reduce((groups, student) => {
    const course = student.course || "Unknown";
    if (!groups[course]) groups[course] = [];
    groups[course].push(student);
    return groups;
  }, {});

  // Color map for course highlights (you can add more)
  const courseColors = {
    CSE: "bg-blue-700",
    MECH: "bg-green-700",
    ECE: "bg-purple-700",
    CIVIL: "bg-yellow-700",
    UNKNOWN: "bg-gray-700",
  };

  return (
    <div className="w-full min-h-screen flex flex-col gap-5 items-center justify-start py-10 bg-gray-900">
      <h1 className="text-white font-bold text-5xl">All Students</h1>

      <div className="flex justify-center w-full">
        <button
          onClick={getCSV}
          className="px-20 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-xl"
        >
          Download List
        </button>
      </div>

      <div className="bg-neutral-950 px-6 py-6 rounded-xl shadow-xl sm:w-[90%] w-full mt-5 max-h-[600px] overflow-auto">
        <span className="text-white font-bold text-xl mb-4 block">Student List</span>

        {Object.keys(groupedStudents).length === 0 ? (
          <p className="text-center text-white">No Students Found</p>
        ) : (
          Object.keys(groupedStudents).map((course) => (
            <div key={course} className="mb-6">
              {/* Course header */}
              <div className={`px-3 py-1 w-fit rounded-full mb-2 text-white font-semibold ${courseColors[course] || 'bg-gray-700'}`}>
                {course}
              </div>

              {/* Table header */}
              <div className="grid grid-cols-6 gap-4 text-gray-400 font-semibold mb-1 px-2">
                <span>Name</span>
                <span>Course</span>
                <span>Batch</span>
                <span>Room</span>
                <span>Contact</span>
                <span>Actions</span>
              </div>

              <ul role="list" className="divide-y divide-gray-700 text-white">
                {groupedStudents[course].map((student) => (
                  <li
                    key={student._id}
                    className="py-3 px-2 hover:bg-neutral-700 rounded transition-all"
                  >
                    <div className="grid grid-cols-6 gap-4 items-center">
                      <span className="truncate">{student.name}</span>
                      <span className="truncate">{student.course}</span>
                      <span className="truncate">{student.batch}</span>
                      <span className="truncate">{student.room_no}</span>
                      <span className="truncate">{student.contact}</span>
                      <div className="flex gap-3">
                        <button className="hover:text-green-600">
                          {/* Edit icon */}
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                          </svg>
                        </button>
                        <button className="hover:text-red-500" onClick={() => deleteStudent(student._id)}>
                          {/* Delete icon */}
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default AllStudents;
