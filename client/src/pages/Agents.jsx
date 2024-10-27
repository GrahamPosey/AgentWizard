// Filename - Agents.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import * as agentModel from '../../../model/Agent.js'

const Agents = () => {
  const [prompt, setPrompt] = useState("");
  //const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const startStream = async () => {
    setResponseText(''); // Reset response text
    setIsStreaming(true);
    const checked = document.querySelectorAll('input[type="checkbox"]:checked');
    
    var roleCombo = '';
    checked.forEach(checkbox => {
        roleCombo += checkbox.getAttribute('data-hidden-value');
    });
    console.log('roleCombo = ' + roleCombo);
    const promptRole = {
        role: roleCombo,
        promptText: prompt
      };

    try {

      const response = await fetch("http://localhost:5000/api/generate", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(promptRole),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        setResponseText((prev) => prev + chunk);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
        setIsStreaming(false);
        setLoading(false); // Hide spinner
    }
  };

  const [backendData, setbackendData] = useState([{}]);
  useEffect(() => {
    fetch("/agents")
      .then((response) => response.json())
      .then((data) => {
        console.log("here Graham");
        console.log("data = " + data);
        setbackendData(data);
      });
  }, []);
  return (
    <div>
    <img src="/copado.png" alt="Logo" className="top-right-logo" />
      <div>
        <h1>Copado AI Agents</h1>
      </div>
      <ul>
                <li>
                    {/* Endpoint to route to Home component */}
                    <Link to="/">Home</Link>
                </li>
                <li>
                    {/* Endpoint to route to About component */}
                    <Link to="/agents">Available Agents</Link>
                </li>
                <li>
                    {/* Endpoint to route to Contact Us component */}
                    <Link to="/wizard">Create New Agent</Link>
                </li>
            </ul>
      <div>
        <h3>Available AI Agents:</h3>
        {typeof backendData === "undefined" ? (
          <p>Loading Agents....</p>
        ) : (
          backendData.map((agent, i) => (
            <div id="agentDiv">
              <label>
                <div style={{ display: "inline-block" }}>
                  <input type="checkbox" data-hidden-value={agent.agentjob} name="myCheckbox" />
                  <p 
                    key={i}
                    style={{ display: "inline-block", margin: "0 0 0 5px" }}
                  ><b>
                    Agent: {agent.name}
                    </b>
                  </p>
                  <p>{agent.agentjob}</p>
                </div>
              </label>
            </div>
          ))
        )}
      </div>
      <div id="promptform">
        <label for="textInput">Prompt:</label>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          id="inputprompt"
          name="textInput"
          placeholder="Enter prompt here..."
          size="80"
        ></input>
        <div>
            <button onClick={startStream} disabled={isStreaming}>
                {isStreaming ? "Waiting..." : "Submit Prompt"}
            </button>
        </div>
      </div>
            {/* Loading spinner */}
            {loading && (
        <div className="spinner">
          <div className="spinner-border"></div>
        </div>
      )}
      <div style={{ display: responseText ? "block" : "none" }}>
        <h3>Response:</h3>
        <p>{responseText}</p>
      </div>
    </div>
  );
};

export default Agents;
