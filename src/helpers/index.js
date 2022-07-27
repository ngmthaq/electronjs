import { v4 as uuidv4 } from "uuid";
import { AppConstant, KeyConstant } from "../const";
import { PRIMARY_TITLE_BAR_HEIGHT } from "../components/PrimaryTitleBar";
import lang from "../language";

export const uuid = () => {
  return uuidv4();
};

export const fullReload = () => {
  window.location.reload();
};

export const getStorage = (key, defaultValue = null) => {
  let result = localStorage.getItem(key);

  return result ? JSON.parse(result) : defaultValue;
};

export const setStorage = (key, value) => {
  if (value && key) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    throw new Error("setStorage helper function require key and value");
  }
};

export const removeStorage = (key) => {
  localStorage.removeItem(key);
};

export const handleLogin = ({ token }) => {
  setStorage(KeyConstant.LOCAL_STORAGE.authorize, token);
};

export const handleLogout = () => {
  removeStorage(KeyConstant.LOCAL_STORAGE.authorize);
};

export const getNSKey = (namespace, key) => `${namespace}:${key}`;

export const snakeToCamelCase = (str) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", "")
    );

export const camelToSnakeCase = (str) =>
  (str.charAt(0).toLowerCase() + str.slice(1) || str).replace(
    /[A-Z]/g,
    (letter) => `_${letter.toLowerCase()}`
  );

export const snakeToCamel = (obj) => {
  var newObj, origKey, newKey, value;
  if (obj instanceof Array) {
    return obj.map(function (value) {
      if (typeof value === "object") {
        value = snakeToCamel(value);
      }
      return value;
    });
  } else {
    newObj = {};
    for (origKey in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, origKey)) {
        newKey = snakeToCamelCase(origKey);
        value = obj[origKey];
        if (value instanceof Array || (value && value.constructor === Object)) {
          value = snakeToCamel(value);
        }
        newObj[newKey] = value;
      }
    }
  }
  return newObj;
};

export const camelToSnake = (obj) => {
  var newObj, origKey, newKey, value;
  if (obj instanceof Array) {
    return obj.map(function (value) {
      if (typeof value === "object") {
        value = camelToSnake(value);
      }
      return value;
    });
  } else {
    newObj = {};
    for (origKey in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, origKey)) {
        newKey = camelToSnakeCase(origKey);
        value = obj[origKey];
        if (value instanceof Array || (value && value.constructor === Object)) {
          value = camelToSnake(value);
        }
        newObj[newKey] = value;
      }
    }
  }
  return newObj;
};

export const vw = (number) => {
  return number + "vw";
};

export const vh = (number) => {
  return `calc(${number}vh - ${PRIMARY_TITLE_BAR_HEIGHT}px)`;
};

export const deepClone = (data) => {
  if (data && data !== null && typeof data === "object") {
    return JSON.parse(JSON.stringify(data));
  }

  return null;
};

export const isJson = (data) => {
  try {
    JSON.parse(data);
  } catch (error) {
    return false;
  }

  return true;
};

export const isObj = (data) => {
  return data &&
    typeof data === "object" &&
    data !== null &&
    !Array.isArray(data)
    ? true
    : false;
};

export const isArray = (data) => {
  return data &&
    typeof data === "object" &&
    data !== null &&
    Array.isArray(data)
    ? true
    : false;
};

export const isObjEqual = (obj1, obj2) => {
  return isObj(obj1) && isObj(obj2) && _.isEqual(obj1, obj2);
};

export const isArrayEqual = (arr1, arr2) => {
  return isArray(arr1) && isArray(arr2) && _.isEqual(arr1, arr2);
};

export const getRequiredLabel = (label, isGetLabelFromLang = true) => {
  return isGetLabelFromLang ? lang.t(label) + " *" : label + " *";
};

export const changeLanguage = (locale) => {
  if (locale !== lang.language) {
    lang.changeLanguage(locale);
    setStorage(KeyConstant.LOCAL_STORAGE.lang, locale);
    window.dispatchEvent(new Event(AppConstant.EVENTS.changeLanguage));
  }
};
