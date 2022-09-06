import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAncillaryService } from "../../../features/ancillaryService/ancillaryServicesSlice";
import ToastServive from "react-material-toast";
import { addFlightAncillaryService } from "../../../features/flight/flightSlice";

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
		}
		else {
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
					<input
						type='text'
						placeholder='Update Ancillary Service'
						value={inputName}
						name='name'
						className='passenger-input edit'
						onChange={handleNameChange}
					/>
					<button className='passenger-button edit'>
						Update Ancillary Service
					</button>
				</>
			) : (
				<>
					<input
						type='text'
						placeholder='Enter Ancillary Service'
						value={inputName}
						name='name'
						className='passenger-input'
						onChange={handleNameChange}
					/>
					<button className='passenger-button'>Add Ancillary Service</button>
				</>
			)}
		</form>
	);
}

export default AncillaryServicesForm;
