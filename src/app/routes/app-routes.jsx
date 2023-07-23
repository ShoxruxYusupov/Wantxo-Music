import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import { TopPlay } from "../../components";
import { SongDetails } from "../../pages";

export const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <TopPlay />,
      },
      {
        path: "/songs/:songid",
        element: <SongDetails />,
      },
    ],
  },
]);
