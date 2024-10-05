import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserForm from './UserForm.js'; 
import Modal from './Modal.js';       

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // For filtering users based on search
  const [searchTerm, setSearchTerm] = useState('');       // State to track the search input
  const [editingUser, setEditingUser] = useState(null);   // For tracking the user being edited
  const [isEditing, setIsEditing] = useState(false);      // For controlling the modal visibility
  const [isCreating, setIsCreating] = useState(false);    // For controlling the modal visibility for creating a user

  // Fetch users when the component mounts
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filtered users with full user list
      })
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
    
    // Filter users based on the search term (case insensitive)
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Open modal for editing and set the user to be edited
  const handleEdit = (user) => {
    setEditingUser(user);
    setIsEditing(true);
  };

  // Open modal for creating a new user
  const handleCreateUser = () => {
    setEditingUser(null); 
    setIsCreating(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsEditing(false);
    setIsCreating(false);
    setEditingUser(null);  
  };

  // Handle deleting a user
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(() => {
          setUsers(users.filter(user => user.id !== id));  
          setFilteredUsers(filteredUsers.filter(user => user.id !== id)); 
        })
        .catch(error => console.error("Error deleting user:", error));
    }
  };

  // Handle form submission for editing or creating user
  const handleFormSubmit = (updatedUser) => {
    if (updatedUser.id) { // Editing existing user
      setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
      setFilteredUsers(filteredUsers.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    } else { // Creating a new user
      const newUser = { ...updatedUser, id: users.length + 1, local: true }; // Add 'local' flag for new user
      setUsers([...users, newUser]);
      setFilteredUsers([...filteredUsers, newUser]); // Update filtered users as well
    }
    handleCloseModal();  // Close the modal after submission
  };
  
  return (
    <div className='Main-screen'>
      <h1>USER MANAGEMENT SYSTEM</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search Name"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />

      <button className='new-user-btn' onClick={handleCreateUser}>Add New User</button> 
      <table className='Main-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td className='special-td'>
                  {user.local ? (
                    <Link to="#" onClick={() => alert("Local User: " + JSON.stringify(user))}>View Details</Link>
                  ) : (
                    <Link to={`/user/${user.id}`}>View Details</Link>
                  )}
                  <button className='edit-btn' onClick={() => handleEdit(user)}>Edit</button>
                  <button className='delete-btn' onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for editing user */}
      <Modal
        isOpen={isEditing}
        onClose={handleCloseModal}
        title="Edit User"
      >
        {editingUser && (
          <UserForm
            initialUser={editingUser}
            onSubmit={handleFormSubmit}
          />
        )}
      </Modal>

      {/* Modal for creating new user */}
      <Modal
        isOpen={isCreating}
        onClose={handleCloseModal}
        title="Create User"
      >
        <UserForm
          initialUser={null} 
          onSubmit={handleFormSubmit}
        />
      </Modal>
    </div>
  );
};

export default UserTable;
