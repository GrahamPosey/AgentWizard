// Filename - Home.jsx

import React from "react";
// Importing Link from react-router-dom to 
// navigate to different end points.
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
                <img src="/copado.png" alt="Logo" className="top-right-logo" />

            <h1>Agent Home Page</h1>
            <br />
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
        </div>
    );
};

export default Home;
