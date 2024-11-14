import { useState } from 'react'; // Importing the useState hook from React to manage component state
import axios from 'axios'; // Importing axios library for handling HTTP requests

// Defining the base URL for the API endpoint
const APIT_URL = 'http://localhost:8080/file';

const App = () => {
  // Setting up state for selected files and tracking upload/download progress
  const [files, setFiles] = useState(undefined); // Holds the files selected by the user
  const [progress, setProgress] = useState({ status: null, percent: 0 }); // Tracks progress percentage and status

  // Function to handle file uploads
  const uploadFiles = () => {
    if (!files) { // Check if files have been selected
      alert('please choose a file'); // Alert the user if no file is selected
      return; // Stop function execution if no file
    }

    const formData = new FormData(); // Initialize FormData for storing files to be uploaded
    // Loop through each selected file and append it to formData
    for (const file of files) {
      formData.append('files', file, file.name); // Append file with a key of 'files'
    }

    // Perform an axios POST request to upload files, tracking progress with the updateProgress function
    axios.post(`${APIT_URL}/upload`, formData, { onUploadProgress: updateProgress })
      .then(response => { // If request is successful
        console.log(response); // Log the server's response
        setFiles(undefined); // Clear the selected files state
        setProgress(prev => ({ ...prev, status: 'done', percent: 0 })); // Reset progress status and percentage
      })
      .catch(console.log); // Log any errors that occur during upload
  };

  // Function to handle file downloads
  const downloadFiles = (filename) => {
    // Perform a GET request to download the specified file
    axios.get(`${APIT_URL}/download/${filename}`, { responseType: 'blob', onDownloadProgress: updateProgress })
      .then(response => { // If request is successful
        console.log(response); // Log the server's response

        // Create a downloadable Blob object from the response data
        const url = URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a'); // Create a new anchor element
        link.href = url; // Set the link's href to the Blob URL
        link.setAttribute('download', response.headers.get('file-name')); // Set the download attribute with the filename
        document.body.appendChild(link); // Append the link to the document body
        link.click(); // Trigger the file download
        document.body.removeChild(link); // Remove the link from the document after download
      })
      .catch(console.log); // Log any errors that occur during download
  };

  // Function to track and update progress of uploads and downloads
  const updateProgress = (progressEvent) => {
    console.log(progressEvent); // Log the progress event details
    // Update progress state with current percentage based on the event
    setProgress(prev => ({ ...prev, status: 'started', percent: progressEvent.progress * 100 }));
  };

  return (
    <div className="App">
      <h1>Upload files</h1>
      {/* File input to allow multiple file selection */}
      <input type='file' onChange={(event) => { setFiles(event.target.files); }} multiple /> <br></br>
      
      {/* Button to trigger file upload */}
      <button onClick={uploadFiles}>upload files</button> <br></br>
      
      {/* Button to download a specific file by its name */}
      <button onClick={() => downloadFiles('youtubefree.mp4')}>download files</button> <br></br>

      {/* Display upload/download progress as a percentage if in progress */}
      {(progress.percent > 0 && progress.percent !== 0) && <p>Progress: {Math.round(progress.percent)}%</p>}
      
      {/* Display a progress bar if an upload or download is in progress */}
      {progress.status === 'started' && <progress max="100" value={progress.percent}></progress>}
    </div>
  );
}

export default App; // Exporting the App component as the default export
