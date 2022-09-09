import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ToastServive from "react-material-toast";
import { addFlightAncillaryService } from "../../../features/flight/flightSlice";
import { Button, TextField } from "@material-ui/core";

function AncillaryServicesForm(props) {
	const toast = ToastServive.new({
		place: "topRight",
		duration: 2,
		maxCount: 8,
	});
	const dispatch = useDispatch();

	const [inputName, setInputName] = useState(
		props.edit ? props.edit.nameValue : ""
	);
	const handleNameChange = (e) => {
		setInputName(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setInputName("");

		if (!props.edit) {
			const obj = {
				id: props.flightData.id,
				AirportCode: props.flightData.AirportCode,
				AirportName: props.flightData.AirportName,
				from: props.flightData.from,
				to: props.flightData.to,
				Departure: props.flightData.Departure,
				Arrival: props.flightData.Arrival,
				time: props.flightData.time,
				AncillaryServices:
					props.service === "Ancillary services"
						? [
								...props.flightData.AncillaryServices,
								{ id: Math.floor(Math.random() * 1000), Service: inputName },
						  ]
						: props.flightData.AncillaryServices,
				SpecialMeals:
					props.service === "Special meals"
						? [
								...props.flightData.SpecialMeals,
								{ id: Math.floor(Math.random() * 1000), Service: inputName },
						  ]
						: props.flightData.SpecialMeals,
				ShoppingItems:
					props.service === "Shopping items"
						? [
								...props.flightData.ShoppingItems,
								{ id: Math.floor(Math.random() * 1000), Service: inputName },
						  ]
						: props.flightData.ShoppingItems,
			};
			dispatch(addFlightAncillaryService(obj));
			toast.success("Ancillary Service Added!!!");
		} else {
			props.onSubmit({
				data: props.edit.data,
				editedId: props.edit.id,
				id: Math.floor(Math.random() * 1000),
				name: inputName,
			});
		}

		setInputName("");
	};

	return (
		<form className='passenger-form' onSubmit={handleSubmit}>
			{props.edit ? (
				<>
					<br />
					<TextField
						label='Ancillry Services'
						helperText='Update Ancillary Service'
						defaultValue={inputName}
						name='name'
						onChange={handleNameChange}
						style={{ paddingRight: "50px" }}
					/>
					<Button onClick={handleSubmit} className='passenger-button'>
						Update Ancillary Service
					</Button>
				</>
			) : (
				<>
					<br />
					<TextField
						label='Ancillry Services'
						helperText='Enter Ancillary Service'
						defaultValue={inputName}
						name='name'
						onChange={handleNameChange}
						style={{ paddingRight: "20px" }}
					/>
					<Button onClick={handleSubmit} className='passenger-button'>
						Add Ancillary Service
					</Button>
				</>
			)}
		</form>
	);
}

export default AncillaryServicesForm;
