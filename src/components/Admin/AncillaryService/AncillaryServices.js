import React from "react";
import { selectFlight } from "../../../features/flight/flightSlice";
import { useSelector } from "react-redux";
import "react-dropdown/style.css";
import SetAncillaryServices from "./SetAncillaryServices";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const lightTheme = createTheme({ palette: { mode: "light" } });
import Box from "@mui/material/Box";

const AncillaryServices = () => {
  const data = useSelector(selectFlight);
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
        <h1 style={{ textAlign: "center" }}>
          Manage Ancillary Service per Flight
        </h1>
        <div style={{ paddingLeft: "100px", paddingRight: "100px" }}>
          {data.flight.map((d) => {
            return (
              <>
                <ThemeProvider theme={lightTheme}>
                  <Box
                    mt={2}
                    sx={{
                      p: 1,
                      bgcolor: "background.default",
                      height:"117px",
                    }}
                    borderRadius="5px"
                  >
                    <div>
                      <h4
                        style={{
                          textAlign: "left",
                          paddingTop: "20px",
                          paddingLeft: "20px",
                        }}
                      >
                        {d.from + " - " + d.to}
                        <br />
                        {"Departure: " + d.Departure + " " + d.time}
                      </h4>
                      <div
                        style={{
                          textAlign: "right",
                          paddingRight: "20px",
                          paddingBottom: "5px",
                        }}
                      >
                        <SetAncillaryServices data={d} />
                      </div>
                    </div>
                  </Box>
                  <br />
                </ThemeProvider>
              </>
            );
          })}
        </div>
        </Box>
      </div>
    </div>
  );
};

export default AncillaryServices;
