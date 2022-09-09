import React from "react";
import data from "../../../data";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector, useDispatch } from "react-redux";
import { selectPassenger,filterPassenger } from "../../../features/passenger/passengerSlice";
import "./checkIn.css";
import Button from "@mui/material/Button";
import ToastServive from "react-material-toast";
import { updatePassengers } from "../../../features/passenger/passengerSlice";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { removeSeat } from "../../../features/seat/seatSlice";
import SelectSeatForPassenger from "./SelectSeatForPassenger";
import ChangeSeatForPassenger from "./ChangeSeatForPassenger";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
const checkIn = () => {
	const dispatch = useDispatch();
	const [value, setValue] = React.useState("all");

	const toast = ToastServive.new({
		place: "topRight",
		duration: 2,
		maxCount: 8,
	});
	const passengerList = useSelector(selectPassenger);
	const displayPassengers = passengerList.passenger.map((p) => {
		if (p.display) {
			return p;
		}
	});
	const undoCheckIn = (event, updatedPassenger, flightId) => {
		const json = {
			editedId: updatedPassenger.id,
			id: updatedPassenger.id,
			name: updatedPassenger.name,
			pass: updatedPassenger.pass,
			address: updatedPassenger.address,
			dob: updatedPassenger.dob,
			seat: "",
		};
		dispatch(updatePassengers(json));
		const seats = updatedPassenger.seat.split(" ");
		const removeJson = {
			id: updatedPassenger.id,
			selectedRow: seats[0],
			flightId: flightId,
		};
		dispatch(removeSeat(removeJson));
		toast.info(`Removed seat for  ${updatedPassenger.name}`);
	};

	const filterMethod = (event) => {
		setValue(event.target.value);
		const json = {
			filter: event.target.value,
		};
		dispatch(filterPassenger(json));
	};

	return (
		<div className='homepage'>
			<div className='jumbotron'>
				<h1 style={{ textAlign: "center" }}>Manage Check In services</h1>
				{data.map((data) => {
					return (
						<div>
							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls='panel1a-content'
									id='panel1a-header'>
									<Typography>
										<h4 style={{ textAlign: "left" }}>
											{data.from +
												" - " +
												data.to +
												" , Departure: " +
												data.Departure +
												" " +
												data.time}
										</h4>
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										<div className='App'></div>
										{passengerList.passenger.length === 0 ? (
											<>
												<h4 style={{ color: "grey" }}>
													Add passengers to Check in{" "}
												</h4>
											</>
										) : (
											<>
												<div style={{ paddingRight: "35px" }}>
													<div className='filter'>
														<FormControl>
															<FormLabel id='demo-radio-buttons-group-label'>
																<h4
																	style={{
																		color: "black",
																		textAlign: "right",
																		paddingRight: "15px",
																	}}>
																	Filter passengers by below
																</h4>
															</FormLabel>
															<RadioGroup
																row
																sx={{
																	"& .MuiSvgIcon-root": {
																		fontSize: 20,
																	},
																	color: "black",
																}}
																value={value}
																onChange={filterMethod}
																defaultValue='all'
																name='radio-buttons-group'>
																<FormControlLabel
																	value='all'
																	control={<Radio />}
																	label='All'
																/>
																<FormControlLabel
																	value='check'
																	control={<Radio />}
																	label='Checked In'
																/>
																<FormControlLabel
																	value='notCheck'
																	control={<Radio />}
																	label='Not Checked In'
																/>
																<FormControlLabel
																	value='wheel'
																	control={<Radio />}
																	label='Wheel Chair'
																/>
																<FormControlLabel
																	value='infant'
																	control={<Radio />}
																	label='Infant'
																/>
															</RadioGroup>
														</FormControl>
													</div>
												</div>
											</>
										)}
										{displayPassengers
											.filter((d) => d !== undefined)
											.map((passenger, key) => (
												<div>
													<Box sx={{ flexGrow: 1 }}>
														<Grid
															container
															spacing={{ xs: 11, md: 1 }}
															columns={{ xs: 0, sm: 0, md: 0 }}>
															<div key={key} className='passenger-row'>
																Name: {passenger.name}
																<br />
																Ancillary Services:{" "}
																{passenger.ancillaryServices !== undefined
																	? passenger.ancillaryServices.join(", ")
																	: ""}
																<br />
																Meal Preference: {passenger.mealPreference}
																<br />
																Shopping request: {passenger.shopRequest}
																<br />
																Seat No: {passenger.seat}{" "}
																{passenger.route !== undefined &&
																	"	(" + passenger.route + ")"}
																<Grid item xs={2} sm={4} md={4}>
																	<div
																		style={{
																			transform: [{ rotate: "90deg" }],
																		}}>
																		<SelectSeatForPassenger
																			open={false}
																			passenger={passenger}
																			data={data}
																		/>

																		{passenger.seat &&
																			passenger.flightId !== data.id && (
																				<h4 style={{ color: "greenyellow" }}>
																					To check in {passenger.name} to
																					current flight{" "}
																					{" (" +
																						data.from +
																						" - " +
																						data.to +
																						")"}
																					<br />
																					Undo check in from already checked in
																					flight {" (" + passenger.route + ")"}
																				</h4>
																			)}
																		<br />
																		{passenger.seat && (
																			<>
																				<Button
																					key={passenger.id}
																					variant='contained'
																					disabled={
																						passenger.flightId !== data.id
																					}
																					onClick={(event) =>
																						undoCheckIn(
																							event,
																							passenger,
																							data.id
																						)
																					}>
																					<p>Undo CheckIn</p>
																				</Button>{" "}
																				<br />
																				<br />
																				<ChangeSeatForPassenger
																					open={false}
																					passenger={passenger}
																					data={data}
																				/>
																			</>
																		)}
																	</div>
																</Grid>
															</div>
														</Grid>
													</Box>
													<br />
												</div>
											))}
									</Typography>
								</AccordionDetails>
							</Accordion>
							<br />
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default checkIn;
