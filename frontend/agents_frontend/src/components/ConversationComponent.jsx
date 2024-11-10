// src/components/ConversationComponent.js
import { useState } from 'react';
import { startConversation, clarifyConversation, confirmConversation } from '../services/conversationService';

function ConversationComponent() {
    const [projectName, setProjectName] = useState('');
    const [messages, setMessages] = useState([]);
    const [clarification, setClarification] = useState('');

    const handleStartConversation = async () => {
        try {
            const response = await startConversation(projectName);
            setMessages([...messages, response.message]);
        } catch (error) {
            console.error("Error in conversation:", error);
        }
    };

    const handleClarify = async () => {
        try {
            const response = await clarifyConversation(clarification);
            setMessages([...messages, response.message]);
        } catch (error) {
            console.error("Error clarifying conversation:", error);
        }
    };

    const handleConfirm = async () => {
        try {
            const response = await confirmConversation();
            setMessages([...messages, response.message]);
        } catch (error) {
            console.error("Error confirming conversation:", error);
        }
    };

    return (
        <div>
            <h2>Conversational Agent</h2>
            <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
            />
            <button onClick={handleStartConversation}>Start Conversation</button>

            <div>
                <h3>Conversation History</h3>
                {messages.map((msg, index) => <p key={index}>{msg}</p>)}
            </div>

            <input
                type="text"
                value={clarification}
                onChange={(e) => setClarification(e.target.value)}
                placeholder="Enter clarification"
            />
            <button onClick={handleClarify}>Clarify</button>

            <button onClick={handleConfirm}>Confirm Requirements</button>
        </div>
    );
}

export default ConversationComponent;
