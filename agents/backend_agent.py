# backend_agent.py
import sys
import json
from autogen import ConversableAgent

class BackendAgent(ConversableAgent):
    def __init__(self):
        super().__init__(
            "backend_agent",
            system_message="Your task is to design and implement backend services."
        )

    def develop_backend(self, context):
        context['requirements']["backend"] = {"endpoints": ["/login", "/getData"], "security": {"auth": "JWT"}}
        context['stages']["configure_database"] = "ready"
        return {"message": "Backend development complete.", "context": context}

if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    context = input_data.get("context")
    agent = BackendAgent()
    response = agent.develop_backend(context)
    print(json.dumps(response))
