import React from "react";
import ReactDOM from "react-dom";
import {theme, GlobalStyles} from "./Styles";
import {ThemeProvider} from "styled-components";
import App from "./App";
import {Provider} from "react-redux";
import {store} from "./app/store";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
