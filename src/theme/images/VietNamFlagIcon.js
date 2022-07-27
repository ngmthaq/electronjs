import React, { memo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { SvgIcon } from "@mui/material";
import { makeStyles } from "@mui/styles";

const VietNamFlagIcon = (props) => {
  const { className, width, height } = props;
  const classes = useStyles();

  return (
    <SvgIcon
      className={clsx(classes.root, className)}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <rect width="30" height="20" fill="#da251d" />
      <polygon
        points="15,4 11.47,14.85 20.71,8.15 9.29,8.15 18.53,14.85"
        fill="#ff0"
      />
    </SvgIcon>
  );
};

export default memo(VietNamFlagIcon);

VietNamFlagIcon.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

VietNamFlagIcon.defaultProps = {
  className: "",
  width: 30,
  height: 20,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "unset",
    height: "unset",
  },
}));
