"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var client_1 = require("react-dom/client");
var react_router_1 = require("react-router");
var react_query_1 = require("@tanstack/react-query");
var agentation_1 = require("agentation");
require("./index.css");
var App_tsx_1 = require("./App.tsx");
var queryClient = new react_query_1.QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});
(0, client_1.createRoot)(document.getElementById('root')).render(<react_1.StrictMode>
    <react_query_1.QueryClientProvider client={queryClient}>
      <react_router_1.BrowserRouter>
        <App_tsx_1.default />
        <agentation_1.Agentation />
      </react_router_1.BrowserRouter>
    </react_query_1.QueryClientProvider>
  </react_1.StrictMode>);
