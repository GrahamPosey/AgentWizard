import React, { useEffect, useState } from 'react'

function App() {

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
      <div><h1>Copado Agents</h1></div>
      <div>
        <h3>Available Agents:</h3>
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
    </div>
  )
}

export default App