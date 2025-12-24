import React, { useState } from "react";
import axios from "axios";

const Chatbot: React.FC = () => {
    const [userMessage, setUserMessage] = useState<string>("");
    const [botResponse, setBotResponse] = useState<string>("");

    // Fonction pour envoyer le message de l'utilisateur au backend
    const sendMessage = async () => {
        try {
            const response = await axios.post("http://localhost:8000/chat/", {
                message: userMessage,
            });
            // Afficher la réponse du bot
            setBotResponse(response.data.response);
        } catch (error) {
            console.error("Error communicating with the backend:", error);
        }
    };

    return (
        <div className="chatbot-container p-4 max-w-lg mx-auto bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Chatbot</h2>
            <div className="chat-box flex mb-4">
                <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Type your message"
                    className="flex-grow p-2 border border-gray-300 rounded"
                />
                <button
                    onClick={sendMessage}
                    className="ml-2 p-2 bg-blue-500 text-white rounded"
                >
                    Send
                </button>
            </div>
            <div className="response-box">
                <p className="text-lg font-semibold">Bot says:</p>
                <p>{botResponse}</p>
            </div>
        </div>
    );
};

export default Chatbot;
