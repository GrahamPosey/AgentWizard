// Filename - Agents.jsx
import React, { useEffect, useState } from 'react';


const Agents = () => {

    const handleClick = () => {
        console.log("In handle click");
    };
    const [backendData, setbackendData] = useState([{}]);
    useEffect(() => {
        fetch("/api").then(
            response => response.json()
        ).then(
            data => {
                console.log("here Graham");
                setbackendData(data)
            })
    }, []);
    return (
        <div>
            <div><h1>Copado AI Agents</h1></div>
            <div>
                <h3>Available AI Agents:</h3>
                {(typeof backendData.agents === 'undefined') ? (
                    <p>Loading Agents....</p>
                ) : (
                    backendData.agents.map((agent, i) => (
                        <div id='agentDiv'>
                            <label>
                                <div style={{ display: 'inline-block' }}>
                                    <input type="checkbox" name="myCheckbox" />
                                    <p key={i} style={{ display: 'inline-block', margin: '0 0 0 5px' }}>{agent}</p>
                                </div>
                            </label>
                        </div>
                    ))
                )}
            </div>
            <div id="promptform">
                    <label for="textInput">Prompt:</label>
                    <input type="text" id="inputprompt" name="textInput" placeholder="Enter prompt here..." size="80"></input>
                    <div>
                        <button id="submitprompt" onClick={handleClick} type="submit">Run Prompt</button>
                    </div>    
            </div>
        </div>
    );
};

export default Agents;
