import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import DefaultDatePicker from "./DefaultDatePicker";

export default function FormDialog({
  isOpen,
  onClose,
  onSubmmit,
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
              {input.type === "date" ? (
                <DefaultDatePicker label={input.label} id={input.id} />
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
                  defaultValue={inputValues && inputValues[index]}
                  fullWidth
                />
              )}
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmmit}>{btnSubmitName}</Button>
      </DialogActions>
    </Dialog>
  );
}
