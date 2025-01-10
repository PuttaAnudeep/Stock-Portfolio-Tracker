import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./index.css" // Import global CSS (Tailwind setup or custom styles)

// Create the root element and render the App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<React.StrictMode>
    <App />
</React.StrictMode>
);
