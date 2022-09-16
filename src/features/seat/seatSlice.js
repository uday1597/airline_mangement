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
			const flightIndexU = [...state].findIndex(
				(flight) => flight.flightId === action.payload.flightId - 1
			);
			const indexU = state[flightIndexU].rows[
				action.payload.selectedRow - 1
			].seats.findIndex((f) => f.id === action.payload.id);
			const rows = state[flightIndexU].rows;

			const updateSeats = {
				flightId: flightIndexU,
				rows: [
					...rows.map((r) => {
						return r.rowId === action.payload.selectedRow - 1
							? {
									...r,
									seats: r.seats.map((s) => {
										return s.id === indexU + 1 ? json : s;
									}),
							  }
							: r;
					}),
				],
			};
			return [
				...state.slice(0, action.payload.flightId - 1),
				updateSeats,
				...state.slice(action.payload.flightId),
			];
		},
		removeSeat: (state, action) => {
			const flightIndexU = [...state].findIndex(
				(flight) => flight.flightId === action.payload.flightId - 1
			);
			const indexU = state[flightIndexU].rows[
				action.payload.selectedRow - 1
			].seats.findIndex((f) => f.passengerId === action.payload.id);
			const rows = state[flightIndexU].rows;
			const updateSeats = {
				flightId: flightIndexU,
				rows: [
					...rows.map((r) => {
						return r.rowId === action.payload.selectedRow - 1
							? {
									...r,
									seats: r.seats.map((s) => {
										return s.id === indexU + 1
											? { ...s, passengerId: "", isReserved: false }
											: s;
									}),
							  }
							: r;
					}),
				],
			};
			return [
				...state.slice(0, action.payload.flightId - 1),
				updateSeats,
				...state.slice(action.payload.flightId),
			];
		},
		changeSeat: (state, action) => {
			const flightIndexU = [...state].findIndex(
				(flight) => flight.flightId === action.payload.flightId - 1
			);
			console.log(state[flightIndexU].rows[
				action.payload.oldSelectedRow - 1
			]);
			const oldIndexU = state[flightIndexU].rows[
				action.payload.oldSelectedRow - 1
			].seats.findIndex((f) => f.passengerId === action.payload.passengerId);

			const rows = state[flightIndexU].rows;
			const oldUpdateSeats = {
				flightId: flightIndexU,
				rows: [
					...rows.map((r) => {
						return r.rowId === action.payload.oldSelectedRow - 1
							? {
									...r,
									seats: r.seats.map((s) => {
										return s.id === oldIndexU + 1
											? { ...s, passengerId: "", isReserved: false }
											: s;
									}),
							  }
							: r;
					}),
				],
			};
			state = [
				...state.slice(0, action.payload.flightId - 1),
				oldUpdateSeats,
				...state.slice(action.payload.flightId),
			];
			const json = {
				id: action.payload.id,
				number: action.payload.seatNumber,
				isReserved: action.payload.isReserved,
				passengerId: action.payload.passengerId,
			};
			const indexU = state[flightIndexU].rows[
				action.payload.selectedRow - 1
			].seats.findIndex((f) => f.id === action.payload.id);
			const newRows = state[flightIndexU].rows;

			const updateSeats = {
				flightId: flightIndexU,
				rows: [
					...newRows.map((r) => {
						return r.rowId === action.payload.selectedRow - 1
							? {
									...r,
									seats: r.seats.map((s) => {
										return s.id === indexU + 1 ? json : s;
									}),
							  }
							: r;
					}),
				],
			};

			return [
				...state.slice(0, action.payload.flightId - 1),
				updateSeats,
				...state.slice(action.payload.flightId),
			];
		},
	},
});
// Action creators are generated for each case reducer function
export const { addSeat, removeSeat, changeSeat } = seatSlice.actions;

export const selectSeat = (state) => state;

export default seatSlice.reducer;
