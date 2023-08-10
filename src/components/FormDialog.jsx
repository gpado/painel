import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import DefaultDatePicker from "./DefaultDatePicker";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

export default function FormDialog({
  isOpen,
  onClose,
  onSubmit,
  inputElements,
  inputValues,
  title,
  btnSubmitName,
  children
}) { 

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
        <Grid container spacing={2} columns={14}>

          {inputElements.map((input, index) => (
            <Grid item xs={input.columns}>
              {(input.type === "date") ? (
                <DefaultDatePicker 
                  label={input.label} 
                  id={input.id}
                  onChange={input.onChange}
				  value={input.value}
				  margin="dense"
                />
              ) : (input.type === "select") ? (
                <FormControl fullWidth id={input.id} margin="dense">
                  <InputLabel id={`lbl-${input.id}`}>{input.label}</InputLabel>
                  <Select
                    labelId={`lbl-${input.id}`}
                    id={input.id}
                    value={input.value}
                    onChange={input.onChange}
                    MenuProps={MenuProps}
                    label={input.id}
					
                  >
                    {input.options.map((option) =>(
                      <MenuItem value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  autoFocus={index === 0}
                  margin="dense"
                  id={input.id}
                  label={input.label}
                  type={input.type}
                  variant="outlined"
                  placeholder={input.type === "data" && " "}
                  onChange={input.onChange && input.onChange}
                  fullWidth
				  value={input.value}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit}>{btnSubmitName}</Button>
      </DialogActions>
    </Dialog>
  );
}
