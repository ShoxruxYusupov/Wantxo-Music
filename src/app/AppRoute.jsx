import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "../redux/store";
import { appRoutes } from "./routes/app-routes";

export function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRoutes} />
    </Provider>
  );
}
