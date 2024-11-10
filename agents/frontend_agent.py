# frontend_agent.py
import sys
import json
from autogen import ConversableAgent

class FrontendAgent(ConversableAgent):
    def __init__(self):
        super().__init__(
            "frontend_agent",
            system_message="Your task is to design and implement the frontend components."
        )

    def develop_frontend(self, context):
        context['requirements']["frontend"] = {"framework": "React", "components": ["Navbar", "Footer", "Dashboard"]}
        context['stages']["develop_backend"] = "ready"
        return {"message": "Frontend development complete.", "context": context}

if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    context = input_data.get("context")
    agent = FrontendAgent()
    response = agent.develop_frontend(context)
    print(json.dumps(response))

