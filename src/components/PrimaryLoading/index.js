import React from "react";
import PropTypes from "prop-types";
import { Backdrop, CircularProgress, Fade } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PRIMARY_TITLE_BAR_HEIGHT } from "../PrimaryTitleBar";
import { vh } from "../../helpers";

const PrimaryLoading = (props) => {
  const classes = useStyles();
  const { open } = props;

  return (
    <Fade in={open}>
      <Backdrop open={open}>
        <CircularProgress color="primary" />
      </Backdrop>
    </Fade>
  );
};

export default PrimaryLoading;

PrimaryLoading.propTypes = {
  open: PropTypes.bool,
};

PrimaryLoading.defaultProps = {
  open: false,
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    zIndex: theme.zIndex.modal,
    height: vh(100),
    marginTop: PRIMARY_TITLE_BAR_HEIGHT,
  },
}));
