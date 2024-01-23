import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import i18n (needs to be bundled ;))
import "./i18n";
import AppContextProvider from "@/utils/contexts/app";
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
localStorage.setItem('i18nextLng', "fr");
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
      <Toaster />
    </AppContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
