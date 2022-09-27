import React, { useState } from "react";
import { MdFlightTakeoff } from "react-icons/md";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useHistory } from "react-router-dom";
import Header from "./Admin/Common/Header";
import FlightHeader from "./AirlineStaff/Common/FlightHeader";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Login from "./google/Login";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const lightTheme = createTheme({ palette: { mode: "light" } });
const WelcomPage = () => {
  const [role, setRole] = useState();
  const [select, setSelect] = useState(false);
  const [login, setLogin] = useState(false);
  const history = useHistory();
  const handleChange = (props) => {
    setRole(props.target.value);
    history.push(props.target.value === 1 ? "/home" : "/flightHome");
  };
  const showDropDown = () => {
    setSelect(true);
    setLogin(true);
  };
  const styles = (theme) => ({
    select: {
      "&:before": {
        borderColor: color,
      },
      "&:after": {
        borderColor: color,
      },
    },
    icon: {
      fill: color,
    },
  });
  return (
    <>
      {role === 2 ? (
        <>
          <FlightHeader />
        </>
      ) : role === 1 ? (
        <>
          <Header />
        </>
      ) : (
        <>
          <h1 style={{ color: "black", textAlign: "center", margin: "15px 0" }}>
            Mintdree Airlines&nbsp;
            <MdFlightTakeoff />
          </h1>{" "}
          <div className="passenger-app">
            <div className="passenger-image">
              <Box
                mt={1}
                sx={{
                  p: 1,
                  height: "558px",
                }}
              >
                <br />
                {select && (
                  <>
                    <h3 style={{ color: "white" }}>Please select a role. </h3>
                    <br />
                    <div style={{ paddingLeft: "570px" }}>
                      <ThemeProvider theme={lightTheme}>
                        <Box
                          sx={{
                            p: 1,
                            bgcolor: "background.default",
                            width: "205px",
                          }}
                        >
                          <FormControl sx={{ m: 0.1, minWidth: 180 }}>
                            <InputLabel>Role</InputLabel>
                            <Select value={role} onChange={handleChange}>
                              <MenuItem value={1}>Admin</MenuItem>
                              <MenuItem value={2}>Airline Staff</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </ThemeProvider>
                    </div>
                  </>
                )}
                {!login && (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    paddingLeft="420px"
                    paddingTop="100px"
                  >
                    {" "}
                    <Grid container spacing={6}>
                      <Grid item xs={2.7}>
                        <Login />
                      </Grid>
                      <Grid item xs={5.8}>
                        <Button
                          variant="contained"
                          color="success"
                          style={{
                            width: 275,
                            height: 160,
                            fontSize: 16,
                            fontWeight: 700,
                          }}
                          onClick={showDropDown}
                        >
                          {" "}
                          Free demo <br />
                          without Login
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Box>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default WelcomPage;
