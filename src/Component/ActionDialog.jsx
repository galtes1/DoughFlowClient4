// src/Component/ActionDialog.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SideButton from "./SideButton";
import theme from "../Styles/theme";


/**
 * reusable modal with a list of SideButtons
 * @param {boolean}   open     – controls visibility
 * @param {Function}  onClose  – called when dialog closes
 * @param {string}    title    – dialog title text
 * @param {Array<{label:string,onClick:Function,color?:string,icon?:JSX}>} options – buttons to render
 */
const ActionDialog = ({ open, onClose, title, options = [] }) => (
  <Dialog open={open} 
          onClose={onClose} 
          maxWidth="xs" 
          fullWidth  
          PaperProps={{
      sx: { backgroundColor: theme.colors.background }
 }}>
    <DialogTitle
    sx={{
            backgroundColor: theme.colors.primary,
            color: "white",
            fontFamily: theme.fonts.main,
          }}
    >
      {title}
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{ position: "absolute", right: 8, top: 8 , color: "white"}}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent dividers>
    <Box sx={{ display: "flex", flexDirection: "column" , gap:3}}>
      {options.map((opt) => (
        <SideButton
          key={opt.label}
          text={opt.label}
          icon={opt.icon}
          sx={{
            backgroundColor:
              opt.color === "secondary"
                ? theme.colors.secondary
                : theme.colors.primary,
            "&:hover": {
              backgroundColor:
                opt.color === "secondary" ? "#B7D0D4" : "#9BA0C0",
            },
            minWidth: 160,
            py: 1.2,
          }}
          onClick={() => {
            opt.onClick();
            onClose();
          }}
        />
        ))}
      </Box>
    </DialogContent>
  </Dialog>
);

export default ActionDialog;
