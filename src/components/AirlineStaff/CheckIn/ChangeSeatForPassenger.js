import React, { useState } from "react";
import SeatPicker from "react-seat-picker";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
	selectSeat,
	addSeat,
	changeSeat,
} from "../../../features/seat/seatSlice";
import { useSelector, useDispatch } from "react-redux";
import ToastServive from "react-material-toast";
import { updatePassengers } from "../../../features/passenger/passengerSlice";

const ChangeSeatForPassenger = (props) => {
	const rows = useSelector(selectSeat);

	const seatPickerRows = rows.seat[props.data.id - 1].rows.map((r) => {
		return r.seats;
	});
	const [select, setSelect] = useState(0);
	const dispatch = useDispatch();
	const [open, setOpen] = React.useState(props.open);
	const [flightId, setFlightId] = useState(0);

	const toast = ToastServive.new({
		place: "topRight",
		duration: 2,
		maxCount: 8,
	});
	const handleClose = () => {
		setOpen(false);
	};
	const handleChangeSeat = (event, param, flightId) => {
		setFlightId(flightId);

		toast.info(`Change seat for  ${param.name}`);
		setSelect(1);
		setOpen(true);
	};
	const addSeatCallback = (row, number, id) => {
		const json = {
			editedId: props.passenger.id,
			id: props.passenger.id,
			name: props.passenger.name,
			pass: props.passenger.pass,
			address: props.passenger.address,
			dob: props.passenger.dob,
			seat: row + " " + number,
			flightId: props.data.id,
			route: props.data.from + " - " + props.data.to,
		};
		dispatch(updatePassengers(json));
		const seats = props.passenger.seat.split(" ");
		const seatJson = {
			id: id,
			selectedRow: row,
			seatNumber: number,
			isReserved: true,
			passengerId: props.passenger.id,
			oldSelectedRow: seats[0],
			oldSeatNumber: seats[1],
			flightId: flightId,
		};
		dispatch(changeSeat(seatJson));
		toast.info(`Added ${row + " " + number} seat for  ${props.passenger.name}`);

		setSelect(0);
		setOpen(false);
	};
	return (
		<div>
			<Button
				style={{ width: "135px" }}
				key={props.passenger.id}
				variant='contained'
				color='secondary'
				disabled={props.passenger.flightId !== props.data.id}
				onClick={(event) =>
					handleChangeSeat(event, props.passenger, props.data.id)
				}>
				<p>Change Seat</p>
			</Button>
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
export default ChangeSeatForPassenger;
