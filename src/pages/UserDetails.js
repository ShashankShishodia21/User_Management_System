import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserDetails = () => {
  const { id } = useParams(); // Extract the user ID from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user details using the ID from the URL
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("Error fetching user details");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;  // Show a loading state while fetching
  }

  if (error) {
    return <div>{error}</div>;  // Show an error message if fetching fails
  }

  if (!user) {
    return <div>No user found</div>;  // Handle case where no user is found
  }

  return (
    <div className='detail-main'>
      <h2>User Details</h2>
      <div><strong>Name:</strong> {user.name}</div>
      <div><strong>Email:</strong> {user.email}</div>
      <div><strong>Phone:</strong> {user.phone}</div>
      <div><strong>Username:</strong> {user.username}</div>
      <div><strong>Website:</strong> {user.website}</div>
      <div><strong>Address:</strong> {user.address.street}, {user.address.city}</div>
      <div><strong>Company:</strong> {user.company?.name}</div>
    </div>
  );
};

export default UserDetails;
