import React from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);
<React.StrictMode>
  {root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )}
</React.StrictMode>;
