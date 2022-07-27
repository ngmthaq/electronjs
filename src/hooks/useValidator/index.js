import { useState, useEffect } from "react";
import { AppConstant } from "../../const";
import rules from "./rules";

const useValidator = ({ form, rules }) => {
  const [data, setData] = useState(null);
  const [tmpData, setTmpData] = useState(null);

  const onRunningValidator = (name) => {
    if (name) {
      let validatorItem = tmpData[name];
      setData((state) => ({ ...state, [name]: validatorItem }));
    } else {
      setData(tmpData);
    }
  };

  const onClearValidator = (name) => {
    if (name) {
      setData((state) => ({
        ...state,
        [name]: { ...defaultOutput },
      }));
    } else {
      setData(null);
    }
  };

  const onTrackingValidator = () => {
    const validatorData = Validator({ rules });
    const validateObj = validatorData.reduce((obj, data, index) => {
      let key = data.name;
      delete data.name;
      obj[key] = data;

      return obj;
    }, {});

    return validateObj;
  };

  useEffect(() => {
    let result = onTrackingValidator();
    setTmpData(result);
  }, [form]);

  useEffect(() => {
    let onChangeLanguage = () => {
      let tmpResult = onTrackingValidator();
      setTmpData(tmpResult);
      setData(null);
    };

    window.addEventListener(
      AppConstant.EVENTS.changeLanguage,
      onChangeLanguage
    );

    return () => {
      window.removeEventListener(
        AppConstant.EVENTS.changeLanguage,
        onChangeLanguage
      );
    };
  });

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
