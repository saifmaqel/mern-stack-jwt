import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}
const baseUrl = "https://workouts-api-t67z.onrender.com/api/";
axios.defaults.baseURL = baseUrl;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
// axios.defaults.validateStatus = function (status) {
//   return status >= 200 && status < 500;
// };

axios.interceptors.response.use(
  function (response) {
    if (typeof response.data === "object") {
      response.data.httpStatus = response.status;
      response.data.httpStatusOk =
        response.status >= 200 && response.status < 300;

      if (response.config.responseType === "blob") return response;
      if (response.status === 401) {
        if (!response.config.url?.includes("auth")) {
          location.reload();
          //     "User is Unauthorized",
        }
      } else if (response.status === 403) {
        //     "Access to this resource is not granted",
      } else if (response.status >= 400) {
        if (!response.config.url?.includes("auth")) {
          //     "Unknown Error",
        }
      }
    } else {
      const mockResponse = {
        success: false,
        httpStatus: response.status,
        httpStatusOk: response.status >= 200 && response.status < 300,
      };
      response.data = mockResponse;
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
