import React from "react";
import Box from "@mui/material/Box";

const Home = () => {
  return (
    <div className="passenger-app">
      <div className="passenger-image">
        <Box
          mt={1}
          sx={{
            p: 1,
            height: "552px",
          }}
        >
          <h1>Welcome Admin</h1>
          <p style={{ color: "white" }}>
            Please manage passengers and ancillary services per flight through
            above tabs{" "}
          </p>
        </Box>
      </div>
    </div>
  );
};
export default Home;
