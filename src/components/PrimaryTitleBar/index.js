import React, { useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Box, SvgIcon, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Close, CropSquare, HorizontalRule } from "@mui/icons-material";
import { ImageConstant } from "../../const";

const PrimaryTitleBar = () => {
  const classes = useStyles();

  const [isFullscreen, setIsFullscreen] = useState(false);

  const onCloseWindown = () => {
    window.electron.close();
  };

  const onMinimizeWindow = () => {
    window.electron.minimize();
  };

  const onOpenFullscreen = () => {
    window.electron.maximize();
  };

  const onCloseFullscreen = () => {
    window.electron.smallscreen();
  };

  const onDetectScreenSize = () => {
    let isFullWidth = window.innerWidth === screen.availWidth;
    let isFullHeight = window.innerHeight === screen.availHeight;

    if (process.env.APP_ENVIROMENT !== "develop") {
      if (isFullWidth && isFullHeight) {
        setIsFullscreen(true);
      } else {
        setIsFullscreen(false);
      }
    } else {
      if (isFullHeight) {
        setIsFullscreen(true);
      } else {
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    onDetectScreenSize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onDetectScreenSize);

    return () => {
      window.removeEventListener("resize", onDetectScreenSize);
    };
  });

  return (
    <Box component="header" id={PRIMARY_TITLE_BAR_ID} className={classes.root}>
      <Box className={classes.detail}>
        <ImageConstant.LogoIcon className={classes.logo} />
        <Typography className={classes.title}>
          {process.env.APP_NAME}
        </Typography>
      </Box>
      <Box className={classes.icons}>
        <Box className={clsx(classes.icon)} onClick={onMinimizeWindow}>
          <HorizontalRule className={classes.svg} />
        </Box>
        {isFullscreen ? (
          <Box className={clsx(classes.icon)} onClick={onCloseFullscreen}>
            <RestoreWindowIcon className={classes.svgRestore} />
          </Box>
        ) : (
          <Box className={clsx(classes.icon)} onClick={onOpenFullscreen}>
            <CropSquare className={classes.svg} />
          </Box>
        )}
        <Box
          className={clsx(classes.icon, classes.closeIcon)}
          onClick={onCloseWindown}
        >
          <Close className={classes.svg} />
        </Box>
      </Box>
    </Box>
  );
};

export default PrimaryTitleBar;

export const PRIMARY_TITLE_BAR_ID = "primary-title-bar-id";

export const PRIMARY_TITLE_BAR_HEIGHT = 35;

const RestoreWindowIcon = (props) => {
  const { className } = props;

  return (
    <SvgIcon
      width="1em"
      height="1em"
      viewBox="0 0 1024 1024"
      className={className}
    >
      <path
        d="M714.666667 256H138.666667a53.393333 53.393333 0 0 0-53.333334 53.333333v576a53.393333 53.393333 0 0 0 53.333334 53.333334h576a53.393333 53.393333 0 0 0 53.333333-53.333334V309.333333a53.393333 53.393333 0 0 0-53.333333-53.333333z m10.666666 629.333333a10.666667 10.666667 0 0 1-10.666666 10.666667H138.666667a10.666667 10.666667 0 0 1-10.666667-10.666667V309.333333a10.666667 10.666667 0 0 1 10.666667-10.666666h576a10.666667 10.666667 0 0 1 10.666666 10.666666z m213.333334-746.666666v565.333333a21.333333 21.333333 0 0 1-42.666667 0V138.666667a10.666667 10.666667 0 0 0-10.666667-10.666667H320a21.333333 21.333333 0 0 1 0-42.666667h565.333333a53.393333 53.393333 0 0 1 53.333334 53.333334z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

RestoreWindowIcon.propTypes = {
  className: PropTypes.string,
};

RestoreWindowIcon.defaultProps = {
  className: "",
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.black,
    height: PRIMARY_TITLE_BAR_HEIGHT,
    userSelect: "none",
    WebkitAppRegion: "drag",
    WebkitUserSelect: "none",
    zIndex: theme.zIndex.tooltip + 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  icons: {
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    width: "100%",
    height: PRIMARY_TITLE_BAR_HEIGHT,
    cursor: "pointer",
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 16px",
    WebkitAppRegion: "none",
    "&:hover": {
      backgroundColor: theme.palette.grey[800],
    },
  },

  closeIcon: {
    "&:hover": {
      backgroundColor: theme.palette.error.main,
      "& svg": {
        color: theme.palette.grey[100],
      },
    },
  },

  svg: {
    width: 16,
    height: 16,
    color: theme.palette.grey[500],
  },

  svgRestore: {
    width: 13,
    height: 13,
    color: theme.palette.grey[500],
  },

  logo: {
    width: PRIMARY_TITLE_BAR_HEIGHT - 12,
    height: PRIMARY_TITLE_BAR_HEIGHT - 12,
    marginLeft: 8,
    marginRight: 8,
  },

  detail: {
    display: "flex",
    alignItems: "center",
  },

  title: {
    color: theme.palette.common.white,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "14px",
  },
}));
