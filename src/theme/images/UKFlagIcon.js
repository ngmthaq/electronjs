import React, { memo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { SvgIcon } from "@mui/material";
import { makeStyles } from "@mui/styles";

const VietNameFlagIcon = (props) => {
  const { className, width, height } = props;
  const classes = useStyles();

  return (
    <SvgIcon
      className={clsx(classes.root, className)}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <clipPath id="t">
        <path d="M25,15h25v15zv15h-25zh-25v-15zv-15h25z" />
      </clipPath>
      <path d="M0,0v30h50v-30z" fill="#012169" />
      <path d="M0,0 50,30M50,0 0,30" stroke="#fff" strokeWidth="6" />
      <path
        d="M0,0 50,30M50,0 0,30"
        clipPath="url(#t)"
        stroke="#C8102E"
        strokeWidth="4"
      />
      <path
        d="M-1 11h22v-12h8v12h22v8h-22v12h-8v-12h-22z"
        fill="#C8102E"
        stroke="#FFF"
        strokeWidth="2"
      />
    </SvgIcon>
  );
};

export default memo(VietNameFlagIcon);

VietNameFlagIcon.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

VietNameFlagIcon.defaultProps = {
  className: "",
  width: 50,
  height: 30,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "unset",
    height: "unset",
  },
}));
