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

const Passenger = () => {
	const toast = ToastServive.new({
		place: "topRight",
		duration: 2,
		maxCount: 8,
	});
	const passengerList = useSelector(selectPassenger);
	const dispatch = useDispatch();

	const [edit, setEdit] = useState({
		editedId: null,
		id: null,
		nameValue: "",
		passValue: "",
		addressValue: "",
		dobValue: "",
	});
	const submitUpdate = (value) => {
		const json = {
			editedId: edit.id,
			id: value.id,
			name: value.name,
			pass: value.pass,
			address: value.address,
			dob: value.dob,
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
		});
	};
	const filterMethod = (value) => {
		const json = {
			passengerList,
			filter: value,
		};
		dispatch(filterPassenger(json));
	};

	if (edit.id) {
		return <PassengersForm edit={edit} onSubmit={submitUpdate} />;
	}
	return (
		<div>
			<div className='filter'>
				Filter passengers by missing mandatory requirements <br />
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
						filterMethod("pass");
					}}>
					Passport
				</button>
				<button
					className='filter-button edit'
					onClick={() => {
						filterMethod("address");
					}}>
					Address
				</button>
				<button
					className='filter-button edit'
					onClick={() => {
						filterMethod("dob");
					}}>
					Date of birth
				</button>
			</div>
			{passengerList.passenger.map((passenger, key) => (
				<div key={key} className='passenger-row'>
					{passenger.name} {passenger.ancillary} {passenger.seat}{" "}
					{passenger.dob}
					<div className='icons'>
						<TiEdit
							onClick={() =>
								setEdit({
									editedId: null,
									id: passenger.id,
									nameValue: passenger.name,
									passValue: passenger.pass,
									addressValue: passenger.address,
									dobValue: passenger.dob,
								})
							}
							className='edit-icon'
						/>
					</div>
				</div>
			))}
		</div>
	);
};
export default Passenger;
