// src/App.jsx
import React, { useState, useEffect } from "react";
import Chat from "./pages/Chat";
import ArchitectureComponent from "./components/ArchitectureComponent";
import FeatureDevelopmentComponent from "./components/FeatureDevelopmentComponent";
import SecurityComponent from "./components/SecurityComponent";
import QualityComponent from "./components/QualityComponent";
import TestingComponent from "./components/TestingComponent";
import DeploymentComponent from "./components/DeploymentComponent";
import axios from "axios";

const App = () => {
  const [currentStage, setCurrentStage] = useState("conversation");
  const [conversationData, setConversationData] = useState([]);
  const [context, setContext] = useState({});
  //import VITE_API_BASE_URL from .env file
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

  // Function to handle messages and update stage
  const handleSendMessage = async (message) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/agents/conversation`, {
        userId: "user123",
        message,
      });

      // Update conversation data
      setConversationData((prev) => [
        ...prev,
        { fromUser: true, text: message },
      ]);
      setConversationData((prev) => [
        ...prev,
        { fromUser: false, text: response.data.response },
      ]);

      // Update stage and context if provided in response
      if (response.data.stage && response.data.stage !== currentStage) {
        setCurrentStage(response.data.stage);
        setContext(response.data.context || {});
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Renders the appropriate component based on the current stage
  const renderStageComponent = () => {
    switch (currentStage) {
      case "conversation":
        return (
          <Chat
            conversationData={conversationData}
            sendMessage={handleSendMessage}
          />
        );
      case "design_architecture":
        return <ArchitectureComponent context={context} />;
      case "feature_development":
        return <FeatureDevelopmentComponent context={context} />;
      case "quality_check":
        return <QualityComponent context={context} />;
      case "security_scan":
        return <SecurityComponent context={context} />;
      case "testing":
        return <TestingComponent context={context} />;
      case "deployment":
        return <DeploymentComponent context={context} />;
      default:
        return <p>Loading...</p>;
    }
  };

  return (
    <div>
      <h1>Agential Application Development Assistant</h1>
      {renderStageComponent()}
    </div>
  );
};

export default App;
