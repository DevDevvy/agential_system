# conversational_agent.py
import sys
import json
from autogen import ConversableAgent

class ConversationalAgent(ConversableAgent):
    def __init__(self):
        super().__init__(
            "conversational_agent",
            system_message=(
                "You are responsible for gathering initial project requirements. "
                "Ask questions about features, architecture, design, and security needs. "
                "Provide JSON responses in the following format:\n"
                "{\n"
                '  "message": "<response>",\n'
                '  "requirementsComplete": <true/false>,\n'
                '  "context": <context updates>\n'
                "}"
            )
        )

def gather_requirements(self, message, context):
    # This is a simplified dynamic question generation
    if "finalize requirements" in message.lower():
        context['stages']["clarify_requirements"] = "completed"
        return {"message": "Requirements gathering is complete.", "context": context}
    else:
        # Ask clarifying questions based on previous context
        if "features" not in context["requirements"]:
            question = "What features should the application include? For example, login, dashboard, etc."
        elif "security" not in context["requirements"]:
            question = "What security measures should be in place? E.g., authentication, data encryption, etc."
        else:
            question = self.generate_reply([{"content": message, "role": "user"}])

        # Update context dynamically based on gathered responses
        if "features" not in context["requirements"]:
            context["requirements"]["features"] = []
        context["requirements"]["features"].append(message)  # Assuming user specifies features

        return {"message": question, "context": context}


if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    message = input_data.get("message")
    context = input_data.get("context", {"stages": {}})
    agent = ConversationalAgent()
    response = agent.gather_requirements(message, context)
    print(json.dumps(response))

