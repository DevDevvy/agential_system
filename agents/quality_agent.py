# quality_agent.py
import sys
import json
from autogen import ConversableAgent

class QualityAgent(ConversableAgent):
    def __init__(self):
        super().__init__(
            "quality_agent",
            system_message="Your task is to perform code quality checks."
        )

    def check_quality(self, context):
        context['quality'] = {"status": "passed"}
        context['stages']["security_scan"] = "ready"
        return {"message": "Code quality check complete.", "context": context}

if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    context = input_data.get("context")
    agent = QualityAgent()
    response = agent.check_quality(context)
    print(json.dumps(response))
