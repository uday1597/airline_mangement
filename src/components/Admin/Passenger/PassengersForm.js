import React, { useState } from "react";
import { addPassenger } from "../../../features/passenger/passengerSlice";
import { useDispatch } from "react-redux";
import ToastServive from "react-material-toast";
import { Button, TextField } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const lightTheme = createTheme({ palette: { mode: "light" } });

function PassengersForm(props) {
  const date = new Date();
  const minDate = new Date(
    date.getFullYear() - 80,
    date.getMonth(),
    date.getDate()
  );
  const maxDate = new Date(
    date.getFullYear() - 12,
    date.getMonth(),
    date.getDate()
  );
  const toast = ToastServive.new({
    place: "topRight",
    duration: 2,
    maxCount: 8,
  });
  const dispatch = useDispatch();
  const [enable, setEnable] = useState(false);

  const [inputName, setInputName] = useState(
    props.edit ? props.edit.nameValue : ""
  );
  const [inputPass, setInputPass] = useState(
    props.edit ? props.edit.passValue : ""
  );
  const [inputAddress, setInputAddress] = useState(
    props.edit ? props.edit.addressValue : ""
  );
  const [inputDob, setInputDob] = useState(
    props.edit ? props.edit.dobValue : null
  );
  const [inputSeatPref, setInputSeatPref] = useState(
    props.edit ? props.edit.seatPrefValue : ""
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      id: Math.floor(Math.random() * 1000),
      name: inputName,
      pass: inputPass,
      address: inputAddress,
      dob: inputDob !== null ? "" + inputDob.$d : "",
      seatPref: inputSeatPref,
      seat: "",
      display: true,
      ancillaryServices: [],
      mealPreference: [],
      shopRequest: [],
    };
    if (!props.edit) {
      dispatch(addPassenger(obj));
      toast.success("Passenger Added!!!");
    } else {
      props.onSubmit({
        id: Math.floor(Math.random() * 1000),
        name: inputName,
        pass: inputPass,
        address: inputAddress,
        dob: inputDob,
        seatPref: inputSeatPref,
      });
    }
    setInputName("");
    setInputPass("");
    setInputAddress("");
    setInputDob("");
    setInputSeatPref("");
  };
  return (
    <div>
      <form className="passenger-form" onSubmit={handleSubmit} elevation={24}>
        {!props.edit ? (
          <>
            <ThemeProvider theme={lightTheme}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "background.default",
                  width: "335px",
                  height:"459px",
                  paddingLeft: "50px",
                  borderRadius:"5px"
                }}
              >
                <h4>Add a Passenger</h4>
                <TextField
                  required
                  label="Passenger Name"
                  helperText="Enter Passenger"
                  defaultValue={inputName}
                  name="name"
                  onChange={(newValue) => {
                    setInputName(newValue.target.value);
                    setEnable(newValue.target.value !== "");
                  }}
                />
                <br />
                <TextField
                  label="Passport Number"
                  helperText="Enter Password Number"
                  defaultValue={inputPass}
                  name="pass"
                  onChange={(newValue) => {
                    setInputPass(newValue.target.value);
                  }}
                />
                <br />
                <TextField
                  label="Address"
                  helperText="Enter Address"
                  defaultValue={inputAddress}
                  name="address"
                  onChange={(newValue) => {
                    setInputAddress(newValue.target.value);
                  }}
                />
                <br />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of birth"
                    value={inputDob}
                    openTo="year"
                    minDate={dayjs(minDate)}
                    maxDate={dayjs(maxDate)}
                    onChange={(newValue) => {
                      setInputDob(newValue);
                    }}
                    helperText="Enter Date of Birth"
                    name="dob"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <br />
                <br />
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Seating Preference
                  </FormLabel>

                  <RadioGroup
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 18,
                      },
                      paddingLeft: "10px",
                    }}
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue=""
                    onChange={(newValue) => {
                      setInputSeatPref(newValue.target.value);
                    }}
                    value={inputSeatPref}
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value=""
                      control={<Radio />}
                      label="None"
                    />
                    <FormControlLabel
                      value="Wheel Chair"
                      control={<Radio />}
                      label="Wheel Chair"
                    />
                    <FormControlLabel
                      value="Infant"
                      control={<Radio />}
                      label="Infant"
                    />
                  </RadioGroup>
                </FormControl>
                <br />
                <div style={{ paddingLeft: "130px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!enable}
                  >
                    Add Passenger
                  </Button>
                </div>
              </Box>
            </ThemeProvider>
          </>
        ) : (
          <>
            <h4>Update Passenger</h4>
            <TextField
              label="Passenger Name"
              helperText="Update Passenger"
              defaultValue={inputName}
              name="name"
              onChange={(newValue) => {
                setInputName(newValue.target.value);
                setEnable(newValue.target.value !== "");
              }}
            />
            <br />
            <TextField
              label="Passport Number"
              helperText="Update Password Number"
              defaultValue={inputPass}
              name="pass"
              onChange={(newValue) => {
                setInputPass(newValue.target.value);
              }}
            />
            <br />
            <TextField
              label="Address"
              helperText="Update Address"
              defaultValue={inputAddress}
              name="address"
              onChange={(newValue) => {
                setInputAddress(newValue.target.value);
              }}
            />
            <br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of birth"
                openTo="year"
                value={inputDob}
                onChange={(newValue) => {
                  setInputDob(newValue);
                }}
                helperText="Update Date of Birth"
                name="dob"
                renderInput={(params) => <TextField {...params} />}
                minDate={dayjs(minDate)}
                maxDate={dayjs(maxDate)}
              />
            </LocalizationProvider>
            <br />
            <br />
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Update Seating Preference
              </FormLabel>
              <RadioGroup
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 18,
                  },
                  paddingLeft: "10px",
                }}
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={inputSeatPref}
                onChange={(newValue) => {
                  setInputSeatPref(newValue.target.value);
                }}
                value={inputSeatPref}
                name="radio-buttons-group"
              >
                <FormControlLabel value="" control={<Radio />} label="None" />
                <FormControlLabel
                  value="Wheel Chair"
                  control={<Radio />}
                  label="Wheel Chair"
                />
                <FormControlLabel
                  value="Infant"
                  control={<Radio />}
                  label="Infant"
                />
              </RadioGroup>
            </FormControl>
            <div style={{ paddingLeft: "100px" }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
                disabled={!enable && !inputName}
              >
                Update Passenger
              </Button>
            </div>
          </>
        )}
      </form>
      <br/>
    </div>
  );
}

export default PassengersForm;
