import { rootRoutes, Route as IRoute } from "config/routes";
import { publicRoutes } from "config/routes/publicRoutes";
import useAuthUser from "hooks/useAuhtUser";
import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

type GetRoutes = ({ user, isAuth }: { user?: any /*EntityUser*/; isAuth: boolean }) => IRoute[];

interface RouterProps {
  getRoutes?: GetRoutes;
}

const defaultGetRoutes: GetRoutes = ({ isAuth }) => {
  return isAuth ? rootRoutes : publicRoutes;
};

const Router: FC<RouterProps> = ({ getRoutes = defaultGetRoutes }) => {
  const { isAuth, user } = useAuthUser();

  const routes = getRoutes({ user, isAuth });

  return <RouterProvider router={createBrowserRouter(routes)} />;
};

export default Router;
