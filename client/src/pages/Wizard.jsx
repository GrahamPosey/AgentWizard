import React, { useState } from 'react';
//import connectDB from '../db.js';
const Wizard = () => {
  var agent;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    agent = 'I am a ' + formData.step2Data + ' that specializes in ' + formData.step3Data;
    console.log(agent);
    document.getElementById('finalInput').value = '';
    // You can submit the form data to the backend (Express API) here
  };

  return (
    <div>
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
