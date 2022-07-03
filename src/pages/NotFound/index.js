import React from "react"
import { Box, CardMedia, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { ImageConst } from "../../constants"

const NotFound = () => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <CardMedia
        component={"img"}
        className={classes.img}
        src={ImageConst.ErrorImage}
      />
      <Typography variant="h1">404</Typography>
    </Box>
  )
}

export default NotFound

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 400,
    height: 400,
    objectFit: "contain",
  },
}))
