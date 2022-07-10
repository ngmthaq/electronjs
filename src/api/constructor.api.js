import axios from "axios";
import store from "../store";
import { mutators, getter } from "../store/common/common.redux";

class Api {
  constructor() {
    // Get timezone of browser
    this.tz =
      Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Saigon"
        ? "Asia/Ho_Chi_Minh"
        : Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Make an instant of axios
    this.api = axios.create();

    // Config axios default headers
    this.api.defaults.baseURL = process.env.API_BASE_URL;
    this.api.defaults.headers.common["Timezone"] = this.tz;
    this.api.defaults.headers.common["Cache-Control"] = "no-cache";
    this.api.defaults.headers.common["Cache-control"] = "no-store";
    this.api.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    this.api.defaults.headers.common["Pragma"] = "no-cache";
    this.api.defaults.headers.common["X-Request-With"] = "XMLHttpRequest";

    // Config axios request interceptor
    this.api.interceptors.request.use(
      (config) => this.onRequestSuccess(config), // Do sonething before request sent
      (error) => this.onRequestError(error) // Do something with request error
    );

    // Config axios response interceptor
    this.api.interceptors.response.use(
      (response) => this.onResponseSuccess(response), // Do something when response in 2xx status
      (error) => this.onResponseError(error) // Do something when response got error
    );
  }

  // Request success interceptor
  onRequestSuccess(config) {
    return config;
  }

  // Request error interceptor
  onRequestError(err) {
    return Promise.reject(err);
  }

  // Response success interceptor
  onResponseSuccess(resp) {
    return resp;
  }

  // Response error interceptor
  onResponseError(err) {
    return Promise.reject(err);
  }

  // config general api request
  async _request(method, url, params, data, headers = {}, config = {}) {
    return await this.api.request({
      ...config,
      url,
      params,
      data,
      method: method.toLowerCase(),
      headers,
    });
  }

  // config get request
  async _get(url, params = {}, headers = {}, config = {}) {
    return await this._request("get", url, params, {}, headers, config);
  }

  // config post request
  async _post(url, data = {}, headers = {}, config = {}) {
    return await this._request("get", url, {}, data, headers, config);
  }

  // config put request
  async _put(url, data, headers = {}, config = {}) {
    return await this._request("put", url, {}, data, headers, config);
  }

  // config delete request
  async _delete(url, data = {}, headers = {}, config = {}) {
    return await this._request("delete", url, {}, data, headers, config);
  }

  async get(url, params = {}, headers = {}) {
    try {
      store.dispatch(mutators.request());
      let result = await this._get(url, params, headers);
      store.dispatch(mutators.reset());
      return result;
    } catch (e) {
      store.dispatch(
        mutators.setter({ isCallingApi: false, isLoading: false, error: e })
      );
      return e;
    }
  }

  async getWithLoading(url, params = {}, headers = {}) {
    try {
      store.dispatch(mutators.requestWithLoading());
      let result = await this._get(url, params, headers);
      store.dispatch(mutators.reset());
      return result;
    } catch (e) {
      store.dispatch(
        mutators.setter({ isCallingApi: false, isLoading: false, error: e })
      );
      return e;
    }
  }

  async post(url, data = {}, headers = {}) {
    try {
      store.dispatch(mutators.requestWithLoading());
      let result = await this._post(url, data, headers);
      store.dispatch(mutators.reset());
      return result;
    } catch (e) {
      store.dispatch(
        mutators.setter({ isCallingApi: false, isLoading: false, error: e })
      );
      return e;
    }
  }

  async put(url, data = {}, headers = {}) {
    try {
      store.dispatch(mutators.requestWithLoading());
      let result = await this._put(url, data, headers);
      store.dispatch(mutators.reset());
      return result;
    } catch (e) {
      store.dispatch(
        mutators.setter({ isCallingApi: false, isLoading: false, error: e })
      );
      return e;
    }
  }

  async delete(url, data = {}, headers = {}) {
    try {
      store.dispatch(mutators.requestWithLoading());
      let result = await this._delete(url, data, headers);
      store.dispatch(mutators.reset());
      return result;
    } catch (e) {
      store.dispatch(
        mutators.setter({ isCallingApi: false, isLoading: false, error: e })
      );
      return e;
    }
  }
}

export default Api;
