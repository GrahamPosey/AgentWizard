import React, { useState } from 'react';
import connectDB from '../db.js';
import { Link } from "react-router-dom";
connectDB();
const Wizard = () => {
  const [currentStep, setCurrentStep] = useState(1); // Manages the current step
  const [formData, setFormData] = useState({
    step1Data: '',
    step2Data: '',
    step3Data: ''
  });

  const handleNext = () => {
    setCurrentStep(prevStep => prevStep + 1); // Move to next step
  };

  const handlePrevious = () => {
    setCurrentStep(prevStep => prevStep - 1); // Move to previous step
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value // Updates form data for the current step
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   agent = 'I am a ' + formData.step2Data + ' that specializes in ' + formData.step3Data;
  //   console.log(agent);
  //   document.getElementById('finalInput').value = '';
  //   // You can submit the form data to the backend (Express API) here
    
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    var agentString = 'I am a ' + formData.step2Data + ' that specializes in ' + formData.step3Data;
    const agent = {
      name: formData.step1Data,
      agentjob: agentString
    };

    try {
      console.log('agent = ' + agent);
      const response = await fetch('http://localhost:5000/createagent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agent)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Agent added:', result);
        alert('Agent created successfully!');
      } else {
        console.error('Failed to create agent');
        alert('Failed to create agent');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the agent');
    }

    // Clear the final input field after submission
    document.getElementById('finalInput').value = ' ';
  };

  return (
    <div>
          <img src="/copado.png" alt="Logo" className="top-right-logo" />
          <div>
        <h1>Copado AI Agents Wizard</h1>
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
      <h2>Step {currentStep}</h2>

      <form onSubmit={handleSubmit}>
        {/* Step 1 */}
        {currentStep === 1 && (
          <div>
            <label>Step 1: Agent's Name: </label>
            <input
              type="text"
              name="step1Data"
              value={formData.step1Data}
              onChange={handleChange}
              placeholder="Enter your Agent's name here..."
              size="40"
            />
          </div>
        )}

        {/* Step 2 */}
        {currentStep === 2 && (
          <div>
            <label>Step 2: Enter your Agent's role: </label>
            <input
              type="text"
              name="step2Data"
              value={formData.step2Data}
              onChange={handleChange}
              placeholder="Enter role here...  "
              size="80"
            />
          </div>
        )}

        {/* Step 3 */}
        {currentStep === 3 && (
          <div>
            <label>Step 3: Enter Agent's specialty: </label>
            <input
              id = "finalInput"
              type="text"
              name="step3Data"
              value={formData.step3Data}
              onChange={handleChange}
              placeholder="Enter specialty here..."
              size="80"
            />
          </div>
        )}

        <div style={{ marginTop: '20px' }}>
          {/* Previous Button */}
          {currentStep > 1 && (
            <button type="button" onClick={handlePrevious}>
              Previous
            </button>
          )}

          {/* Next Button */}
          {currentStep < 3 && (
            <button type="button" onClick={handleNext}>
              Next
            </button>
          )}

          {/* Submit Button (only show on the last step) */}
          {currentStep === 3 && (
            <button type="submit">Create Agent</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Wizard;
