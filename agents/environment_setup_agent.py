# environment_setup_agent.py
import sys
import json
from autogen import ConversableAgent

class EnvironmentSetupAgent(ConversableAgent):
    def __init__(self):
        super().__init__(
            "environment_setup_agent",
            system_message="Based on the refined requirements, determine the necessary dependencies and environment setup."
        )

    def determine_environment(self, context):
        requirements = context.get("requirements", {})
        packages = []

        # Example logic to suggest packages based on features
        if "frontend" in requirements:
            if requirements["frontend"].get("framework") == "React":
                packages.append("react")
                packages.append("react-dom")
                packages.append("vite")

        if "backend" in requirements:
            if "authentication" in requirements["backend"].get("security", {}):
                packages.append("jsonwebtoken")  # Example JWT library for Node.js

        if "database" in requirements:
            if requirements["database"].get("type") == "PostgreSQL":
                packages.append("psycopg2")  # Python package for PostgreSQL
            elif requirements["database"].get("type") == "MongoDB":
                packages.append("pymongo")  # Python package for MongoDB

        # Generate environment setup (example for Python and Node.js)
        environment_setup = {
            "python_packages": list(set([pkg for pkg in packages if pkg in ["psycopg2", "pymongo"]])),
            "node_packages": list(set([pkg for pkg in packages if pkg in ["react", "react-dom", "vite", "jsonwebtoken"]])),
            "docker": "Dockerfile setup suggested"  # Placeholder for Docker setup if needed
        }

        context['environment_setup'] = environment_setup
        context['stages']["environment_setup"] = "completed"

        return {
            "message": "Environment setup determined with necessary packages and configurations.",
            "context": context
        }

if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    context = input_data.get("context")
    agent = EnvironmentSetupAgent()
    response = agent.determine_environment(context)
    print(json.dumps(response))
