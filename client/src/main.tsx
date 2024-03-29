import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { AppContextProvider } from "./contexts/AppContext.tsx";
import "./index.css";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 0,
//     },
//   },
// });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <QueryClientProvider client={queryClient}> */}
    <AppContextProvider>
      <BrowserRouter>
        <App />
        <Toaster position="top-center" reverseOrder={false} />
      </BrowserRouter>
    </AppContextProvider>
    {/* </QueryClientProvider> */}
  </React.StrictMode>
);
