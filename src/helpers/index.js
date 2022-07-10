import { v4 as uuidv4 } from "uuid";
import { KeyConstant } from "../constants";

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
