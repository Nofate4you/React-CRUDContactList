import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getContact } from '../api/ContactService.js';
import { toastError, toastSuccess } from '../api/ToastService.js';

const ContactDetail = ({ updateContact }) => {
  const inputRef = useRef();
  const [contact, setContact] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    title: '',
    status: '',
    photoUrl: ''
  });

  const { id } = useParams();

  // Fetch contact from backend
  const fetchContact = async (id) => {
    try {
      const { data } = await getContact(id);
      setContact(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const selectImage = () => {
    inputRef.current.click();
  };

  // Handle image upload
  const updateImageHandler = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', contact.id); // Send contact ID with the image file

    try {
      // Sending PUT request to upload the image to backend
      const response = await fetch('http://localhost:8080/contacts/photo', { // Ensure this URL is correct for your backend
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload photo');
      }

      // Attempt to parse JSON; fall back if not valid JSON
      let result;
      try {
        result = await response.json();
      } catch (error) {
        result = { success: true }; // Assume success if no JSON returned
      }

      if (result.success) {
        // Directly update the photoUrl with the new image path
        const newPhotoUrl = `/contacts/image/${file.name}`; // Update as per backend's file naming convention
        setContact((prev) => ({
          ...prev,
          photoUrl: newPhotoUrl,
        }));
        toastSuccess('Photo updated');
      } else {
        toastError('Failed to upload photo');
      }
    } catch (error) {
      toastError(error.message);
    }
  };

  const onChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  const onUpdateContact = async (event) => {
    event.preventDefault();
    await updateContact(contact);
    fetchContact(id);
    toastSuccess('Contact Updated');
  };

  useEffect(() => {
    fetchContact(id); // Fetch the contact data when the component mounts
  }, [id]);

  return (
    <>
      <Link to={'/contacts'} className='link'>
        <i className='bi bi-arrow-left'></i> Back to list
      </Link>

      <div className='profile'>
        <div className='profile__details'>
          <img src={contact.photoUrl} alt={`${contact.name}`} />
          <div className='profile__metadata'>
            <p className='profile__name'>{contact.name}</p>
            <p className='profile__muted'>JPG, GIF, or PNG. Max size of 10MB</p>
            <button onClick={selectImage} className='btn'>
              <i className='bi bi-cloud-upload'></i> Change Photo
            </button>
          </div>
        </div>

        <div className='profile__settings'>
          <form onSubmit={onUpdateContact} className="form">
            <div className="user-details">
              <input type="hidden" defaultValue={contact.id} name="id" required />
              <div className="input-box">
                <span className="details">Name</span>
                <input type="text" value={contact.name} onChange={onChange} name="name" required />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input type="text" value={contact.email} onChange={onChange} name="email" required />
              </div>
              <div className="input-box">
                <span className="details">Phone</span>
                <input type="text" value={contact.phone} onChange={onChange} name="phone" required />
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <input type="text" value={contact.address} onChange={onChange} name="address" required />
              </div>
              <div className="input-box">
                <span className="details">Title</span>
                <input type="text" value={contact.title} onChange={onChange} name="title" required />
              </div>
              <div className="input-box">
                <span className="details">Status</span>
                <input type="text" value={contact.status} onChange={onChange} name="status" required />
              </div>
            </div>

            <div className="form_footer">
              <button type="submit" className="btn">Save Changes</button>
            </div>
          </form>
        </div>

        <input
          type="file"
          ref={inputRef}
          className="d-none"
          accept="image/*"
          onChange={(e) => updateImageHandler(e.target.files[0])}
        />
      </div>
    </>
  );
};

export default ContactDetail;
