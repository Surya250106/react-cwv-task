import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { reportVitals } from "./reportVitals";

// Log Web Vitals to console
reportVitals((metric) => {
  console.log(`[Web Vitals] ${metric.name}:`, {
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
  });
  console.table([
    {
      Metric: metric.name,
      Value: `${metric.value.toFixed(2)}ms`,
      Rating: metric.rating,
      Delta: `${metric.delta.toFixed(2)}ms`,
    },
  ]);
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
