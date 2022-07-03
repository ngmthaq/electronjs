import React from "react"
import { useTranslation } from "react-i18next"
import { Box, CardMedia, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { ArrowBack } from "@mui/icons-material"
import { ImageConst, LangConst } from "../../constants"

const NotFound = () => {
  const classes = useStyles()
  const { t: getLabel } = useTranslation()

  return (
    <Box className={classes.root}>
      <CardMedia
        component={"img"}
        className={classes.img}
        src={ImageConst.ErrorImage}
      />
      <Typography variant="h5" className={classes.text}>
        404 | {getLabel(LangConst.TXT_ERROR)}
      </Typography>
      <Box className={classes.back}>
        <ArrowBack className={classes.icon} />
        <Typography>{getLabel(LangConst.TXT_BACK)}</Typography>
      </Box>
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
    width: 200,
    height: 200,
    objectFit: "contain",
  },
  text: {
    marginBottom: 12,
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
}))