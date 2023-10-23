import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import style from "./layout.module.scss";

const PublicLayout: FC = ({}) => {
  return (
    <div className={style.layout}>
      <h1 className={style.title}>ParseGenerator</h1>

      <Outlet />
    </div>
  );
};

export default PublicLayout;
