"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of your context's state
interface FileUploadContextState {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  uploadFile: () => void;
}

// Create the context
export const FileUploadContext = createContext<any>(undefined);

// Define a provider component to wrap your app
export function FileUploadProvider({ children }: { children: ReactNode }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [key, setKey] = useState<string>("");

  // You can add your upload logic here
  const uploadFile = async () => {
    try {
      // Handle the file upload and saving logic here.
      // You can use libraries like Axios to make API requests to your server.

      // Example:
      // const formData = new FormData();
      // formData.append('file', selectedFile);
      // await axios.post('/api/upload', formData);

      console.log("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <FileUploadContext.Provider
      value={{ selectedFile, setSelectedFile, uploadFile, key, setKey }}
    >
      {children}
    </FileUploadContext.Provider>
  );
}

// Custom hook to access the context
export function useFileUpload() {
  const context = useContext(FileUploadContext);
  if (context === undefined) {
    throw new Error("useFileUpload must be used within a FileUploadProvider");
  }
  return context;
}
