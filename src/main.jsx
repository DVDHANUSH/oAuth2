import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { AuthProvider } from "./config/authcontext.jsx";
import Home from "./components/Home.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AuthProvider>
    {/* <Toaster> */}
    <Home />
    {/* </Toaster> */}
  </AuthProvider>
  // </StrictMode>
);
