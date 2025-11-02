"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFile(e.target.files?.[0] || null);
  }

  return (
    <div style={{ padding: 40, color: "white" }}>
      <h1 style={{ fontSize: 32, fontWeight: "bold", marginBottom: 20 }}>
        Upload Your Game Footage
      </h1>

      <input type="file" accept="video/*" onChange={handleFileChange} />

      {file && (
        <p style={{ marginTop: 20 }}>Uploaded File: {file.name}</p>
      )}
    </div>
  );
}
