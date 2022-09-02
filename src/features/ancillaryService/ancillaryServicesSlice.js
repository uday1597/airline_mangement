import { createSlice } from "@reduxjs/toolkit";

export const ancillaryServicesSlice = createSlice({
	name: "ancillary",
	initialState: [],
	reducers: {
		addAncillaryService: (state, action) => {
			return [...state, { ...action.payload }];
		},
		deleteAncillary: (state, action) => {
			return [...state].filter((p) => p.id !== action.payload);
		},
		updateAncillary: (state, action) => {
			const indexU = state.findIndex(
				(ancillary) => ancillary.id === action.payload.editedId
			);
			const json = {
				id: action.payload.id,
				name: action.payload.name
			};
			const updatedAncillaries = {
				...json,
				ancillary: state[indexU].ancillary,
			};
			return [
				...state.slice(0, indexU),
				updatedAncillaries,
				 ...state.slice(indexU + 1),
			];
		},
	},
});
// Action creators are generated for each case reducer function
export const {
	addAncillaryService,
	deleteAncillary,
	updateAncillary,
} = ancillaryServicesSlice.actions;

export const selectAncillary = (state) => state;

export default ancillaryServicesSlice.reducer;
