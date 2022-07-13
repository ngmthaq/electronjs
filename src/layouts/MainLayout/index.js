import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";

const MainLayout = (props) => {
  const { children, classes } = props;
  const defaultClasses = useStyles();

  return (
    <Box className={clsx(defaultClasses.root, classes.root)}>
      <Box className={clsx(defaultClasses.children, classes.children)}>
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    children: PropTypes.string,
  }),
};

MainLayout.defaultProps = {
  classes: {
    root: "",
    children: "",
  },
};

const useStyles = makeStyles((theme) => ({}));
