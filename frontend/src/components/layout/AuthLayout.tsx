import { Button, Space, Typography } from "antd";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "store";
import { logout } from "store/slices/userSlice";

const AuthLayout: FC = () => {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user.user);

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <div style={{ width: "400px", marginTop: "300px", textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
      <Space direction={"vertical"} size={10}>
        <Typography.Title level={1}>Добро пожаловать!</Typography.Title>
        <Typography.Text>Ваш email: {user?.email}!</Typography.Text>
        <Button type={"primary"} onClick={onLogout}>
          Выход
        </Button>
      </Space>
    </div>
  );
};

export default AuthLayout;
