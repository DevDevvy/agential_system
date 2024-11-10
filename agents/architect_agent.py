# architect_agent.py
import sys
import json
from autogen import ConversableAgent

class ArchitectAgent(ConversableAgent):
    def __init__(self):
        super().__init__(
            "architect_agent",
            system_message="Your task is to design the architecture based on requirements."
        )

    def design_architecture(self, context):
        context['requirements']["architecture"] = {"services": ["Auth Service", "Data Service"], "database": "PostgreSQL"}
        context['stages']["develop_frontend"] = "ready"
        return {"message": "Architecture design complete.", "context": context}

if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    context = input_data.get("context")
    agent = ArchitectAgent()
    response = agent.design_architecture(context)
    print(json.dumps(response))
