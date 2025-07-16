import React from "react";
import { Button } from "@mui/material";
import theme from "../Styles/theme";


const SideButton = ({
  text,
  color, 
  onClick,
  icon,
  ...rest
  
}) => (
  <Button
    variant="contained"
    color={color}
    fullWidth
    startIcon={icon}
    sx={{ mb: 3, textTransform: "none" }}
    onClick={onClick}
    {...rest}

  >
    {text}
  </Button>
);

export default SideButton;
