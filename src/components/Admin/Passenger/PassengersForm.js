import React, { useState } from "react";
import { addPassenger } from "../../../features/passenger/passengerSlice";
import { useDispatch } from "react-redux";
import ToastServive from "react-material-toast";

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
		props.edit ? props.edit.dobValue : ""
	);

	const handleNameChange = (e) => {
		setInputName(e.target.value);
		localStorage.setItem("PassengerName",e.target.value);
	};
	const handlePassChange = (e) => {
		setInputPass(e.target.value);
	};
	const handleAddressChange = (e) => {
		setInputAddress(e.target.value);
	};
	const handleDobChange = (e) => {
		setInputDob(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const obj = {
			id: Math.floor(Math.random() * 1000),
			name: inputName,
			pass: inputPass,
			address: inputAddress,
			dob: inputDob,
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
		});

		setInputName("");
		setInputPass("");
		setInputAddress("");
		setInputDob("");
	};

	return (
		<form className='passenger-form' onSubmit={handleSubmit}>
			{props.edit ? (
				<>
					<input
						type='text'
						placeholder='Update Passenger'
						value={inputName}
						name='name'
						className='passenger-input edit'
						onChange={handleNameChange}
					/>
					<input
						type='text'
						placeholder='Update Password Number'
						value={inputPass}
						name='pass'
						className='passenger-input edit'
						onChange={handlePassChange}
					/>
					<input
						type='text'
						placeholder='Update Address'
						value={inputAddress}
						name='address'
						className='passenger-input edit'
						onChange={handleAddressChange}
					/>
					<input
						type='date'
						placeholder='Update Date of Birth'
						value={inputDob}
						name='dob'
						className='passenger-input edit'
						onChange={handleDobChange}
					/>
					<button className='passenger-button edit'>Update Passenger</button>
				</>
			) : (
				<>
					<input
						type='text'
						placeholder='Enter Passenger'
						value={inputName}
						name='name'
						className='passenger-input'
						onChange={handleNameChange}
					/>
					<input
						type='text'
						placeholder='Enter Password Number'
						value={inputPass}
						name='pass'
						className='passenger-input'
						onChange={handlePassChange}
					/>
					<input
						type='text'
						placeholder='Enter Address'
						value={inputAddress}
						name='address'
						className='passenger-input'
						onChange={handleAddressChange}
					/>
					<input
						type='date'
						placeholder='Enter Date of Birth'
						value={inputDob}
						name='Dob'
						className='passenger-input'
						onChange={handleDobChange}
					/>

						<button className='passenger-button'>Add Passenger</button>
				</>
			)}
		</form>
	);
}

export default PassengersForm;
