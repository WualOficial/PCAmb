import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//import Login from "./Login";
import Atendimento from "./Atendimento";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Atendimento />
  </StrictMode>,
);
