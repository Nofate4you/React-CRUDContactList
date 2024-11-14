// Importing React and Link from react-router-dom
import React from 'react'
import { Link } from 'react-router-dom'

// Contact component to display a contact's details, with clickable link to contact's page
const Contact = ({ contact }) => {
    return (
        // Link to the contact's detail page based on contact ID
    <Link to={`/contacts/${contact.id}`} className="contact__item">
      
    {/* Contact header with image and basic details */}
    <div className="contact__header">
      <div className="contact__image">
        <img src={contact.photoUrl} alt={contact.name} />
      </div>
      <div className="contact__details">
        <p className="contact_name">{contact.name.substring(0, 15)}</p> {/* Truncate name */}
        <p className="contact_title">{contact.title}</p>
      </div>
    </div>

    {/* Contact body with email, address, phone, and status */}
    <div className="contact__body">
        <p><i className="bi bi-envelope"></i> {contact.email.substring(0, 20)}</p> {/* Truncate email */}
        <p><i className="bi bi-geo"></i> {contact.address}</p>
        <p><i className="bi bi-telephone"></i> {contact.phone}</p>
        <p>
          {/* Display icon based on status */}
          {contact.status === 'Active' ? <i className='bi bi-check-circle'></i> : 
          <i className='bi bi-x-circle'></i>} {contact.status}
        </p>
      </div>

      </Link>
    )
}

export default Contact