import React from "react";
import PropTypes from "prop-types";
import { Backdrop, CircularProgress } from "@mui/material";

const PrimaryLoading = (props) => {
  const { open } = props;

  return (
    <Backdrop open={open}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
};

export default PrimaryLoading;

PrimaryLoading.propTypes = {
  open: PropTypes.bool,
};

PrimaryLoading.defaultProps = {
  open: false,
};
