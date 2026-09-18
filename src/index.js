import React, { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import App from "./App";

const container = document.getElementById("root");

// The site used HashRouter until September 2026, so links like /#/blog/foo
// exist in the wild. Rewrite them to real paths before the router mounts.
let redirectedFromHash = false;
if (window.location.hash.startsWith("#/")) {
    window.history.replaceState(null, "", window.location.hash.slice(1));
    redirectedFromHash = true;
}

const app = (
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);

// Pages are prerendered at build time (scripts/prerender.js). Attach to that
// markup when it is there; otherwise (404 fallback, or a hash redirect whose
// prerendered page doesn't match the real route) render from scratch.
if (container.hasChildNodes() && !redirectedFromHash) {
    hydrateRoot(container, app);
} else {
    createRoot(container).render(app);
}
