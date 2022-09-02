import React, { useState } from "react";
// import data from "../../../data";
import { RiCloseCircleLine } from "react-icons/ri";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AncillaryServicesForm from "./AncillaryServicesForm";
import {
	selectAncillary,
	deleteAncillary,
	updateAncillary,
} from "../../../features/ancillaryService/ancillaryServicesSlice";
import {
	selectFlight,
	deleteFlightSpecialMeals,
} from "../../../features/flight/flightSlice";
import { useSelector, useDispatch } from "react-redux";
import { TiEdit } from "react-icons/ti";
import ToastServive from "react-material-toast";
import Popup from "reactjs-popup";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { addFlightAncillaryService } from "../../../features/flight/flightSlice";

const AncillaryServices = () => {
	const toast = ToastServive.new({
		place: "topRight",
		duration: 2,
		maxCount: 8,
	});
	const data = useSelector(selectFlight);
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [click, setClick] = useState(false);
	const [service, setService] = useState();
	const [ancillaryServices, setAncillaryService] = useState(false);
	const [specialMeals, setSpecialMeals] = useState(false);
	const [shoppingItems, setShoppingItems] = useState(false);
	const [edit, setEdit] = useState({
		editedId: null,
		id: null,
		nameValue: "",
	});

	const submitUpdate = (value) => {
		const obj = {
			id: value.data.id,
			AirportCode: value.data.AirportCode,
			AirportName: value.data.AirportName,
			from: value.data.from,
			to: value.data.to,
			Departure: value.data.Departure,
			Arrival: value.data.Arrival,
			time: value.data.time,
			AncillaryServices: ancillaryServices
				? updateAncillaryServices(value, 1)
				: value.data.AncillaryServices,
			SpecialMeals: specialMeals
				? updateAncillaryServices(value, 2)
				: value.data.SpecialMeals,
			ShoppingItems: shoppingItems
				? updateAncillaryServices(value, 3)
				: value.data.ShoppingItems,
		};
		dispatch(addFlightAncillaryService(obj));
		if (ancillaryServices) {
			toast.info(
				"Updated Ancillary to " + value.name + " for " + value.data.AirportName
			);
		} else if (specialMeals) {
			toast.info(
				"Updated Special Meals to " + value.name + " for " + value.data.AirportName
			);
		} else if (shoppingItems) {
			toast.info(
				"Updated Shopping Items to " + value.name + " for " + value.data.AirportName
			);
		}
		setEdit({
			data: null,
			id: null,
			nameValue: "",
		});
		setOpen(false);
		setService("");
		setAncillaryService(false);
		setSpecialMeals(false);
		setShoppingItems(false);
	};
	const updateAncillaryServices = (value, i) => {
		if (i === 1) {
			const indexU = value.data.AncillaryServices.findIndex(
				(ancillary) => ancillary.id === value.editedId
			);
			const json = { id: value.id, Service: value.name };
			const updatedAncillaryServices = {
				...json,
				AncillaryServices:
					value.data.AncillaryServices[indexU].AncillaryServices,
			};
			return [
				...value.data.AncillaryServices.slice(0, indexU),
				updatedAncillaryServices,
				...value.data.AncillaryServices.slice(indexU + 1),
			];
		} else if (i === 2) {
			const indexU = value.data.SpecialMeals.findIndex(
				(special) => special.id === value.editedId
			);
			const json = { id: value.id, Service: value.name };
			const updatedSpecialMeals = {
				...json,
				SpecialMeals: value.data.SpecialMeals[indexU].SpecialMeals,
			};
			return [
				...value.data.SpecialMeals.slice(0, indexU),
				updatedSpecialMeals,
				...value.data.SpecialMeals.slice(indexU + 1),
			];
		} else if (i === 3) {
			const indexU = value.data.ShoppingItems.findIndex(
				(shopping) => shopping.id === value.editedId
			);
			const json = { id: value.id, Service: value.name };
			const updatedShoppingItems = {
				...json,
				ShoppingItems: value.data.ShoppingItems[indexU].ShoppingItems,
			};
			return [
				...value.data.ShoppingItems.slice(0, indexU),
				updatedShoppingItems,
				...value.data.ShoppingItems.slice(indexU + 1),
			];
		}
	};

	if (edit.id) {
		return (
			<div>
				<Dialog open='true'>
					<DialogTitle></DialogTitle>
					<DialogContent>
						<DialogContentText>Update Ancillary Service</DialogContentText>
						<AncillaryServicesForm edit={edit} onSubmit={submitUpdate} />
					</DialogContent>
					<DialogActions></DialogActions>
				</Dialog>
			</div>
		);
	}

	const addAncillary = () => {};
	const handleClose = () => {
		setOpen(false);
		setService("");
		setAncillaryService(false);
		setSpecialMeals(false);
		setShoppingItems(false);
	};
	const handleOpen = () => {
		click ? setOpen(true) : setOpen(false);
	};
	const popUpOpen = () => {
		setClick(true);
	};
	const handleChange = (props) => {
		setOpen(true);
		setClick(true);
		setService(props.value);
		if (props.value === "Ancillary services") {
			setAncillaryService(true);
			setSpecialMeals(false);
			setShoppingItems(false);
		} else if (props.value === "Special meals") {
			setAncillaryService(false);
			setSpecialMeals(true);
			setShoppingItems(false);
		} else if (props.value === "Shopping items") {
			setAncillaryService(false);
			setSpecialMeals(false);
			setShoppingItems(true);
		}
	};
	const deleteItem = (e, ancillaryId, data) => {
		const json = {
			ancillaryId,
			data,
		};
		dispatch(deleteFlightSpecialMeals(json));
		toast.error("Ancillary Service deleted.");
	};
	const options = ["Ancillary services", "Special meals", "Shopping items"];
	return (
		<div className='homepage'>
			<div className='jumbotron'>
				<h1 style={{ textAlign: "center" }}>
					Manage Ancillary Service per Flight
				</h1>
				{data.flight.map((data, key) => {
					return (
						<div key={key} className='passenger-row'>
							{data.from +
								" - " +
								data.to +
								" , Departure: " +
								data.Departure +
								" " +
								data.time}

							<Popup
								trigger={
									<Button key={data.id} variant='raised' onClick={popUpOpen}>
										AncillaryServices
									</Button>
								}
								open={open}
								onOpen={handleOpen}
								closeOnDocumentClick
								modal={true}
								disabled={open}>
								<div className='modal-content'>
									<h3 style={{ textAlign: "center" }}>
										Add/Update/Delete an AncillaryService
										<br />
										<br />
										{data.from + " - " + data.to}
									</h3>
									<Dropdown
										options={options}
										onChange={handleChange}
										placeholder='Select an option'
									/>
									<br />
									<div>
										{service && (
											<AncillaryServicesForm
												flightData={data}
												onSubmit={addAncillary}
												service={service}
											/>
										)}
										{ancillaryServices &&
											data.AncillaryServices.map((ancillary, key) => (
												<div key={key} className='passenger-row'>
													{ancillary.Service}
													<div className='icons'>
														<RiCloseCircleLine
															onClick={(e) => deleteItem(e, ancillary.id, data)}
															className='delete-icon'
														/>
														<TiEdit
															onClick={() =>
																setEdit({
																	data,
																	id: ancillary.id,
																	nameValue: ancillary.Service,
																})
															}
															className='edit-icon'
														/>
													</div>
												</div>
											))}
										{specialMeals &&
											data.SpecialMeals.map((special, key) => (
												<div key={key} className='passenger-row'>
													{special.Service}
													<div className='icons'>
														<RiCloseCircleLine
															onClick={(e) => deleteItem(e, special.id, data)}
															className='delete-icon'
														/>
														<TiEdit
															onClick={() =>
																setEdit({
																	data,
																	id: special.id,
																	nameValue: special.Service,
																})
															}
															className='edit-icon'
														/>
													</div>
												</div>
											))}
										{shoppingItems &&
											data.ShoppingItems.map((shopping, key) => (
												<div key={key} className='passenger-row'>
													{shopping.Service}
													<div className='icons'>
														<RiCloseCircleLine
															onClick={(e) => deleteItem(e, shopping.id, data)}
															className='delete-icon'
														/>
														<TiEdit
															onClick={() =>
																setEdit({
																	data,
																	id: shopping.id,
																	nameValue: shopping.Service,
																})
															}
															className='edit-icon'
														/>
													</div>
												</div>
											))}
									</div>
									<br />
									<Button
										onClick={handleClose}
										variant='contained'
										style={{
											color: "black",
											backgroundColor: "white",
											display: "flex",
											float: "right",
										}}>
										Close
									</Button>
								</div>
							</Popup>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default AncillaryServices;
