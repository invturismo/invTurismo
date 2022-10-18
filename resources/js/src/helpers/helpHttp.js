import Cookies from "universal-cookie";
import {API} from "../components/router/paths";

export const helpHttp = (data = {}) => {
  const {login, profile} = data;
  const customFetch = (endpoint, options) => {
    const defaultHeader = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (!login) {
      const cookies = new Cookies();
      const token = cookies.get("accecs_token");
      defaultHeader.Authorization = `Bearer ${token}`;
    }

    options.method = options.method || "GET";
    options.headers = options.headers
      ? {...defaultHeader, ...options.headers}
      : defaultHeader;

    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body;

    // if (!options.signal) {
    //   const controller = new AbortController();
    //   options.signal = controller.signal;
    //   setTimeout(() => controller.abort(), 25000);
    // }

    return fetch(API + endpoint, options)
      .then(res =>
        res.ok
          ? res.json()
          : Promise.reject({
              state: false,
              status: res.status || "00",
              message: res.statusText || "Ocurrió un error",
            })
      )
      .catch(err => {
        if (!profile && err.status == 401) window.location.reload();
        return err;
      });
  };

  const get = (url, options = {}) => customFetch(url, options);

  const post = (url, options = {}) => {
    options.method = "POST";
    return customFetch(url, options);
  };

  const put = (url, options = {}) => {
    options.method = "PUT";
    return customFetch(url, options);
  };

  const del = (url, options = {}) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};
