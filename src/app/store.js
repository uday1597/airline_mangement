import { configureStore } from "@reduxjs/toolkit";
import passengerReducer from "../features/passenger/passengerSlice";
import ancillaryReducer from "../features/ancillaryService/ancillaryServicesSlice";
import flightReducer from "../features/flight/flightSlice";

export default configureStore({
	reducer: {
		passenger: passengerReducer,
		ancillary: ancillaryReducer,
		flight:flightReducer
	},
});
