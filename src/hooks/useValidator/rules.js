import { LangConstant } from "../../const";
import lang from "../../language";

const objValidateMsg = lang.t(LangConstant.OBJ_VALIDATION_MSG, {
  returnObjects: true,
});

const getOutputObj = (name, isFailure, message = "", customMessage = null) => {
  return customMessage === null
    ? {
        name,
        isFailure,
        message,
      }
    : {
        name,
        isFailure,
        customMessage,
      };
};

const isEmail = ({ name, input, message = null }) => ({
  name: name,
  input: input,
  message: message,
  test: () => {
    let regex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let result = regex.test(input);

    return result
      ? getOutputObj(name, false)
      : getOutputObj(name, true, objValidateMsg.email, message);
  },
});

const isNumber = ({ name, input, message = null }) => ({
  name: name,
  input: input,
  message: message,
  test: () => {
    let regex = /\d+/;

    let result = regex.test(input);

    return result
      ? getOutputObj(name, false)
      : getOutputObj(name, true, objValidateMsg.number, message);
  },
});

const isRequired = ({ name, input, message = null }) => ({
  name: name,
  input: input,
  message: message,
  test: () => {
    let result =
      input === "" || input === null || input === undefined ? false : true;

    return result
      ? getOutputObj(name, false)
      : getOutputObj(name, true, objValidateMsg.required, message);
  },
});

const rules = {
  isEmail,
  isNumber,
  isRequired,
};

export default rules;
