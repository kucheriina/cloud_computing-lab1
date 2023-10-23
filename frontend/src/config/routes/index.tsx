import AuthLayout from "components/layout/AuthLayout";
import Redirect from "components/redirect";
import { AuthorizedPath, authUrl, publicUrl } from "config/path";
import { PublicPath } from "config/path/publicPath";
import { RouteObject } from "react-router-dom";

export type Route<Path extends PublicPath | AuthorizedPath = PublicPath | AuthorizedPath> = RouteObject & {
  path: Path;
};

export type PublicRoute = Route<PublicPath>;
export type AuthRoute = Route<AuthorizedPath>;

/**
 * Чтобы добавить новые роуты: <br/>
 * Надо добавить путь в PublicPath (если роут доступен для неавторизованного пользователя)
 * или в AuthorizedPath (если роут недоступен для неавторизованного юзера) <br/>
 * Добавить объект типа Route в соответствующий массив роутов (rootRoutes для корневых роутов)
 * */

/**
 * Рутовые роуты для авторизованных пользователей
 * */
export const rootRoutes: AuthRoute[] = [
  {
    path: authUrl.Index.path,
    element: <AuthLayout />,
    children: [
      {
        path: authUrl.All.path,
        element: <Redirect pathname={publicUrl.Index.Login.path} />,
      },
      {
        path: authUrl.Index.path,
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
