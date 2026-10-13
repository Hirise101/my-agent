"use client";

import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("Waiting for check");

  async function check() {
    setStatus("Checking...");

    try {
      const response = await fetch("/api/health/ready", {
        cache: "no-store",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Service check failed");
      }

      setStatus(`Backend: ${data.api}; Qdrant: ${data.qdrant}`);
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Connection failed",
      );
    }
  }

  return (
    <main style={{ padding: 32 }}>
      <h1>Agent Environment Check</h1>
      <p>Frontend is running</p>
      <button onClick={check}>Check Backend and Qdrant</button>
      <p role="status">{status}</p>
    </main>
  );
}
