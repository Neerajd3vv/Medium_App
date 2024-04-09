import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

function UserProfile() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/upload-profile-picture`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Upload successful:", response.data);
      // Update user's profile picture URL in the database
      // You can send another request to update the user's profile picture URL
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} />
      <button onClick={() => fileInputRef.current?.click()}>Select Profile Picture</button>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UserProfile;
