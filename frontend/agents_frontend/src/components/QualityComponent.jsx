// src/components/QualityComponent.js
import { useState } from 'react';
import { checkCodeQuality, getQualityResults } from '../services/qualityService';

function QualityComponent() {
    const [files, setFiles] = useState('');
    const [qualityReport, setQualityReport] = useState(null);

    const handleCheckQuality = async () => {
        const response = await checkCodeQuality(files.split(','));
        setQualityReport(response.status);
    };

    const handleGetQualityResults = async () => {
        const response = await getQualityResults();
        setQualityReport(response.qualityReport);
    };

    return (
        <div>
            <h2>Code Quality</h2>
            <input
                type="text"
                placeholder="Files (e.g., frontend.js, backend.js)"
                value={files}
                onChange={(e) => setFiles(e.target.value)}
            />
            <button onClick={handleCheckQuality}>Check Quality</button>
            <button onClick={handleGetQualityResults}>Get Quality Results</button>

            {qualityReport && (
                <div>
                    <h3>Quality Report</h3>
                    <pre>{JSON.stringify(qualityReport, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default QualityComponent;
