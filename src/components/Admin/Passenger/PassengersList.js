import React from "react";
import Passenger from "./Passengers";
import PassengersForm from "./PassengersForm";

function PassengersList() {
	const addPassenger = () => {};

	return (
		<div className='passenger-app'>
			<h1>Manage Passengers</h1>
			<PassengersForm onSubmit={addPassenger} />
			<Passenger />
		</div>
	);
}

export default PassengersList;
