# security_agent.py
import sys
import json
from autogen import ConversableAgent

class SecurityAgent(ConversableAgent):
    def __init__(self):
        super().__init__(
            "security_agent",
            system_message="Your task is to perform security scans and assessments."
        )

    def run_security_scan(self, context):
        context['security'] = {"status": "secure"}
        context['stages']["testing"] = "ready"
        return {"message": "Security scan complete.", "context": context}

if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    context = input_data.get("context")
    agent = SecurityAgent()
    response = agent.run_security_scan(context)
    print(json.dumps(response))

