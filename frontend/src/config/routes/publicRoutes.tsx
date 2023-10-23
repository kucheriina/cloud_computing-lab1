import PublicLayout from "components/layout/PublicLayout";
import Redirect from "components/redirect";
import { publicUrl } from "config/path";
import { PublicRoute } from "config/routes";
import Login from "pages/login";
import Registration from "pages/registration";

/**
 * Роуты для неавторизованных пользователей
 * */
export const publicRoutes: PublicRoute[] = [
  {
    path: publicUrl.Index.path,
    element: <PublicLayout />,
    children: [
      {
        path: publicUrl.Index.Registration.path,
        element: <Registration />,
      },
      {
        path: publicUrl.Index.Login.path,
        element: <Login />,
      },
      {
        path: publicUrl.All.path,
        element: <Redirect pathname={publicUrl.Index.Login.path} />,
      },
      {
        path: publicUrl.Index.path,
        element: <Redirect pathname={publicUrl.Index.Login.path} />,
      },

      // {
      //   path: publicUrl.All.path,
      //   element: <Redirect pathname={publicUrl.Index.Login.url} />,
      // },
      // {
      //   path: "",
      //   element: <Redirect pathname={publicUrl.Index.Login.url} setReturnUrl={false} />,
      // },
    ],
  },
];
