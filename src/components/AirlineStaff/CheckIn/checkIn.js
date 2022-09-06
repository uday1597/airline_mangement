import React, { useState } from "react";
import data from "../../../data";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SeatPicker from "react-seat-picker";
import { useSelector, useDispatch } from "react-redux";
import { selectPassenger } from "../../../features/passenger/passengerSlice";
import "./checkIn.css";
import Button from "@mui/material/Button";
import ToastServive from "react-material-toast";
import { updatePassengers } from "../../../features/passenger/passengerSlice";
const checkIn = () => {
	const dispatch = useDispatch();

	const toast = ToastServive.new({
		place: "topRight",
		duration: 2,
		maxCount: 8,
	});
	const passengerList = useSelector(selectPassenger);
	const [open, setOpen] = useState(true);
	const [select, setSelect] = useState(0);
	const [passenger, setPassenger] = useState("");

	const [seatA1, setSeatA1] = useState(false);
	const [seatA2, setSeatA2] = useState(false);
	const [seatA3, setSeatA3] = useState(false);
	const [seatA4, setSeatA4] = useState(false);
	const [seatA5, setSeatA5] = useState(false);
	const [seatA6, setSeatA6] = useState(false);
	const [seatA7, setSeatA7] = useState(false);
	const [seatA8, setSeatA8] = useState(false);
	const [seatA9, setSeatA9] = useState(false);
	const [seatA10, setSeatA10] = useState(false);
	const [seatB1, setSeatB1] = useState(false);
	const [seatB2, setSeatB2] = useState(false);
	const [seatB3, setSeatB3] = useState(false);
	const [seatB4, setSeatB4] = useState(false);
	const [seatB5, setSeatB5] = useState(false);
	const [seatB6, setSeatB6] = useState(false);
	const [seatB7, setSeatB7] = useState(false);
	const [seatB8, setSeatB8] = useState(false);
	const [seatB9, setSeatB9] = useState(false);
	const [seatB10, setSeatB10] = useState(false);
	const [seatD1, setSeatD1] = useState(false);
	const [seatD2, setSeatD2] = useState(false);
	const [seatD3, setSeatD3] = useState(false);
	const [seatD4, setSeatD4] = useState(false);
	const [seatD5, setSeatD5] = useState(false);
	const [seatD6, setSeatD6] = useState(false);
	const [seatD7, setSeatD7] = useState(false);
	const [seatD8, setSeatD8] = useState(false);
	const [seatD9, setSeatD9] = useState(false);
	const [seatD10, setSeatD10] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};
	const rows = [
		[
			{ id: 1, number: 1, isReserved: seatA1 },
			{ id: 2, number: 2 },
			{ id: 3, number: 3 },
			{ id: 4, number: 4 },
			{ id: 5, number: 5 },
			{ id: 6, number: 6 },
			{ id: 7, number: 7 },
			{ id: 8, number: 8 },
			{ id: 9, number: 9 },
			{ id: 10, number: 10 },
		],
		[
			{ id: 1, number: 1 },
			{ id: 2, number: 2 },
			{ id: 3, number: 3 },
			{ id: 4, number: 4 },
			{ id: 5, number: 5 },
			{ id: 6, number: 6 },
			{ id: 7, number: 7 },
			{ id: 8, number: 8 },
			{ id: 9, number: 9 },
			{ id: 10, number: 10 },
		],
		[],
		[
			{ id: 1, number: 1 },
			{ id: 2, number: 2 },
			{ id: 3, number: 3 },
			{ id: 4, number: 4 },
			{ id: 5, number: 5 },
			{ id: 6, number: 6 },
			{ id: 7, number: 7 },
			{ id: 8, number: 8 },
			{ id: 9, number: 9 },
			{ id: 10, number: 10 },
		],
	];
	const handleCheckIn = (event, param) => {
		const updatedParam = { ...param, seat: "" };
		setPassenger(updatedParam);
		if (param.seat !== undefined) {
			if (param.seat !== "") {
				addSeatCallback("", "", 0, true, updatedParam);
			} else {
				setSelect(1);
				toast.info(`Select a seat for  ${param.name}`);
			}
		} else {
			setSelect(1);
			toast.info(`Select a seat for  ${param.name}`);
		}
	};
	const handleChangeSeat = (event, param) => {
		setSelect(1);
		toast.info(`Change seat for  ${param.name}`);
	};

	const addSeatCallback = (
		row,
		number,
		id,
		update = false,
		updatedPassenger
	) => {
		if (update) {
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
			toast.info(`Removed seat for  ${updatedPassenger.name}`);
		} else {
			// setSeatA1(true);
			const json = {
				editedId: passenger.id,
				id: passenger.id,
				name: passenger.name,
				pass: passenger.pass,
				address: passenger.address,
				dob: passenger.dob,
				seat: row + " " + number,
			};
			dispatch(updatePassengers(json));
			toast.info(`Added ${row + " " + number} seat for  ${passenger.name}`);
			// switch (row + number) {
			// 	case "A1":
			// 		return setSeatA1(true);
			// 	case "A2":
			// 		return setSeatA2(true);
			// 	default:
			// 		return false;
			// }
		}
		setSelect(0);
	};

	const filterMethod = (value) => {
		const json = {
			passengerList,
			filter: value,
		};
		dispatch(filterPassenger(json));
	};

	return (
		<div className='homepage'>
			<div className='jumbotron'>
				<h1 style={{ textAlign: "center" }}>Manage Check In services</h1>
				{data.map((data, key) => {
					return (
						<div>
							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls='panel1a-content'
									id='panel1a-header'>
									<Typography>
										{data.from +
											" - " +
											data.to +
											" , Departure: " +
											data.Departure +
											" " +
											data.time}
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										<div className='App'>
											<SeatPicker
												addSeatCallback={addSeatCallback}
												rows={rows}
												maxReservableSeats={select}
												visible
												alpha
												loading
												selectedByDefault
											/>
										</div>
										<br />
										{passengerList.passenger.length === 0 ? (
											<></>
										) : (
											<>
												<div className='filter'>
													<div style={{ color: "white" }}>
														Filter passengers by below
													</div>{" "}
													<br />
												</div>
												<div className='filter'>
													<button
														className='filter-button edit'
														onClick={() => {
															filterMethod("all");
														}}>
														All
													</button>
													<button
														className='filter-button edit'
														onClick={() => {
															filterMethod("checkIn");
														}}>
														Checked In
													</button>
													<button
														className='filter-button edit'
														onClick={() => {
															filterMethod("available");
														}}>
														Not Checked In
													</button>
													<button
														className='filter-button edit'
														onClick={() => {
															filterMethod("wheel");
														}}>
														Wheel Chair
													</button>
													<button
														className='filter-button edit'
														onClick={() => {
															filterMethod("infant");
														}}>
														Infant
													</button>
												</div>
											</>
										)}
										{passengerList.passenger.map((passenger, key) => (
											<div key={key} className='passenger-row'>
												Name:{ passenger.name} {"	"}
												Ancillary:{ passenger.ancillary} {"	"}
												Seat No:{ passenger.seat}
												{!passenger.seat && (
													<Button
														style={{ textTransform: "none" }}
														key={passenger.id}
														variant=''
														onClick={(event) =>
															handleCheckIn(event, passenger)
														}>
														<p>Check In</p>
													</Button>
												)}
												{passenger.seat && (
													<>
														<Button
															style={{ textTransform: "none" }}
															key={passenger.id}
															variant='contained'
															onClick={(event) =>
																handleCheckIn(event, passenger)
															}>
															<p>Undo CheckIn</p>
														</Button>{" "}
														<span style={{ whiteSpace: "pre-line" }}></span>
														<Button
															style={{ textTransform: "none" }}
															key={passenger.id}
															variant='contained'
															onClick={(event) =>
																handleChangeSeat(event, passenger)
															}>
															<p>Change Seat</p>
														</Button>
													</>
												)}
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
