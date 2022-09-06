import React, { useState } from "react";
import { selectFlight } from "../../../features/flight/flightSlice";
import { useSelector, useDispatch } from "react-redux";
import "react-dropdown/style.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SetAncillaryServices from "./SetAncillaryServices";

const AncillaryServices = () => {
	const data = useSelector(selectFlight);
	return (
		<div className='homepage'>
			<div className='jumbotron'>
				<h1 style={{ textAlign: "center" }}>
					Manage Ancillary Service per Flight
				</h1>
				{data.flight.map((d) => {
					return (
						<>
							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls='panel1a-content'
									id='panel1a-header'>
									<Typography>
										<h4 style={{ textAlign: "left" }}>
											{d.from +
												" - " +
												d.to +
												" , Departure: " +
												d.Departure +
												" " +
												d.time}
										</h4>
									</Typography>
								</AccordionSummary>
								<div style={{ textAlign: "center",paddingBottom:"20px" }}>
									<SetAncillaryServices data={d} />
								</div>
							</Accordion>
							<br />
						</>
					);
				})}
			</div>
		</div>
	);
};

export default AncillaryServices;
