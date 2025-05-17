import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, changeUserRole } from '../rtk/slices/role-slice'; 
import './RoleManagement.css';

function RoleManagement() {
  const dispatch = useDispatch();
  const { users, status, error, message } = useSelector((state) => state.role);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('user');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [localMessage, setLocalMessage] = useState(null);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      setLocalMessage(message);
      const timer = setTimeout(() => setLocalMessage(null), 3000);
      return () => clearTimeout(timer);
    }

    if (error) {
      setLocalError(error);
      const timer = setTimeout(() => setLocalError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = users.filter((user) =>
      user.userName?.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredUsers(value ? filtered : []);
  };

  const handleSuggestionClick = (user) => {
    setSearchTerm(user.userName);
    setSelectedUserId(user.id);
    setFilteredUsers([]);
  };

  const handleSave = () => {
    if (!selectedUserId) {
      alert('Please select a user');
      return;
    }

    const roleDto = {
      userName: searchTerm, 
      role: selectedRole
    };

    dispatch(changeUserRole(roleDto));
  };

  return (
    <div className="role-management-container">
      <h1>Role Management</h1>
      <p>Manage user roles and permissions here.</p>

      <div className="search-container">
        <input
          type="search"
          placeholder="Search users by username..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {filteredUsers.length > 0 && (
          <ul className="suggestions-list">
            {filteredUsers.map((user, index) => (
              <li key={index} onClick={() => handleSuggestionClick(user)}>
                {user.userName}
              </li>
            ))}
          </ul>
        )}
      </div>

      <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>

      <button className="save-button" onClick={handleSave} disabled={status === 'loading'}>
        {status === 'loading' ? 'Saving...' : 'Save'}
      </button>

      {localMessage && <p className="success-message">{localMessage}</p>}
      {localError && <p className="error-message">{localError}</p>}
    </div>
  );
}

export default RoleManagement;

