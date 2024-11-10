// src/components/TestingComponent.js
import { useState } from 'react';
import { runTests, getTestResults } from '../services/testingService';

function TestingComponent() {
    const [tests, setTests] = useState('');
    const [results, setResults] = useState(null);

    const handleRunTests = async () => {
        const response = await runTests(tests.split(','));
        setResults(response.status);
    };

    const handleGetResults = async () => {
        const response = await getTestResults();
        setResults(response.results);
    };

    return (
        <div>
            <h2>Testing</h2>
            <input
                type="text"
                placeholder="Tests (e.g., unit, integration)"
                value={tests}
                onChange={(e) => setTests(e.target.value)}
            />
            <button onClick={handleRunTests}>Run Tests</button>
            <button onClick={handleGetResults}>Get Test Results</button>

            {results && (
                <div>
                    <h3>Test Results</h3>
                    <pre>{JSON.stringify(results, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default TestingComponent;
