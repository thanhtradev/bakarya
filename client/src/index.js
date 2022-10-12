import React from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { AuthContextProvider } from "./store/auth-context";
const container = document.getElementById("root");
const root = createRoot(container);
<React.StrictMode>
  {root.render(
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  )}
</React.StrictMode>;
