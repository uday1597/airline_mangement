import React, { useState } from "react";
import {
	saveAncillaryForPassenger,
	selectPassenger,
} from "../../../features/passenger/passengerSlice";
import { useSelector, useDispatch } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import ToastServive from "react-material-toast";
import { selectFlight } from "../../../features/flight/flightSlice";
import SelectAncillaryServices from "./SelectAncillaryServices";

const inFlight = () => {
	const toast = ToastServive.new({
		place: "topRight",
		duration: 2,
		maxCount: 8,
	});
	const dispatch = useDispatch();
	const passengerList = useSelector(selectPassenger);
	const flightData = useSelector(selectFlight);
	const [ancillary, setAncillary] = useState([]);
	const [meal, setMeal] = useState([]);
	const [shop, setShop] = useState([]);

	return (
		<div className='homepage'>
			<div className='jumbotron'>
				<h1 style={{ textAlign: "center" }}>Manage Check In services</h1>
				{flightData.flight.map((data) => {
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
										{passengerList.passenger.length === 0 ? (
											<h4 style={{ color: "grey" }}>
												Add passengers to Add/Update Ancillary Services{" "}
											</h4>
										) : (
											<>
												<h4 style={{ textAlign: "left" }}>Passengers List</h4>
												<br />
												{passengerList.passenger.map((passenger, key) => (
													<div>
														<Box sx={{ flexGrow: 1 }}>
															<Grid
																container
																spacing={{ xs: 11, md: 1 }}
																columns={{ xs: 0, sm: 0, md: 0 }}>
																<div
																	key={key}
																	className='passenger-row'
																	style={{ textAlign: "left" }}>
																	Passenger Name : {passenger.name}
																	<br />
																	<br />
																	{passenger.ancillaryServices.length !== 0 && (
																		<>
																			Ancillary Services :{" "}
																			{passenger.ancillaryServices.length !== 0
																				? passenger.ancillaryServices.join(", ")
																				: passenger.ancillaryServices}
																		</>
																	)}
																	<br />
																	{passenger.mealPreference.length !== 0 && (
																		<>
																			Meal Preference :{" "}
																			{passenger.mealPreference}
																		</>
																	)}
																	<br />
																	{passenger.shopRequest.length !== 0 && (
																		<>
																			In-Flight shop requests :
																			{passenger.shopRequest}
																		</>
																	)}{" "}
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
			</div>
		</div>
	);
};

export default inFlight;
