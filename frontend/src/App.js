import { useEffect, useState } from "react";
import { testBackend, addNumbers } from "./api/backendService";

function App() {
  const [message, setMessage] = useState("");
  const [sum, setSum] = useState(null);

  useEffect(() => {
    testBackend().then(res => setMessage(res.message));
  }, []);

  const handleAdd = async () => {
    const result = await addNumbers(7, 5);
    setSum(result.result);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Communication React → Flask</h1>
      <p>Backend says: {message}</p>

      <button onClick={handleAdd}>Add 7 + 5</button>
      {sum !== null && <p>Result: {sum}</p>}
    </div>
  );
}

export default App;
