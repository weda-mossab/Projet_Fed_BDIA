const API_URL = "http://127.0.0.1:5000/api";

export async function testBackend() {
  try {
    const response = await fetch(`${API_URL}/test`);
    return await response.json();
  } catch (error) {
    return { error: "Cannot reach backend" };
  }
}

export async function sayHello() {
  try {
    const response = await fetch(`${API_URL}/hello`);
    return await response.json();
  } catch (err) {
    return { error: "Backend not available" };
  }
}

export async function addNumbers(a, b) {
  try {
    const response = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b })
    });
    return await response.json();
  } catch (err) {
    return { error: "Error calling API" };
  }
}
