import React from "react";
import { Spinner } from "react-bootstrap"; // Bootstrap Spinner
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <p>Loading, please wait...</p>
    </div>
  );
};

export default Loader;
