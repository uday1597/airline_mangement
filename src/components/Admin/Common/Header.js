import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { MdFlightTakeoff } from "react-icons/md";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";


const Header = () => {
		const history = useHistory();

	const handleClick = () => {
		history.push("/");
	}
	return (
		<div className='app'>
			<div className='nav'>
				<nav>
					<NavLink to='/home'>Home</NavLink>
					{"  "}
					<NavLink to='/passengers'>Add/Update Passengers</NavLink>
					{"  "}
					<NavLink to='/aucillaryServices'>
						Ancillary Services per Flight
					</NavLink>					
					<Button
						variant="text"
						onClick={handleClick}
						style={{
							fontSize: "small",
							color: "rgb(131, 110, 223)",
							paddingLeft: "42rem",
							transition: "none !important"
						}}>
						Mindtree Airline
						<MdFlightTakeoff />
					</Button>
				</nav>
			</div>
		</div>
	);
};

export default Header;
