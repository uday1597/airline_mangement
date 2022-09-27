import React from "react";
import { selectPassenger } from "../../../features/passenger/passengerSlice";
import { useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { selectFlight } from "../../../features/flight/flightSlice";
import SelectAncillaryServices from "./SelectAncillaryServices";

const inFlight = () => {
  const passengerList = useSelector(selectPassenger);
  const flightData = useSelector(selectFlight);

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
          <h1 style={{ textAlign: "center" }}>Manage Check In services</h1>
          {flightData.flight.map((data) => {
            return (
              <div style={{ paddingLeft: "100px", paddingRight: "100px" }}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      <h4
                        style={{
                          textAlign: "left",
                          paddingLeft: "20px",
                        }}
                      >
                        {data.from + " - " + data.to}
                        <br />
                        {"Departure: " + data.Departure + " " + data.time}
                      </h4>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {passengerList.passenger.filter(
                        (p) => p.flightId === data.id
                      ).length === 0 ? (
                        <h4 style={{ color: "grey" }}>
                          Check in passengers to Add/Update Ancillary Services{" "}
                        </h4>
                      ) : (
                        <>
                          <h4 style={{ textAlign: "left" }}>Passengers List</h4>
                          <br />
                          {passengerList.passenger
                            .filter((p) => p.flightId === data.id)
                            .map((passenger, key) => (
                              <div>
                                <Box sx={{ flexGrow: 1 }}>
                                  <Grid
                                    container
                                    spacing={{ xs: 11, md: 1 }}
                                    columns={{ xs: 0, sm: 0, md: 0 }}
                                  >
                                    <div
                                      key={key}
                                      className="passenger-row"
                                      style={{ textAlign: "left" }}
                                    >
                                      Passenger Name : {passenger.name}
                                      <SelectAncillaryServices
                                        data={data}
                                        passenger={passenger}
                                      />
                                    </div>
                                  </Grid>
                                </Box>
                                <br />
                              </div>
                            ))}
                        </>
                      )}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <br />
              </div>
            );
          })}
        </Box>
      </div>
    </div>
  );
};

export default inFlight;
