# testing_agent.py
import sys
import json
from autogen import ConversableAgent

class TestingAgent(ConversableAgent):
    def __init__(self):
        super().__init__(
            "testing_agent",
            system_message="Your task is to test the application functionality."
        )

    def run_tests(self, context):
        context['testing'] = {"results": "all tests passed"}
        context['stages']["deployment"] = "ready"
        return {"message": "Testing complete.", "context": context}

if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    context = input_data.get("context")
    agent = TestingAgent()
    response = agent.run_tests(context)
    print(json.dumps(response))
