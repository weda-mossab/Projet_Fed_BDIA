import { useEffect, useState } from "react";
import { testBackend, addNumbers, sayHello } from "./api/backendService";
import { APIError } from "./utils/apiClient";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [sum, setSum] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await testBackend();
        setMessage(response.message);
        setStatus(response.status);
      } catch (err) {
        if (err instanceof APIError) {
          setError(`Error ${err.status}: ${err.message}`);
        } else {
          setError(err.message || "An error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAdd = async () => {
    setLoading(true);
    setError(null);
    setSum(null);
    
    try {
      const result = await addNumbers(7, 5);
      setSum(result.result);
    } catch (err) {
      if (err instanceof APIError) {
        setError(`Error ${err.status}: ${err.message}`);
      } else {
        setError(err.message || "Error calculating sum");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleHello = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await sayHello();
      setMessage(response.message);
    } catch (err) {
      if (err instanceof APIError) {
        setError(`Error ${err.status}: ${err.message}`);
      } else {
        setError(err.message || "Error fetching hello message");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Communication React → FastAPI</h1>
        <p className="subtitle">Professional API Integration</p>
      </header>

      <main className="App-main">
        <section className="status-section">
          <h2>Backend Status</h2>
          {loading && <p className="loading">Loading...</p>}
          {error && (
            <div className="error">
              <strong>Error:</strong> {error}
            </div>
          )}
          {!error && status && (
            <div className="success">
              <strong>Status:</strong> {status}
            </div>
          )}
          {!error && message && (
            <p className="message">
              <strong>Message:</strong> {message}
            </p>
          )}
        </section>

        <section className="actions-section">
          <h2>Actions</h2>
          <div className="button-group">
            <button 
              onClick={handleHello} 
              disabled={loading}
              className="btn btn-primary"
            >
              Get Hello Message
            </button>
            <button 
              onClick={handleAdd} 
              disabled={loading}
              className="btn btn-secondary"
            >
              Add 7 + 5
            </button>
          </div>
          {sum !== null && (
            <div className="result">
              <strong>Result:</strong> {sum}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
