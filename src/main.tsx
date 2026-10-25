import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "./app";
import "./globals.css";

if (typeof localStorage !== "undefined" && localStorage.getItem("monkeywork-dark-mode") === "1") {
  document.documentElement.classList.add("dark");
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element #root not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider />
    </BrowserRouter>
  </StrictMode>,
);
