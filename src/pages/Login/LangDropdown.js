import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import { Box, Popover, Typography } from "@mui/material";
import { ImageConstant, LangConstant } from "../../const";
import { changeLanguage } from "../../helpers";

const LangDropdown = () => {
  const classes = useStyles();
  const { t: getLabel, i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [currentLocale, setCurrentLocale] = useState(null);

  const onOpenDropdown = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const onCloseDropdown = () => {
    setAnchorEl(null);
  };

  const onChangeLanguage = (locale) => {
    let locales = LOCALE_OPTIONS.map((opt) => opt.key);

    if (locales.includes(locale)) {
      changeLanguage(locale);
    } else {
      // TODO: Show error: Cannot find locale
    }

    onCloseDropdown();
  };

  useEffect(() => {
    let locale = i18n.language;
    setCurrentLocale(LOCALE_OPTIONS.filter((option) => option.key === locale));
  }, []);

  return (
    <Box>
      <Typography onClick={onOpenDropdown} className={classes.localekey}>
        {currentLocale?.key || i18n.language}
      </Typography>
      <Popover
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
        open={Boolean(anchorEl)}
        onClose={onCloseDropdown}
        anchorEl={anchorEl}
        classes={{ paper: classes.paper }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {LOCALE_OPTIONS.map((option) => (
          <Box
            key={option.key}
            className={classes.optionContainer}
            onClick={() => onChangeLanguage(option.key)}
          >
            <option.Icon className={classes.icon} />
            <Typography className={classes.label}>
              {getLabel(option.label)}
            </Typography>
          </Box>
        ))}
      </Popover>
    </Box>
  );
};

export default LangDropdown;

const LOCALE_OPTIONS = [
  {
    key: LangConstant.ENGLISH_LOCALE,
    Icon: ImageConstant.UKFlagIcon,
    label: LangConstant.TXT_ENGLISH,
  },
  {
    key: LangConstant.VIETNAM_LOCALE,
    Icon: ImageConstant.VietNamFlagIcon,
    label: LangConstant.TXT_VIETNAMESE,
  },
];

const useStyles = makeStyles((theme) => ({
  localekey: {
    textTransform: "uppercase",
    padding: "8px 24px",
    border: "1px solid " + theme.palette.grey[500],
    cursor: "pointer",
    borderRadius: 8,
  },

  paper: {
    marginTop: 8,
  },

  optionContainer: {
    display: "flex",
    padding: 8,
    cursor: "pointer",
    backgroundColor: theme.palette.common.white,
    transition: "all .1s linear",
    alignItems: "center",
    "&:hover": {
      backgroundColor: theme.palette.grey[300],
    },
  },

  icon: {
    width: 30,
    height: 20,
    borderRadius: 4,
  },

  label: {
    marginLeft: 8,
  },
}));
