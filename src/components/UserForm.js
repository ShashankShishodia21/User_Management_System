import React, { useState, useEffect } from 'react';

// UserForm Component
const UserForm = ({ initialUser, onSubmit }) => {
  const [name, setName] = useState(initialUser ? initialUser.name : '');
  const [email, setEmail] = useState(initialUser ? initialUser.email : '');
  const [phone, setPhone] = useState(initialUser ? initialUser.phone : '');
  const [address, setAddress] = useState(initialUser ? initialUser.address.street : '');
  const [city, setCity] = useState(initialUser ? initialUser.address.city : '');
  const [companyName, setCompanyName] = useState(initialUser ? initialUser.company.name : '');
  const [website, setWebsite] = useState(initialUser ? initialUser.website : '');
  const [errors, setErrors] = useState({});

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validated form fields
    const validationErrors = {};
    if (!name) validationErrors.name = 'Name is required';
    if (!email) validationErrors.email = 'Email is required';
    if (!phone) validationErrors.phone = 'Phone is required';
    if (!address) validationErrors.address = 'Address is required';
    if (!city) validationErrors.city = 'City is required';
    if (companyName && companyName.length < 3) validationErrors.companyName = 'Company Name must be at least 3 characters';
    if (website && !/^(ftp|http|https):\/\/[^ "]+$/.test(website)) validationErrors.website = 'Invalid URL';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Construct the user object
    const user = {
      name,
      email,
      phone,
      address: { street: address, city },
      company: { name: companyName },
      website,
      id: initialUser ? initialUser.id : null, 
    };

    
    onSubmit(user);
  };

  useEffect(() => {
    if (initialUser && initialUser.username) {
      setName(initialUser.username);
    }
  }, [initialUser]);

  return (
    <form className='form-detail' onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        {errors.phone && <span>{errors.phone}</span>}
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        {errors.address && <span>{errors.address}</span>}
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        {errors.city && <span>{errors.city}</span>}
      </div>
      <div>
        <label>Company Name:</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        {errors.companyName && <span>{errors.companyName}</span>}
      </div>
      <div>
        <label>Website:</label>
        <input
          type="url"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        {errors.website && <span>{errors.website}</span>}
      </div>
      <button className='edit-btn' type="submit">{initialUser ? 'Update' : 'Create'} User</button>
    </form>
  );
};

export default UserForm;
