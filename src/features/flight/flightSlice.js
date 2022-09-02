import { createSlice } from "@reduxjs/toolkit";
import data from "../../data";

export const flightSlice = createSlice({
	name: "flight",
	initialState: data,
	reducers: {
		addFlightAncillaryService: (state, action) => {
			const indexU = state.findIndex(
				(flight) => flight.id === action.payload.id
			);
			const json = {
				id: action.payload.id,
				AirportCode: action.payload.AirportCode,
				AirportName: action.payload.AirportName,
				from: action.payload.from,
				to: action.payload.to,
				Departure: action.payload.Departure,
				Arrival: action.payload.Arrival,
				time: action.payload.time,
				AncillaryServices: action.payload.AncillaryServices,
				SpecialMeals: action.payload.SpecialMeals,
				ShoppingItems: action.payload.ShoppingItems,
			};
			const updatedFlights = {
				...json,
				flight: state[indexU].flight,
			};
			return [
				...state.slice(0, indexU),
				updatedFlights,
				...state.slice(indexU + 1),
			];
		},
		deleteFlightSpecialMeals: (state, action) => {
			const indexU = state.findIndex(
				(flight) => flight.id === action.payload.data.id
			);
			const json = {
				id: action.payload.data.id,
				AirportCode: action.payload.data.AirportCode,
				AirportName: action.payload.data.AirportName,
				from: action.payload.data.from,
				to: action.payload.data.to,
				Departure: action.payload.data.Departure,
				Arrival: action.payload.data.Arrival,
				time: action.payload.data.time,
				AncillaryServices: action.payload.data.AncillaryServices.filter(
					(f) => f.id !== action.payload.ancillaryId
				),
				SpecialMeals: action.payload.data.SpecialMeals.filter(
					(f) => f.id !== action.payload.ancillaryId
				),
				ShoppingItems: action.payload.data.ShoppingItems.filter(
					(f) => f.id !== action.payload.ancillaryId
				),
			};
			const updatedFlights = {
				...json,
				flight: state[indexU].flight,
			};
			return [
				...state.slice(0, indexU),
				updatedFlights,
				...state.slice(indexU + 1),
			];
		},
	},
});
// Action creators are generated for each case reducer function
export const {
	addFlightAncillaryService,
	deleteFlightSpecialMeals,
} = flightSlice.actions;

export const selectFlight = (state) => state;

export default flightSlice.reducer;
