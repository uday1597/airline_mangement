import { createSlice,nanoid, createAsyncThunk } from "@reduxjs/toolkit";

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
				filteredPassengers = [...state];
			} else if (action.payload.filter === "pass") {
				console.log([...state].filter(ele =>
					ele.pass.includes('')));
				filteredPassengers = [...state].filter(ele =>
					ele.pass.includes(""));
				 
				// filteredPassengers = [...state].filter((obj) => obj.pass === "").map((obj)=>obj);
			} else if (action.payload.filter === "address") {
				filteredPassengers = [...state].filter((obj) => obj.address === "").map((obj)=>obj);
			} else if (action.payload.filter === "dob") {
				filteredPassengers = [...state].filter((obj) => obj.dob === "").map((obj)=>obj);
			}
			return filteredPassengers;
		},
	},
});
// Action creators are generated for each case reducer function
export const {
	addPassenger,
	updatePassengers,
	deletePassengers,
	filterPassenger,
} = passengerSlice.actions;

export const selectPassenger = (state) => state;

export default passengerSlice.reducer;
