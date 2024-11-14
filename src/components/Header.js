import React from 'react';  // Importing the React library, which is necessary to create React components

// This is a functional component called `Header`. 
// It takes two props: `toggleModal` (a function to open/close a modal) and `nbOfContacts` (a number showing the total contacts).
const Header = ({ toggleModal, nbOfContacts }) => {
  return (
    // The outermost `header` tag wraps the component's content. 
    // This will style or structure the header section of the page.
    <header className='header'> 
      
      {/* `container` div is a wrapper that adds structure or layout to the inner content of the header. */}
      <div className='container'>
        
        {/* Displays the title "Contact List" followed by the number of contacts in parentheses. 
            The `nbOfContacts` prop dynamically inserts the number of contacts into the string. */}
        <h3>Contact List ({nbOfContacts})</h3>
        
        {/* This button allows the user to add a new contact.
            When the button is clicked, it calls the `toggleModal` function, passing `true` as an argument to open the modal. */}
        <button onClick={() => toggleModal(true)} className='btn'>
          
          {/* This `i` tag is used for an icon (Bootstrap icon: "bi-plus-square"). 
              Icons are typically styled with specific CSS classes, in this case `bi` and `bi-plus-square`. */}
          <i className='bi bi-plus-square'></i> Add New Contact
        </button>
      </div>
    </header>
  );
};

// This line exports the `Header` component so it can be imported and used in other parts of the app.
export default Header;
