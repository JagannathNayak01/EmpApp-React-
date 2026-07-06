import { useState, useEffect } from "react";
import Appbar from "./Appbar";
import Footer from "./Footer";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    gender: "",
  });
  const [selectAll, setSelectAll] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:3000/employees");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing
        ? `http://localhost:3000/employees/${formData._id}`
        : "http://localhost:3000/employees";

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save employee");
      }

      await fetchEmployees(); // Refresh the list
      setFormData({
        name: "",
        email: "",
        age: "",
        phone: "",
        gender: "",
      });
      setShowForm(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving employee:", error);
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await fetch(`http://localhost:3000/employees/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete employee");
        }

        await fetchEmployees(); // Refresh the list
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert(error.message);
      }
    }
  };

  const handleEdit = (emp) => {
    setFormData({
      _id: emp._id,
      name: emp.name,
      email: emp.email,
      age: emp.age,
      phone: emp.phone,
      gender: emp.gender,
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      setSelectedEmployees(employees.map((emp) => emp._id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelectEmployee = (empId) => {
    setSelectedEmployees((prev) => {
      if (prev.includes(empId)) {
        const newSelected = prev.filter((id) => id !== empId);
        setSelectAll(false);
        return newSelected;
      } else {
        const newSelected = [...prev, empId];
        setSelectAll(newSelected.length === employees.length);
        return newSelected;
      }
    });
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Appbar />
      <div className="container d-flex flex-column align-items-center">
        <div className="custom-table-wrapper p-4 mt-25 relative">
          <div className="position-absolute -top-12 right-4">
            <i
              className="fas fa-plus-circle add-icon"
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  name: "",
                  email: "",
                  age: "",
                  phone: "",
                  gender: "",
                });
                setShowForm(true);
              }}
              style={{ fontSize: "2rem", cursor: "pointer", color: "cyan" }}
            ></i>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0 employee-title">Employee List</h5>
            <input
              type="text"
              className="form-control w-25"
              placeholder="Search by email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="table-responsive glass-table shadow-sm rounded">
            <table className="table custom-table align-middle mb-0">
              <thead className="bg-light text-dark">
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th scope="col">Name</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Email</th>
                  <th scope="col">Age</th>
                  <th scope="col">Phone</th>
                  <th scope="col" className="text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr key={emp._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedEmployees.includes(emp._id)}
                        onChange={() => handleSelectEmployee(emp._id)}
                      />
                    </td>
                    <td className="fw-semibold text-primary">{emp.name}</td>
                    <td>{emp.gender}</td>
                    <td className="text-muted small email-cell">{emp.email}</td>
                    <td>{emp.age}</td>
                    <td>{emp.phone}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-danger me-1"
                        onClick={() => handleDelete(emp._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-success"
                        onClick={() => handleEdit(emp)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showForm && (
        <>
          <div className="overlay" onClick={() => setShowForm(false)}></div>
          <div className="container2">
            <i
              className="fas fa-times close-btn"
              onClick={() => setShowForm(false)}
            ></i>
            <h2>{isEditing ? "Edit Employee" : "Add Employee"}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter Name"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter Email"
                required
              />
              <div className="flex-row">
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Age"
                  required
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                  required
                />
              </div>

              <div
                style={{
                  color: "#cbd5e1",
                  marginTop: "8px",
                  textAlign: "center",
                  display: "block",
                }}
              >
                Gender
              </div>
              <div className="gender-toggle">
                <input
                  type="radio"
                  name="gender"
                  id="male"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="male">Male</label>

                <input
                  type="radio"
                  name="gender"
                  id="female"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="female">Female</label>

                <input
                  type="radio"
                  name="gender"
                  id="other"
                  value="Other"
                  checked={formData.gender === "Other"}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="other">Other</label>
                <div className="toggle-indicator"></div>
              </div>

              <button type="submit" className="adduser">
                {isEditing ? "Update Employee" : "Add Employee"}
              </button>
            </form>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
