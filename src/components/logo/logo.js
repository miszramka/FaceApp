import React from "react";
import Tilt from "react-parallax-tilt";
import "./logo.css";
import ms from "../logo/logoMS.png";

const Logo = () => {
  return (
    <div className="ma4 mt2">
      <Tilt className="Tilt br4 shadow-5 ma1">
        <div>
          <img
            src={ms}
            style={{ paddingTop: "10px", paddingRight: "10px" }}
            height={100}
            alt="logoMS"
          />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
