import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AncillaryServicesForm from "./AncillaryServicesForm";
import { TiEdit } from "react-icons/ti";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Theme, useTheme } from "@mui/material/styles";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import ToastServive from "react-material-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFlight,
  deleteFlightSpecialMeals,
} from "../../../features/flight/flightSlice";
import { addFlightAncillaryService } from "../../../features/flight/flightSlice";

const ITEM_HEIGHT = 120;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 120,
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
const SetAncillaryServices = (props) => {
  const options = ["Ancillary services", "Special meals", "Shopping items"];

  const [open, setOpen] = React.useState(false);
  const addAncillary = () => {};
  const [ancillary, setAncillary] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setService("");
    setAncillary("");
  };
  const toast = ToastServive.new({
    place: "topRight",
    duration: 2,
    maxCount: 8,
  });
  const theme = useTheme();

  const data = useSelector(selectFlight);
  const dispatch = useDispatch();
  const [service, setService] = useState();
  const [ancillaryServices, setAncillaryService] = useState(false);
  const [specialMeals, setSpecialMeals] = useState(false);
  const [shoppingItems, setShoppingItems] = useState(false);
  const [edit, setEdit] = useState({
    editedId: null,
    id: null,
    nameValue: "",
  });
  const deleteItem = (e, ancillaryId, data) => {
    const json = {
      ancillaryId,
      data,
    };
    dispatch(deleteFlightSpecialMeals(json));
    toast.error("Ancillary Service deleted.");
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
	setAncillary("");
  };
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
        "Updated Special Meals to " +
          value.name +
          " for " +
          value.data.AirportName
      );
    } else if (shoppingItems) {
      toast.info(
        "Updated Shopping Items to " +
          value.name +
          " for " +
          value.data.AirportName
      );
    }

    setOpen(false);
    setService("");
    setAncillaryService(false);
    setSpecialMeals(false);
    setShoppingItems(false);
    setEdit({
      data: null,
      id: null,
      nameValue: "",
    });
	setAncillary("");
  };
  if (edit.id) {
    return (
      <div>
        <Dialog open="true">
          <DialogTitle></DialogTitle>
          <DialogContent>
            <DialogContentText>Update Ancillary Service</DialogContentText>
            <AncillaryServicesForm edit={edit} onSubmit={submitUpdate} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  const handleAncillaryChange = (event) => {
    const {
      target: { value },
    } = event;
    setService(value);
    if (value === "Ancillary services") {
      setAncillaryService(true);
      setSpecialMeals(false);
      setShoppingItems(false);
    } else if (value === "Special meals") {
      setAncillaryService(false);
      setSpecialMeals(true);
      setShoppingItems(false);
    } else if (value === "Shopping items") {
      setAncillaryService(false);
      setSpecialMeals(false);
      setShoppingItems(true);
    }
    if (!ancillary.includes(value)) {
      setAncillary([value]);
    } else {
      setAncillary([...meal].filter((a) => a !== value));
    }
  };
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        style={{ alignSelf: "center" }}
      >
        Add Ancillary Services
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <h4 style={{ textAlign: "center" }}>
            Add/Update/Delete Ancillary Services
            <br />
            {props.data.from + " - " + props.data.to}
          </h4>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <br />
            <FormControl sx={{ m: 1, minWidth: 230 }} size="small">
              <InputLabel id="ancillary">Select an option</InputLabel>
              <Select
                labelId="ancillary"
                id="ancillary"
                value={ancillary}
                defaultValue="Select an option"
                label="ancillary"
                onChange={handleAncillaryChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={() => (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.5,
                    }}
                  >
                    {ancillary.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {options.map((m) => (
                  <MenuItem
                    value={m}
                    key={m}
                    style={getStyles(m, ancillary, theme)}
                  >
                    <ListItemText primary={m} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {service && (
              <AncillaryServicesForm
                flightData={props.data}
                onSubmit={addAncillary}
                service={service}
              />
            )}
            <br />
            {service &&
              ancillaryServices &&
              props.data.AncillaryServices.map((ancillary, key) => (
                <div key={key} className="passenger-row">
                  {ancillary.Service}
                  <div className="icons">
                    <RiCloseCircleLine
                      onClick={(e) => deleteItem(e, ancillary.id, props.data)}
                      className="delete-icon"
                    />
                    <TiEdit
                      onClick={() =>
                        setEdit({
                          data: props.data,
                          id: ancillary.id,
                          nameValue: ancillary.Service,
                        })
                      }
                      className="edit-icon"
                    />
                  </div>
                </div>
              ))}
            {service &&
              specialMeals &&
              props.data.SpecialMeals.map((special, key) => (
                <div key={key} className="passenger-row">
                  {special.Service}
                  <div className="icons">
                    <RiCloseCircleLine
                      onClick={(e) => deleteItem(e, special.id, data)}
                      className="delete-icon"
                    />
                    <TiEdit
                      onClick={() =>
                        setEdit({
							data: props.data,
							id: special.id,
                          nameValue: special.Service,
                        })
                      }
                      className="edit-icon"
                    />
                  </div>
                </div>
              ))}
            {service &&
              shoppingItems &&
              props.data.ShoppingItems.map((shopping, key) => (
                <div key={key} className="passenger-row">
                  {shopping.Service}
                  <div className="icons">
                    <RiCloseCircleLine
                      onClick={(e) => deleteItem(e, shopping.id, data)}
                      className="delete-icon"
                    />
                    <TiEdit
                      onClick={() =>
                        setEdit({
							data: props.data,
							id: shopping.id,
                          nameValue: shopping.Service,
                        })
                      }
                      className="edit-icon"
                    />
                  </div>
                </div>
              ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>{" "}
    </>
  );
};

export default SetAncillaryServices;
