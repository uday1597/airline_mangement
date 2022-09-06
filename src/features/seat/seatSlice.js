import { createSlice } from "@reduxjs/toolkit";
import seatRows from "../../seatRows";

export const seatSlice = createSlice({
	name: "seat",
	initialState: seatRows,
	reducers: {
		addSeat: (state, action) => {
			const json = {
				id: action.payload.id,
				number: action.payload.seatNumber,
				isReserved: action.payload.isReserved,
				passengerId: action.payload.passengerId,
			};
			const indexU = [...state[action.payload.selectedRow - 1]].findIndex(
				(seat) => seat.id === action.payload.id
			);
			const updateSeats = [
				...state[action.payload.selectedRow - 1].map((el) => {
					return el.id === indexU + 1 ? json : el;
				}),
			];
			return [
				...state.slice(0, action.payload.selectedRow - 1),
				updateSeats,
				...state.slice(action.payload.selectedRow),
			];
		},
		removeSeat: (state, action) => {
			debugger;
			const indexU = [...state[action.payload.selectedRow - 1]].findIndex(
				(seat) => seat.passengerId === action.payload.id
			);
			const updateSeats = [
				...state[action.payload.selectedRow - 1].map((el) => {
					return el.id === indexU + 1
						? { ...el, passengerId: "", isReserved: false }
						: el;
				}),
			];
			return [
				...state.slice(0, action.payload.selectedRow - 1),
				updateSeats,
				...state.slice(action.payload.selectedRow),
			];
		},
	},
});
// Action creators are generated for each case reducer function
export const { addSeat,removeSeat } = seatSlice.actions;

export const selectSeat = (state) => state;

export default seatSlice.reducer;
