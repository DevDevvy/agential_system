// src/components/DeploymentComponent.js
import { useState } from 'react';
import { containerizeApplication, deployApplication, getDeploymentStatus } from '../services/deploymentService';

function DeploymentComponent() {
    const [services, setServices] = useState('');
    const [environment, setEnvironment] = useState('');
    const [deploymentStatus, setDeploymentStatus] = useState(null);

    const handleContainerize = async () => {
        const response = await containerizeApplication(services.split(','));
        setDeploymentStatus(response.status);
    };

    const handleDeploy = async () => {
        const response = await deployApplication(environment);
        setDeploymentStatus(response.status);
    };

    const handleGetStatus = async () => {
        const response = await getDeploymentStatus();
        setDeploymentStatus(response.status);
    };

    return (
        <div>
            <h2>Deployment</h2>
            <input
                type="text"
                placeholder="Services to containerize"
                value={services}
                onChange={(e) => setServices(e.target.value)}
            />
            <button onClick={handleContainerize}>Containerize Application</button>

            <input
                type="text"
                placeholder="Environment (e.g., production)"
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
            />
            <button onClick={handleDeploy}>Deploy Application</button>
            <button onClick={handleGetStatus}>Get Deployment Status</button>

            {deploymentStatus && (
                <div>
                    <h3>Deployment Status</h3>
                    <p>{deploymentStatus}</p>
                </div>
            )}
        </div>
    );
}

export default DeploymentComponent;
