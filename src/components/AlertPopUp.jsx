import * as React from "react";

import { position, left, bottom } from "@mui/system";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Slide from "@mui/material/Slide";


export default function AlertDialog({
  isOpen,
  onClose,
  title,
  type,
  children
}) {
  return (
    <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit sx={{position: "fixed", left: 30, bottom: 30, backgroundColor: "white" }}>
		<Alert variant="outlined" severity={type} onClose={onClose}>
			<AlertTitle><strong>{title}</strong></AlertTitle>
			{children}
		</Alert>
	</Slide>
  );
}
