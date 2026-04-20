import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./style.scss"
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>,
);
