import { Box } from "@mui/material";
import React from "react";

const FlightHome = () => {
  return (
    <div className="passenger-app">
      <div className="passenger-image">
        <Box
          mt={1}
          sx={{
            p: 1,
            height: "565px",
          }}
        >
          <h1>Welcome Airline staff</h1>
          <p style={{ color: "white" }}>
            Please manage check-in and in-flight services per flight through
            above tabs
          </p>
        </Box>
      </div>
    </div>
  );
};
export default FlightHome;
