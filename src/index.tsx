import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "@/store/index";
import App from "./App";
import { HashRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";
// import reportWebVitals from './reportWebVitals';
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <ConfigProvider theme={{ token: { colorPrimary: "#1677FF" } }}>
          <App />
        </ConfigProvider>
      </Router>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
