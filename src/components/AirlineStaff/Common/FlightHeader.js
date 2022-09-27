import React from "react";
import { NavLink } from "react-router-dom";
import "./FlightHeader.css";
import { MdFlightTakeoff } from "react-icons/md";

const FlightHeader = () => {
  return (
    <div className="app">
      <div className="nav">
        <nav>
          <NavLink to="/flightHome">Home</NavLink>
          {"  "}
          <NavLink to="/checkIn">Check - In</NavLink>
          {"  "}
          <NavLink to="/inFlight">In - Flight</NavLink>
          <NavLink
            to="/"
            exact
            style={{
              fontSize: "large",
              color: "rgb(131, 110, 223)",
              paddingLeft: "56rem",
            }}
          >
            Mindtree Airline
            <MdFlightTakeoff />
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default FlightHeader;
