/** @format */

import React from "react";
import './loader.css'


function Loader() {


    return (
      <div className="loader-wrapper">
        <div className="balls-wrapper">
          <div className="ball"></div>
          <div className="ball"></div>
          <div className="ball"></div>
        </div>
      </div>
    );
}

export default Loader;
