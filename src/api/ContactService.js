import axios from "axios";

const API_URL = 'http://localhost:8080/contacts';

// Save contact with JSON (no file upload)
export async function saveContact(contact) {
    return await axios.post(API_URL, contact, {
        headers: { 'Content-Type': 'application/json' },
    });
}

// Get all contacts with pagination
export async function getContacts(page = 0, size = 10) {
    return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}

// Get a single contact by ID
export async function getContact(id) {
    return await axios.get(`${API_URL}/${id}`);
}

// Update contact with JSON (no file upload)
export async function updateContact(contact) {
    return await axios.put(API_URL, contact, {
        headers: { 'Content-Type': 'application/json' },
    });
}

// Update contact image with FormData (for file upload)
export async function updateContactImage(formData) {
    return await axios.put(`${API_URL}/photo`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',  // Set Content-Type for file upload
        },
    });
}

// Delete contact by ID
export async function deleteContact(id) {
    return await axios.delete(`${API_URL}/${id}`);
}
