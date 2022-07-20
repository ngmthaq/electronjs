import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Box, CardMedia, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ImageConstant, LangConstant } from "../../const";
import { vh, vw } from "../../helpers";

const SmallScreenWarning = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();

  useEffect(() => {
    console.warn("Small screen warning");
  }, []);

  return (
    <Box className={classes.root}>
      <CardMedia
        component={"img"}
        className={classes.img}
        src={ImageConstant.ErrorImage}
      />
      <Typography variant="h5" className={classes.text}>
        {getLabel(LangConstant.TXT_SMALL_SCREEN_WARNING)}
      </Typography>
    </Box>
  );
};

export default SmallScreenWarning;

const useStyles = makeStyles((theme) => ({
  root: {
    width: vw(100),
    height: vh(100),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  img: {
    width: 200,
    height: 200,
    objectFit: "contain",
  },
  text: {
    marginBottom: 12,
    textAlign: "center",
  },
  icon: {
    marginRight: 4,
  },
  back: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
}));
