// src/components/ArchitectureComponent.js
import { useState } from 'react';
import { designArchitecture, getArchitectureStatus } from '../services/architectureService';

function ArchitectureComponent() {
    const [requirements, setRequirements] = useState('');
    const [architecture, setArchitecture] = useState(null);
    const [status, setStatus] = useState('');

    const handleDesignArchitecture = async () => {
        try {
            const response = await designArchitecture(requirements);
            setArchitecture(response.architecture);
        } catch (error) {
            console.error("Error designing architecture:", error);
        }
    };

    const handleGetStatus = async () => {
        try {
            const response = await getArchitectureStatus();
            setStatus(response.status);
        } catch (error) {
            console.error("Error getting architecture status:", error);
        }
    };

    return (
        <div>
            <h2>Architecture Design</h2>
            <input
                type="text"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="Enter requirements"
            />
            <button onClick={handleDesignArchitecture}>Design Architecture</button>

            <div>
                <h3>Architecture</h3>
                <p>{architecture}</p>
            </div>

            <button onClick={handleGetStatus}>Check Status</button>
            <p>Status: {status}</p>
        </div>
    );
}

export default ArchitectureComponent;
