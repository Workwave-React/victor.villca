import { createBrowserRouter } from "react-router-dom";
import AppV1 from "./v1/AppV1";
import AppV2 from "./v2/AppV2";


export const router = createBrowserRouter([
  { path: "/v1/*", element: <AppV1 /> },
  { path: "/v2/*", element: <AppV2 /> },
  { path: "/*", element: <AppV1 /> },
]);
