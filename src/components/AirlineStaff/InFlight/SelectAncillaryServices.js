import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import ToastServive from "react-material-toast";
import { useDispatch } from "react-redux";
import { saveAncillaryForPassenger } from "../../../features/passenger/passengerSlice";
import { Theme, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};
function getStyles(name, ancillary, theme) {
	return {
		fontWeight:
			ancillary === undefined
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

const SelectAncillaryServices = (props) => {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const toast = ToastServive.new({
		place: "topRight",
		duration: 2,
		maxCount: 8,
	});
	const dispatch = useDispatch();
	const theme = useTheme();
	const [ancillary, setAncillary] = useState(props.passenger.ancillaryServices);
	const [meal, setMeal] = useState(props.passenger.mealPreference);
	const [shop, setShop] = useState(props.passenger.shopRequest);
	const handleAncillaryChange = (event) => {
		const {
			target: { value },
		} = event;
		if (!ancillary.includes(value)) {
			setAncillary([...ancillary, value]);
		} else {
			setAncillary([...ancillary].filter((a) => a !== value));
		}
	};
	const handleMealChange = (event) => {
		const {
			target: { value },
		} = event;
		if (!meal.includes(value)) {
			setMeal([value]);
		} else {
			setMeal([...meal].filter((a) => a !== value));
		}
	};
	const handleShopChange = (event) => {
		const {
			target: { value },
		} = event;
		if (!shop.includes(value)) {
			setShop([value]);
		} else {
			setShop([...shop].filter((a) => a !== value));
		}
	};
	const handleSave = (e, params) => {
		const json = {
			id: params.id,
			name: params.name,
			pass: params.pass,
			address: params.address,
			dob: params.dob,
			seat: params.seat,
			ancillaryServices: ancillary,
			mealPreference: meal,
			shopRequest: shop,
		};
		dispatch(saveAncillaryForPassenger(json));
		toast.success("Updated Ancillary Services for " + params.name);
	};

	return (
		<div>
			<Button variant='contained' color='success' onClick={handleClickOpen}>
				Add Ancillary Services
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'>
				<DialogTitle id='alert-dialog-title'>
					<h4 style={{textAlign:"center"}}>Select AncillaryServices, Meal Preference and Shopping request for{" "}
					{props.passenger.name}</h4>
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						<Grid item xs={2} sm={4} md={4}>
							<div
								style={{
									transform: [{ rotate: "90deg" }],
								}}>
								<FormControl sx={{ m: 1, minWidth: 200 }} size='small'>
									<InputLabel id='ancillary'>Add Ancillary service</InputLabel>
									<Select
										labelId='ancillary'
										id='ancillary'
										value={ancillary}
										label='Ancillary'
										onChange={handleAncillaryChange}
										input={
											<OutlinedInput id='select-multiple-chip' label='Chip' />
										}
										renderValue={() => (
											<Box
												sx={{
													display: "flex",
													flexWrap: "wrap",
													gap: 0.5,
												}}>
												{ancillary.map((value) => (
													<Chip key={value} label={value} />
												))}
											</Box>
										)}
										MenuProps={MenuProps}>
										{props.data.AncillaryServices.map((anc) => (
											<MenuItem
												value={anc.Service}
												key={anc.id}
												style={getStyles(anc.Service, ancillary, theme)}>
												<Checkbox
													checked={ancillary.indexOf(anc.Service) > -1}
												/>
												<ListItemText primary={anc.Service} />
											</MenuItem>
										))}
									</Select>
								</FormControl>
								<br />
								<FormControl sx={{ m: 1, minWidth: 230 }} size='small'>
									<InputLabel id='meal'>Change Meal Preference</InputLabel>
									<Select
										labelId='meal'
										id='meal'
										value={meal}
										label='Meal'
										onChange={handleMealChange}
										input={
											<OutlinedInput id='select-multiple-chip' label='Chip' />
										}
										renderValue={() => (
											<Box
												sx={{
													display: "flex",
													flexWrap: "wrap",
													gap: 0.5,
												}}>
												{meal.map((value) => (
													<Chip key={value} label={value} />
												))}
											</Box>
										)}
										MenuProps={MenuProps}>
										{props.data.SpecialMeals.map((m) => (
											<MenuItem
												value={m.Service}
												key={m.id}
												style={getStyles(m.Service, meal, theme)}>
												<ListItemText primary={m.Service} />
											</MenuItem>
										))}
									</Select>
								</FormControl>
								<br />
								<FormControl sx={{ m: 1, minWidth: 190 }} size='small'>
									<InputLabel id='shop'>Add Shop Request</InputLabel>
									<Select
										labelId='shop'
										id='shop'
										value={shop}
										label='shop'
										onChange={handleShopChange}
										input={
											<OutlinedInput id='select-multiple-chip' label='Chip' />
										}
										renderValue={() => (
											<Box
												sx={{
													display: "flex",
													flexWrap: "wrap",
													gap: 0.5,
												}}>
												{shop.map((value) => (
													<Chip key={value} label={value} />
												))}
											</Box>
										)}
										MenuProps={MenuProps}>
										{props.data.ShoppingItems.map((s) => (
											<MenuItem
												value={s.Service}
												key={s.id}
												style={getStyles(s.Service, shop, theme)}>
												<ListItemText primary={s.Service} />
											</MenuItem>
										))}
									</Select>
								</FormControl>
								<br />
							</div>
						</Grid>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='error' variant='outlined'>
						Close
					</Button>
					<Button
						variant='contained'
						sx={{ m: 1, minWidth: 80 }}
						onClick={(e) => handleSave(e, props.passenger)}>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default SelectAncillaryServices;
