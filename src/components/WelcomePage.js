import React, { useState } from "react";
import { MdFlightTakeoff } from "react-icons/md";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useHistory } from "react-router-dom";
import Header from "./Admin/Common/Header";
import FlightHeader from "./AirlineStaff/Common/FlightHeader";
const WelcomPage = () => {
	const [role, setRole] = useState();
	const history = useHistory();

	const handleChange = (props) => {
		setRole(props.target.value);
		history.push(props.target.value === 1 ? "/home" : "/flightHome");
	};
	return (
		<div>
			{role === 2 ? (
				<>
					<FlightHeader />
				</>
			) : (role=== 1 ? (
				<>
					<Header />
				</>
			) : (
				<>
					<div className='appMainTitle'>
						<FormControl sx={{ m: 1, minWidth: 80 }}>
							<InputLabel>Role</InputLabel>
							<Select value={role} onChange={handleChange}>
								<MenuItem value={1}>Admin</MenuItem>
								<MenuItem value={2}>Airline Staff</MenuItem>
							</Select>
						</FormControl>
					</div>
					<div className='mainhomepage' style={{ textAlign: "center" }}>
						<h1>
							Welcome to Mintdree Airlines
							<MdFlightTakeoff />
						</h1>
						<p>Please select a role from the above dropdown. </p>
					</div>
				</>
			))}
		</div>
	);
};
export default WelcomPage;
