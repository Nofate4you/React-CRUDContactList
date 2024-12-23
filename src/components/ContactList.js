import React from "react"; // Importing React to create a functional component.
import Contact from "./Contact.js"; // Importing the `Contact` component to display individual contact information.

const ContactList = ({ data, currentPage, getAllContacts }) => {
  return (
    <main className="main">
      {data?.content?.length === 0 && (
        <div>No Contacts. Please add a new contact</div>
      )}

      <ul className="contact__list">
        {data?.content?.length > 0 &&
          data.content.map((contact) => (
            <Contact contact={contact} key={contact.id} /> // Render each contact
          ))}
      </ul>

      {data?.content?.length > 0 && data?.totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => getAllContacts(currentPage - 1)}
            className={0 === currentPage ? "disabled" : ""}
          >
            &laquo; {/* Left arrow symbol */}
          </button>
          {data &&
            [...Array(data.totalPages).keys()].map((page, index) => (
              <React.Fragment key={page}>
                <button
                  onClick={() => getAllContacts(page)}
                  className={currentPage === page ? "active" : ""}
                >
                  {page + 1} {/* Display the page number */}
                </button>
                {index < data.totalPages - 1 && (
                  <span
                    style={{
                      margin: "50px 0px",
                      borderBottom: "3px solid #000",
                      width: "20px",
                      display: "inline-block",
                    }}
                  ></span>
                )}
              </React.Fragment>
            ))}
          <button
            onClick={() => getAllContacts(currentPage + 1)}
            className={data.totalPages === currentPage + 1 ? "disabled" : ""}
            
          >
            &raquo; {/* Right arrow symbol */}
          </button>
        </div>
      )}
    </main>
  );
};

export default ContactList; // Exporting the `ContactList` component so it can be used in other parts of the app.
