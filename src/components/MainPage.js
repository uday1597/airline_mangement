import "./Admin/Common/Header.css";
import { Route, Switch } from "react-router-dom";
import PassengersList from "./Admin/Passenger/PassengersList";
import PageNotFound from "./PageNotFound";
import AncillaryServices from "./Admin/AncillaryService/AncillaryServices";
import checkIn from "./AirlineStaff/CheckIn/checkIn";
import inFlight from "./AirlineStaff/InFlight/inFlight";
import FlightHeader from "./AirlineStaff/Common/FlightHeader";
import Header from "./Admin/Common/Header";
import Home from "./Admin/Home";
import FlightHome from "./AirlineStaff/FlightHome";
import React, { useState } from "react";
import { MdFlightTakeoff } from "react-icons/md";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useHistory } from "react-router-dom";
import WelcomPage from "./WelcomePage";

const MainPage = () => {
	return (
		<div>
			{/* <WelcomPage/> */}
			<Header />
			<FlightHeader />

			<Switch>
				<Route path='/header' component={Header} />
				<Route path='/home' component={Home} />
				<Route path='/passengers' component={PassengersList} />
				<Route path='/aucillaryServices' component={AncillaryServices} />
				<Route path='/flightHeader' component={FlightHeader} />
				<Route path='/flightHome' component={FlightHome} />
				<Route path='/checkIn' component={checkIn} />
				<Route path='/inFlight' component={inFlight} />
				<Route component={PageNotFound} />
			</Switch>
		</div>
	);
};

export default MainPage;
