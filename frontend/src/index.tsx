import { ConfigProvider, Spin } from "antd";
import "assets/styles/index.scss";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <ConfigProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<Spin />}>
          <App />
        </Suspense>
      </PersistGate>
    </Provider>
  </ConfigProvider>
);
