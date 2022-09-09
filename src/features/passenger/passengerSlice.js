import { createSlice } from "@reduxjs/toolkit";

export const passengerSlice = createSlice({
	name: "passenger",
	initialState: [],
	reducers: {
		addPassenger: (state, action) => {
			return [...state, { ...action.payload }];
		},
		deletePassengers: (state, action) => {
			return [...state].filter((p) => p.id !== action.payload);
		},
		updatePassengers: (state, action) => {
			const indexU = state.findIndex(
				(passenger) => passenger.id === action.payload.editedId
			);
			const json = {
				id: action.payload.id,
				name: action.payload.name,
				pass: action.payload.pass,
				address: action.payload.address,
				dob: action.payload.dob,
				seat: action.payload.seat,
				flightId: action.payload.flightId,
				route: action.payload.route,
				display: true,
				seatPref: action.payload.seatPref,
				ancillaryServices: [],
				mealPreference: [],
				shopRequest: [],
			};
			const updatedPassengers = {
				...json,
				passenger: state[indexU].passenger,
			};
			return [
				...state.slice(0, indexU),
				updatedPassengers,
				...state.slice(indexU + 1),
			];
		},
		filterPassenger: (state, action) => {
			let filteredPassengers = [];
			if (action.payload.filter === "all") {
				filteredPassengers = [...state].map((all) => {
					return { ...all, display: true };
				});
			} else if (action.payload.filter === "pass") {
				filteredPassengers = [...state].map((pass) => {
					return pass.pass === ""
						? { ...pass, display: true }
						: { ...pass, display: false };
				});
			} else if (action.payload.filter === "address") {
				filteredPassengers = [...state].map((add) => {
					return add.address === ""
						? { ...add, display: true }
						: { ...add, display: false };
				});
			} else if (action.payload.filter === "dob") {
				filteredPassengers = [...state].map((dob) => {
					return dob.dob === ""
						? { ...dob, display: true }
						: { ...dob, display: false };
				});
			} else if (action.payload.filter === "check") {
				filteredPassengers = [...state].map((check) => {
					return check.seat !== ""
						? { ...check, display: true }
						: { ...check, display: false };
				});
			} else if (action.payload.filter === "notCheck") {
				filteredPassengers = [...state].map((notCheck) => {
					return notCheck.seat === ""
						? { ...notCheck, display: true }
						: { ...notCheck, display: false };
				});
			} else if (action.payload.filter === "wheel") {
				filteredPassengers = [...state].map((wheel) => {
					return wheel.seatPref === "Wheel Chair"
						? { ...wheel, display: true }
						: { ...wheel, display: false };
				});
			} else if (action.payload.filter === "infant") {
				filteredPassengers = [...state].map((infant) => {
					return infant.seatPref === "Infant"
						? { ...infant, display: true }
						: { ...infant, display: false };
				});
			}
			return filteredPassengers;
		},
		saveAncillaryForPassenger: (state, action) => {
			const indexU = state.findIndex(
				(passenger) => passenger.id === action.payload.id
			);
			const json = {
				id: action.payload.id,
				name: action.payload.name,
				pass: action.payload.pass,
				address: action.payload.address,
				dob: action.payload.dob,
				seat: action.payload.seat,
				display: true,
				flightId: action.payload.flightId,
				route: action.payload.route,
				ancillaryServices: action.payload.ancillaryServices,
				mealPreference: action.payload.mealPreference,
				shopRequest: action.payload.shopRequest,
			};
			const updatedPassengers = {
				...json,
				passenger: state[indexU].passenger,
			};
			return [
				...state.slice(0, indexU),
				updatedPassengers,
				...state.slice(indexU + 1),
			];
		},
	},
});
// Action creators are generated for each case reducer function
export const {
	addPassenger,
	updatePassengers,
	deletePassengers,
	filterPassenger,
	saveAncillaryForPassenger,
} = passengerSlice.actions;

export const selectPassenger = (state) => state;

export default passengerSlice.reducer;
