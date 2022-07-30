import React from "react";
import PropTypes from "prop-types";
import { Backdrop, Box, Fade } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ImageConstant } from "../../const";
import { vh } from "../../helpers";
import { PRIMARY_TITLE_BAR_HEIGHT } from "../PrimaryTitleBar";

const InitLoading = (props) => {
  const classes = useStyles();
  const { open } = props;

  return (
    <Fade in={open}>
      <Backdrop open={open} classes={{ root: classes.root }}>
        <Box className={classes.container}>
          <Box className={classes.loading} />
          <ImageConstant.LogoIcon className={classes.icon} />
        </Box>
      </Backdrop>
    </Fade>
  );
};

export default InitLoading;

InitLoading.propTypes = {
  open: PropTypes.bool,
};

InitLoading.defaultProps = {
  open: false,
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    zIndex: theme.zIndex.modal,
    height: vh(100),
    marginTop: PRIMARY_TITLE_BAR_HEIGHT,
  },

  container: {
    width: 200,
    height: 200,
    position: "relative",
  },

  loading: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: `linear-gradient(to right, 
      rgba(255,255,255,0),
      rgba(255,255,255,0.2),
      rgba(255,255,255,0.4),
      rgba(255,255,255,0.55),
      rgba(255,255,255,0.6),
      rgba(255,255,255,0.4),
      rgba(255,255,255,0.2),
      rgba(255,255,255,0))`,
    backgroundSize: "200% 100%",
    animation: `$loading 3000ms linear infinite`,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
    transform: "rotate(45deg)",
  },

  icon: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },

  "@keyframes loading": {
    to: {
      backgroundPositionX: "-200%",
    },
  },
}));
