# api_integration_agent.py
import sys
import json
from autogen import ConversableAgent

class APIIntegrationAgent(ConversableAgent):
    def __init__(self):
        super().__init__(
            "api_integration_agent",
            system_message="Your task is to integrate any required external APIs."
        )

    def integrate_apis(self, context):
        context['requirements']["apis"] = ["payment", "email"]
        context['stages']["quality_check"] = "ready"
        return {"message": "API integration complete.", "context": context}

if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    context = input_data.get("context")
    agent = APIIntegrationAgent()
    response = agent.integrate_apis(context)
    print(json.dumps(response))
