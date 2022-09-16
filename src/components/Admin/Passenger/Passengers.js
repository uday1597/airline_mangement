import React, { useState } from "react";
import PassengersForm from "./PassengersForm";
import { TiEdit } from "react-icons/ti";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPassenger,
  updatePassengers,
  filterPassenger,
} from "../../../features/passenger/passengerSlice";
import ToastServive from "react-material-toast";
import Grid from "@mui/material/Grid";
import { Paper } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const Passenger = () => {
  const toast = ToastServive.new({
    place: "topRight",
    duration: 2,
    maxCount: 8,
  });
  const [value, setValue] = React.useState("all");

  const passengerList = useSelector(selectPassenger);
  const dispatch = useDispatch();
  const displayPassengers = passengerList.passenger.map((p) => {
    if (p.display) {
      return p;
    }
  });

  const [edit, setEdit] = useState({
    editedId: null,
    id: null,
    nameValue: "",
    passValue: "",
    addressValue: "",
    dobValue: "",
    seatPrefValue: "",
    passengerValue: {},
  });
  const submitUpdate = (value) => {
    const json = {
      editedId: edit.id,
      id: value.id,
      name: value.name,
      pass: value.pass,
      address: value.address,
      dob:
        value.dob !== null
          ? typeof value.dob === "string"
            ? value.dob
            : "" + value.dob.$d
          : "",
      seatPref: value.seatPref,
      flightId: value.flightId,
      route: value.route,
      seat: value.seat,
      ancillaryServices: value.ancillaryServices,
      mealPreference: value.mealPreference,
      shopRequest: value.shopRequest,
    };
    dispatch(updatePassengers(json));
    toast.info("Passenger Updated.");
    setEdit({
      editedId: null,
      id: null,
      nameValue: "",
      passValue: "",
      addressValue: "",
      dobValue: "",
      seatPrefValue: "",
      passengerValue: {},
    });
  };
  const filterMethod = (event) => {
    setValue(event.target.value);
    const json = {
      filter: event.target.value,
    };
    dispatch(filterPassenger(json));
  };
  if (edit.id) {
    return (
      <Dialog open="true">
        <DialogContent>
          <PassengersForm edit={edit} onSubmit={submitUpdate} />{" "}
        </DialogContent>
      </Dialog>
    );
  }
  const addPassenger = () => {};

  return (
    <div className="passenger-app">
      <div className="passenger-image">
        <h1>Manage Passengers</h1>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <PassengersForm onSubmit={addPassenger} />
          </Grid>
          <Grid item xs={8}>
            <div style={{ paddingRight: "35px" }}>
              <div className="filter">
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    <h4 style={{ color: "white", paddingLeft: "60px" }}>
                      Filter passengers by missing mandatory requirements
                    </h4>
                  </FormLabel>
                  <RadioGroup
                    row
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 15,
                      },
                      paddingLeft: "120px",
                    }}
                    value={value}
                    onChange={filterMethod}
                    defaultValue="all"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="all"
                      control={<Radio />}
                      label="All"
                    />
                    <FormControlLabel
                      value="pass"
                      control={<Radio />}
                      label="Passport"
                    />
                    <FormControlLabel
                      value="address"
                      control={<Radio />}
                      label="Address"
                    />
                    <FormControlLabel
                      value="dob"
                      control={<Radio />}
                      label="Date of birth"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>

            <Grid item xs={12}>
              <h4
                style={{ color: "white", textAlign: "left", padding: "20px" }}
              >
                Paasengers List
              </h4>
              <Paper
                style={{
                  maxHeight: 330,
                  overflow: "auto",
                  maxWidth: 860,
                  borderRadius: "5px",
                }}
              >
                <br />
                {!displayPassengers.length > 0 ? (
                  <h4
                    style={{
                      color: "grey",
                      textAlign: "center",
                      paddingBottom: "20px",
                    }}
                  >
                    Add Passengers
                  </h4>
                ) : (
                  displayPassengers
                    .reverse()
                    .filter((d) => d !== undefined)
                    .map((passenger, key) => (
                      <div key={key} className="passenger-row">
                        <div style={{ textAlign: "left", paddingLeft: "20px" }}>
                          Name: {passenger.name}
                          <br />
                          Passport Number: {passenger.pass}
                          <br />
                          Address: {passenger.address}
                          <br />
                          Ancillary: {passenger.ancillaryServices.join(", ")}
                          <br />
                          Seat Number: {passenger.seat}
                          <br />
                          Seat Preference: {passenger.seatPref}
                          <br />
                          Date of birth: {passenger.dob}
                        </div>
                        <div className="icons">
                          <TiEdit
                            onClick={() =>
                              setEdit({
                                editedId: null,
                                id: passenger.id,
                                nameValue: passenger.name,
                                passValue: passenger.pass,
                                addressValue: passenger.address,
                                dobValue: passenger.dob,
                                seatPrefValue: passenger.seatPref,
                                passengerValue: passenger,
                              })
                            }
                            className="edit-icon"
                          />
                        </div>
                      </div>
                    ))
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default Passenger;
