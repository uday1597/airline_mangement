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

const lightTheme = createTheme({ palette: { mode: "light" } });

function PassengersForm(props) {
	const toast = ToastServive.new({
		place: "topRight",
		duration: 2,
		maxCount: 8,
	});
	const dispatch = useDispatch();

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
		props.edit ? props.edit.dobValue : ""
	);

	const handleNameChange = (e) => {
		setInputName(e.target.value);
	};
	const handlePassChange = (e) => {
		setInputPass(e.target.value);
	};
	const handleAddressChange = (e) => {
		setInputAddress(e.target.value);
	};
	const handleSeatPrefChange = (e) => {
		setInputSeatPref(e.target.value);
	};

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
		}
		props.onSubmit({
			id: Math.floor(Math.random() * 1000),
			name: inputName,
			pass: inputPass,
			address: inputAddress,
			dob: inputDob,
			seatPref: inputSeatPref,
		});
		setInputName("");
		setInputPass("");
		setInputAddress("");
		setInputDob("");
	};

	return (
		<div>
			<form className='passenger-form' onSubmit={handleSubmit} elevation={24}>
				{props.edit ? (
					<>
						<h4>Update Passenger</h4>
						<TextField
							label='Passenger Name'
							helperText='Update Passenger'
							defaultValue={inputName}
							name='name'
							onChange={handleNameChange}
						/>
						<br />
						<TextField
							label='Passport Number'
							helperText='Update Password Number'
							defaultValue={inputPass}
							name='pass'
							onChange={handlePassChange}
						/>
						<br />
						<TextField
							label='Address'
							helperText='Update Address'
							defaultValue={inputAddress}
							name='address'
							onChange={handleAddressChange}
						/>
						<br />
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								label='Date of birth'
								value={inputDob}
								onChange={(newValue) => {
									setInputDob(newValue);
								}}
								helperText='Update Date of Birth'
								name='dob'
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
						<br />
						<br />
						<FormControl>
									<FormLabel id='demo-controlled-radio-buttons-group'>
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
										aria-labelledby='demo-radio-buttons-group-label'
										defaultValue=''
										onChange={handleSeatPrefChange}
										value={inputSeatPref}
										name='radio-buttons-group'>
										<FormControlLabel
											value=''
											control={<Radio />}
											label='None'
										/>
										<FormControlLabel
											value='Wheel Chair'
											control={<Radio />}
											label='Wheel Chair'
										/>
										<FormControlLabel
											value='Infant'
											control={<Radio />}
											label='Infant'
										/>
									</RadioGroup>
						</FormControl>
						<br/>
						<br/>
						<div style={{ paddingLeft: "100px" }}>
							<Button
								variant='contained'
								color='secondary'
								onClick={handleSubmit}>
								Update Passenger
							</Button>
						</div>
					</>
				) : (
					<>
						<ThemeProvider theme={lightTheme}>
							<Box
								sx={{
									p: 2,
									bgcolor: "background.default",
									width: "350px",
									paddingLeft: "50px",
								}}>
								<h4>Add a Passenger</h4>
								<TextField
									label='Passenger Name'
									helperText='Enter Passenger'
									defaultValue={inputName}
									name='name'
									onChange={handleNameChange}
								/>
								<br />
								<TextField
									label='Passport Number'
									helperText='Enter Password Number'
									defaultValue={inputPass}
									name='pass'
									onChange={handlePassChange}
								/>
								<br />
								<TextField
									label='Address'
									helperText='Enter Address'
									defaultValue={inputAddress}
									name='address'
									onChange={handleAddressChange}
								/>
								<br />
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker
										label='Date of birth'
										value={inputDob}
										onChange={(newValue) => {
											setInputDob(newValue);
										}}
										helperText='Enter Date of Birth'
										name='dob'
										renderInput={(params) => <TextField {...params} />}
									/>
								</LocalizationProvider>
								<br />
								<br />
								<FormControl>
									<FormLabel id='demo-controlled-radio-buttons-group'>
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
										aria-labelledby='demo-radio-buttons-group-label'
										defaultValue=''
										onChange={handleSeatPrefChange}
										value={inputSeatPref}
										name='radio-buttons-group'>
										<FormControlLabel
											value=''
											control={<Radio />}
											label='None'
										/>
										<FormControlLabel
											value='Wheel Chair'
											control={<Radio />}
											label='Wheel Chair'
										/>
										<FormControlLabel
											value='Infant'
											control={<Radio />}
											label='Infant'
										/>
									</RadioGroup>
								</FormControl>
								<br />
								<div style={{ paddingLeft: "130px" }}>
									<Button
										variant='contained'
										color='primary'
										onClick={handleSubmit}>
										Add Passenger
									</Button>
								</div>
							</Box>
						</ThemeProvider>
					</>
				)}
			</form>
		</div>
	);
}

export default PassengersForm;
