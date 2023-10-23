import { Button, Col, FormProps } from "antd";
import { useForm } from "antd/es/form/Form";
import FormLayout from "components/formLayout";
import { publicUrl } from "config/path";
import formData from "pages/login/formData";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "services/authService/authService";
import { AuthUserRequest } from "types/user";
import style from "./login.module.scss";

const Login: FC = () => {
  const navigate = useNavigate();
  const [form] = useForm<AuthUserRequest>();

  const [login, { isLoading }] = useLoginMutation();

  const onFinish: FormProps<AuthUserRequest>["onFinish"] = async (values) => {
    await login(values).catch((error) => {
      console.log("error", error);
    });
  };

  const onRegistration = () => {
    navigate(publicUrl.Index.Registration.url);
  };

  return (
    <FormLayout
      form={form}
      formData={formData}
      onFinish={onFinish}
      name={"registration-form"}
      className={style.wrapper}>
      <Col span={24} className={style.colCenter}>
        <Button htmlType={"submit"} type={"default"} className={style.button} loading={isLoading}>
          Авторизация
        </Button>
      </Col>
      <Col span={24} className={style.colCenter}>
        <div className={style.subButton}>
          Еще нет аккаунта?
          <Button type={"ghost"} onClick={onRegistration} size={"small"}>
            Регистрация
          </Button>
        </div>
      </Col>
    </FormLayout>
  );
};

export default Login;
