import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/locale/es';

ReactDOM.render(
  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MuiPickersUtilsProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();