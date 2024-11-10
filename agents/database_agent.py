# database_agent.py
import sys
import json
from autogen import ConversableAgent

class DatabaseAgent(ConversableAgent):
    def __init__(self):
        super().__init__(
            "database_agent",
            system_message="Your task is to set up and configure the database."
        )

    def configure_database(self, context):
        context['requirements']["database"] = {"type": "PostgreSQL", "schema": ["users", "data"]}
        context['stages']["integrate_apis"] = "ready"
        return {"message": "Database configuration complete.", "context": context}

if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    context = input_data.get("context")
    agent = DatabaseAgent()
    response = agent.configure_database(context)
    print(json.dumps(response))
