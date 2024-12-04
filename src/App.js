import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from './api/employeeService';

function App() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: '', position: '', department: '', hireDate: '' });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  const handleCreate = async () => {
    await createEmployee(newEmployee);
    fetchEmployees();
  };

  const handleUpdate = async (id) => {
    const updatedEmployee = { name: 'Updated Name', position: 'Updated Position', department: 'Updated Department', hireDate: '2023-01-01' };
    await updateEmployee(id, updatedEmployee);
    fetchEmployees();
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    fetchEmployees();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Employee Management</h1>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={newEmployee.name}
            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Position"
            value={newEmployee.position}
            onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
          />
          <input
            type="text"
            placeholder="Department"
            value={newEmployee.department}
            onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
          />
          <input
            type="date"
            placeholder="Hire Date"
            value={newEmployee.hireDate}
            onChange={(e) => setNewEmployee({ ...newEmployee, hireDate: e.target.value })}
          />
          <button onClick={handleCreate}>Add Employee</button>
        </div>
        <ul>
          {employees.map((employee) => (
            <li key={employee.id}>
              {employee.name} - {employee.position} - {employee.department} - {employee.hireDate}
              <button onClick={() => handleUpdate(employee.id)}>Update</button>
              <button onClick={() => handleDelete(employee.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;