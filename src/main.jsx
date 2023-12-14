import React from "react";
import ReactDOM from "react-dom/client";
// import StarRating from "./components/StarRating";
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />

    {/* <StarRating maxRating={5} /> */}
    {/* <StarRating maxRating={10} defaultRating={2} color="blue" size={24} /> */}
  </React.StrictMode>
);
