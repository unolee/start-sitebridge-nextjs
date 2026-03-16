import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { fetchApi } from "./api";

interface HelloResponse {
  message: string;
  timestamp: string;
}

function Home() {
  const [data, setData] = useState<HelloResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi<HelloResponse>("/api/hello")
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Home</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          API Response
        </h2>
        {error && (
          <p className="text-red-600">Error: {error}</p>
        )}
        {data && (
          <div className="space-y-2">
            <p className="text-gray-800">
              <span className="font-medium">Message:</span> {data.message}
            </p>
            <p className="text-gray-500 text-sm">
              <span className="font-medium">Timestamp:</span> {data.timestamp}
            </p>
          </div>
        )}
        {!data && !error && (
          <p className="text-gray-400">Loading...</p>
        )}
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-700">
          This is a starter template powered by{" "}
          <strong>Next.js</strong> (API server) and{" "}
          <strong>Vite + React</strong> (SPA client), designed for deployment
          through SiteBridge.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-6">
          <span className="font-bold text-lg text-gray-900">SiteBridge</span>
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            About
          </Link>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}
