import { useState, useEffect } from "react";
import { LangConstant } from "../const";
import lang from "../language";

const useValidator = ({ form, rules }) => {
  const [data, setData] = useState(null);
  const [tmpData, setTmpData] = useState(null);

  const onRunningValidator = (key) => {
    if (key) {
      let validatorItem = tmpData[key];
      setData((state) => ({ ...state, [key]: validatorItem }));
    } else {
      setData(tmpData);
    }
  };

  const onClearValidator = (key) => {
    if (key) {
      setData((state) => ({
        ...state,
        [key]: { ...defaultOutput },
      }));
    } else {
      setData(null);
    }
  };

  useEffect(() => {
    const validatorData = Validator({ rules });
    const validateObj = validatorData.reduce((obj, data, index) => {
      let key = data.name;
      delete data.name;
      obj[key] = data;

      return obj;
    }, {});

    setTmpData(validateObj);
  }, [form]);

  return [data, onRunningValidator, onClearValidator];
};

const Validator = ({ rules }) => {
  let validateArray = [];
  rules.forEach((rule) => {
    let tester = rule.test();
    validateArray.push(tester);
  });

  return validateArray;
};

const objValidateMsg = lang.t(LangConstant.OBJ_VALIDATION_MSG, {
  returnObjects: true,
});

const defaultOutput = {
  isFailure: false,
  message: "",
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
      ? {
          name: name,
          isFailure: false,
          message: "",
        }
      : {
          name: name,
          isFailure: true,
          message: message === null ? objValidateMsg.email : message,
        };
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
      ? {
          name: name,
          isFailure: false,
          message: "",
        }
      : {
          name: name,
          isFailure: true,
          message: message === null ? objValidateMsg.number : message,
        };
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
      ? {
          name: name,
          isFailure: false,
          message: "",
        }
      : {
          name: name,
          isFailure: true,
          message: message === null ? objValidateMsg.required : message,
        };
  },
});

Validator.isEmail = isEmail;
Validator.isNumber = isNumber;
Validator.isRequired = isRequired;

export default useValidator;

export { Validator };
