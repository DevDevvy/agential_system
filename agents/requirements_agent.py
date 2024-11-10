# requirements_agent.py
import sys
import json
from autogen import ConversableAgent

class RequirementsAgent(ConversableAgent):
    def __init__(self):
        super().__init__(
            "requirements_agent",
            system_message="Your task is to refine and validate gathered requirements. "
        )

def refine_requirements(self, context):
    features = context["requirements"].get("features", [])
    refined_features = []

    # Check for keywords and dynamically add recommendations
    for feature in features:
        if "user" in feature.lower():
            refined_features.append("User Profile")
        elif "notification" in feature.lower():
            refined_features.append("Email Notifications")

    context["requirements"]["features"] = list(set(features + refined_features))  # Avoid duplicates
    context['stages']["design_architecture"] = "ready"
    
    return {"message": "Requirements refined and validated.", "context": context}


if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    context = input_data.get("context")
    agent = RequirementsAgent()
    response = agent.refine_requirements(context)
    print(json.dumps(response))
