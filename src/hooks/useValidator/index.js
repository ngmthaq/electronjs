import { useState, useEffect } from "react";
import lang from "../../language";
import rules from "./rules";

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

  useEffect(() => {
    setData(null);
  }, [lang.language]);

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

const defaultOutput = {
  isFailure: false,
  message: "",
};

Validator.isEmail = rules.isEmail;
Validator.isNumber = rules.isNumber;
Validator.isRequired = rules.isRequired;

export default useValidator;

export { Validator };
