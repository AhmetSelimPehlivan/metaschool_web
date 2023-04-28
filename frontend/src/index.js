import React from "react";
import ReactDOM from "react-dom";

 import { AuthProvider } from "./contexts/AuthContext"
import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import App from "App";

ReactDOM.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
    <AuthProvider >
      <App/>
    </AuthProvider>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>,
  document.getElementById('root')
);
