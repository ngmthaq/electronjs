import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Popover, Typography } from "@mui/material";

const LangDropdown = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const onOpenDropdown = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const onCloseDropdown = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Typography onClick={onOpenDropdown}>EN</Typography>
      <Popover
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
        open={Boolean(anchorEl)}
        onClose={onCloseDropdown}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        The content of the Popover.
      </Popover>
    </Box>
  );
};

export default LangDropdown;

const useStyles = makeStyles((theme) => ({}));
