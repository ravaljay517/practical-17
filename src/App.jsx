
import React, { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch student records");
        }
        return response.json();
      })
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">
          Student List
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Student records retrieved from a dummy API
        </p>

        {loading && (
          <p className="text-center text-blue-600 text-lg">
            Loading student records...
          </p>
        )}

        {error && (
          <p className="text-center text-red-600 font-semibold">
            Error: {error}
          </p>
        )}

        {!loading && !error && (
          <>
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Total Students: {students.length}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StudentCard({ student }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xl font-bold">
          {student.name.charAt(0)}
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800">
            {student.name}
          </h2>
          <p className="text-sm text-gray-500">
            Student ID: {student.id}
          </p>
        </div>
      </div>

      <div className="space-y-3 text-gray-600">
        <p>
          <span className="font-semibold text-gray-800">Email:</span>{" "}
          {student.email}
        </p>

        <p>
          <span className="font-semibold text-gray-800">Phone:</span>{" "}
          {student.phone}
        </p>

        <p>
          <span className="font-semibold text-gray-800">City:</span>{" "}
          {student.address.city}
        </p>

        <p>
          <span className="font-semibold text-gray-800">Company:</span>{" "}
          {student.company.name}
        </p>
      </div>
    </div>
  );
}

export default App;
