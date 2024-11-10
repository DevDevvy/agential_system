// src/components/SecurityComponent.js
import { useState } from 'react';
import { runSecurityScan, getSecurityResults } from '../services/securityService';

function SecurityComponent() {
    const [modules, setModules] = useState('');
    const [securityReport, setSecurityReport] = useState(null);

    const handleRunScan = async () => {
        const response = await runSecurityScan(modules.split(','));
        setSecurityReport(response.status);
    };

    const handleGetResults = async () => {
        const response = await getSecurityResults();
        setSecurityReport(response.securityReport);
    };

    return (
        <div>
            <h2>Security</h2>
            <input
                type="text"
                placeholder="Modules to scan"
                value={modules}
                onChange={(e) => setModules(e.target.value)}
            />
            <button onClick={handleRunScan}>Run Security Scan</button>
            <button onClick={handleGetResults}>Get Security Results</button>

            {securityReport && (
                <div>
                    <h3>Security Report</h3>
                    <pre>{JSON.stringify(securityReport, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default SecurityComponent;
