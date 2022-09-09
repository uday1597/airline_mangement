import React, { useState } from "react";
import SeatPicker from "react-seat-picker";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { selectSeat, addSeat } from "../../../features/seat/seatSlice";
import { useSelector, useDispatch } from "react-redux";
import ToastServive from "react-material-toast";
import { updatePassengers } from "../../../features/passenger/passengerSlice";

const SelectSeatForPassenger = (props) => {
	const rows = useSelector(selectSeat);
	const seatPickerRows = rows.seat[props.data.id - 1].rows.map((r) => {
		return r.seats;
	});
	const [select, setSelect] = useState(0);
	const dispatch = useDispatch();

	const [open, setOpen] = React.useState(props.open);
	const toast = ToastServive.new({
		place: "topRight",
		duration: 2,
		maxCount: 8,
	});
	const [flightId, setFlightId] = useState(0);
	const [route, setRoute] = useState();
	const [passenger, setPassenger] = useState("");

	const handleClose = () => {
		setOpen(false);
	};

	const handleCheckIn = (event, param, flightData) => {
		setFlightId(flightData.id);
		setRoute(flightData.from + " - " + flightData.to);
		const updatedParam = { ...param, seat: "" };
		setPassenger(updatedParam);
		setSelect(1);
		toast.info(`Select a seat for  ${param.name}`);
		setOpen(true);
	};
	const addSeatCallback = (row, number, id) => {
		const json = {
			editedId: passenger.id,
			id: passenger.id,
			name: passenger.name,
			pass: passenger.pass,
			address: passenger.address,
			dob: passenger.dob,
			seat: row + " " + number,
			flightId: flightId,
			route: route,
			seatPref:passenger.seatPref
		};
		dispatch(updatePassengers(json));

		const seatJson = {
			id: id,
			selectedRow: row,
			seatNumber: number,
			isReserved: true,
			passengerId: passenger.id,
			flightId: flightId,
		};
		dispatch(addSeat(seatJson));
		toast.info(`Added ${row + " " + number} seat for  ${passenger.name}`);

		setSelect(0);
		setOpen(false);
	};

	return (
		<div>
			{!props.passenger.seat && (
				<Button
					style={{ width: "135px" }}
					key={props.passenger.id}
					variant='contained'
					color='success'
					onClick={(event) =>
						handleCheckIn(event, props.passenger, props.data)
					}>
					<p>Check In</p>
				</Button>
			)}
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'>
				<DialogTitle id='alert-dialog-title'>
					<h4 style={{ textAlign: "center" }}>
						Select a seat for {props.passenger.name}
					</h4>
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						<SeatPicker
							addSeatCallback={addSeatCallback}
							rows={seatPickerRows}
							maxReservableSeats={select}
							visible
							loading
							selectedByDefault
						/>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='error' variant='outlined'>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default SelectSeatForPassenger;
