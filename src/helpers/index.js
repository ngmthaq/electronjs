import { v4 as uuidv4 } from "uuid";
import { KeyConstant } from "../const";
import { primaryTitleBarHeight } from "../components/PrimaryTitleBar";

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
  if (value) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.removeItem(key);
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

export const toCamel = (obj) => {
  var newObj, origKey, newKey, value;
  if (obj instanceof Array) {
    return obj.map(function (value) {
      if (typeof value === "object") {
        value = toCamel(value);
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
          value = toCamel(value);
        }
        newObj[newKey] = value;
      }
    }
  }
  return newObj;
};

export const toSnake = (obj) => {
  var newObj, origKey, newKey, value;
  if (obj instanceof Array) {
    return obj.map(function (value) {
      if (typeof value === "object") {
        value = toSnake(value);
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
          value = toSnake(value);
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
  return `calc(${number}vh - ${primaryTitleBarHeight}px)`;
};
