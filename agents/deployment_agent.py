# agents/deployment_agent.py
import sys
import os
import json
from autogen import ConversableAgent
from autogen.code_execution import DockerCodeExecutor

class DeploymentAgent(ConversableAgent):
    def __init__(self):
        super().__init__(
            "deployment",
            system_message=(
                "You are a deployment agent responsible for containerizing and deploying applications. "
                "Ensure the deployment is production-ready, secure, and configured for scalability."
            ),
            llm_config={"config_list": [{"model": "gpt-4", "api_key": os.getenv("OPENAI_API_KEY")}]},
            code_executor=DockerCodeExecutor()
        )

    def deploy_application(self, environment):
        return self.generate_reply([{"content": f"Deploy the application to the {environment} environment.", "role": "user"}])

if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    environment = input_data.get("environment")
    
    agent = DeploymentAgent()
    response = agent.deploy_application(environment)
    
    print(json.dumps({"deploymentStatus": response}))
