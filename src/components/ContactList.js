import React from 'react';  // Importing React to create a functional component.
import Contact from "./Contact.js";  // Importing the `Contact` component to display individual contact information.

// The `ContactList` component receives three props:
// - `data`: This is the list of contacts and pagination information.
// - `currentPage`: The current page of contacts being viewed.
// - `getAllContacts`: A function to fetch contacts for a specific page.
const ContactList = ({ data, currentPage, getAllContacts }) => {
    return (
        <main className='main'>
            {/* The `main` HTML tag wraps the content, typically the main part of the page. */}
            
            {/* If there are no contacts (`data?.content?.length === 0`), display this message */}
            {data?.content?.length === 0 && <div>No Contacts. Please add a new contact</div>}

            {/* The `ul` (unordered list) element represents the contact list */}
            <ul className='contact__list'>
                
                {/* If there are contacts (`data?.content?.length > 0`), map over the list and create a `Contact` component for each contact.
                    Each contact component receives a `contact` prop, and the `key` is set to the contact's unique ID */}
                {data?.content?.length > 0 && data.content.map(contact => (
                    <Contact contact={contact} key={contact.id} />  // Render each contact
                ))}
            </ul>

            {/* If there are multiple pages of contacts, display pagination controls */}
            {data?.content?.length > 0 && data?.totalPages > 1 && (
                <div className='pagination'>
                    {/* Pagination wrapper */}
                
                    {/* Back button to go to the previous page. If it's the first page (`currentPage === 0`), disable the button */}
                    <button 
                        onClick={() => getAllContacts(currentPage - 1)} 
                        className={0 === currentPage ? 'disabled' : ''}
                    >
                        &laquo; {/* Left arrow symbol */}
                    </button>
                
                    {/* Generate a list of pagination buttons using the total number of pages.
                        - `data.totalPages` creates an array of keys from 0 to total pages, then maps each page number.
                        - Each button calls `getAllContacts` to fetch contacts for that specific page.
                        - The button for the current page is given the `active` class. */}
                    { data && [...Array(data.totalPages).keys()].map(page => (
                        <button 
                            onClick={() => getAllContacts(page)} 
                            className={currentPage === page ? 'active' : ''} 
                            key={page}
                        >
                            {page + 1}  {/* Display the page number */}
                        </button>
                    ))}
                
                    {/* Forward button to go to the next page. If it's the last page, disable the button */}
                    <button 
                        onClick={() => getAllContacts(currentPage + 1)} 
                        className={data.totalPages === currentPage + 1 ? 'disabled' : ''}
                    >
                        &raquo; {/* Right arrow symbol */}
                    </button>
                </div>            
            )}
        </main>
    );
}

export default ContactList;  // Exporting the `ContactList` component so it can be used in other parts of the app.
