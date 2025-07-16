import React, { useRef, useState } from 'react';

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState('');
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setDownloadLink('');
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:4000/user/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        setDownloadLink(data.path);
      } else {
        alert(`Upload failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. See console for details.');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url("https://www.cartoq.com/wp-content/uploads/2023/06/Custom-Royal-Enfield-bikes.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-xl w-96 text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">📤 Upload a File</h2>

        <button
          onClick={handleButtonClick}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
        >
          Choose File
        </button>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleChange}
        />

        {file && (
          <>
            <p className="mt-4 text-sm text-gray-800">
              Selected: <strong>{file.name}</strong>
            </p>

            <button
              onClick={handleUpload}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
            >
              Upload
            </button>
          </>
        )}

        {downloadLink && (
          <div className="mt-6">
            <p className="text-sm text-gray-800 mb-1">✅ File uploaded!</p>
            <a
              href={downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline break-all"
            >
              {downloadLink}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
