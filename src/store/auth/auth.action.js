import { mutators } from "./auth.redux";
import { guestApi } from "../../api";
import { handleLogin } from "../../helpers";

const actions = {
  login: () => async (dispatch) => {
    try {
      let response = await guestApi().getWithLoading("auth");
      dispatch(mutators.login({ token: response.data.token }));
      handleLogin({ token: response.data.token });
    } catch (e) {
      console.error(e);
    }
  },
};

export default actions;
