import React, { useState } from 'react';
import './RoleManagement.css';

const mockUsers = ['Alice Johnson', 'Ahmed Tarek', 'Mohamed Ali', 'Amira Samir', 'Ayman Salah'];

function RoleManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('user');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = mockUsers.filter((user) =>
      user.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredUsers(value ? filtered : []);
  };

  const handleSuggestionClick = (name) => {
    setSearchTerm(name);
    setFilteredUsers([]);
  };

  const handleSave = () => {
    if (!searchTerm) {
      alert('Please select a user');
      return;
    }
    alert(`Saved ${searchTerm} as ${selectedRole}`);
    // Here you would typically make an API call
  };

  return (
    <div className="role-management-container">
      <h1>Role Management</h1>
      <p>Manage user roles and permissions here.</p>

      <div className="search-container">
        <input
          type="search"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {filteredUsers.length > 0 && (
          <ul className="suggestions-list">
            {filteredUsers.map((user, index) => (
              <li key={index} onClick={() => handleSuggestionClick(user)}>
                {user}
              </li>
            ))}
          </ul>
        )}
      </div>

      <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="Manager">Manager</option>
        <option value="GoldenUser">Golden User</option>
      </select>

      <button className="save-button" onClick={handleSave}>Save</button>
    </div>
  );
}

export default RoleManagement;
