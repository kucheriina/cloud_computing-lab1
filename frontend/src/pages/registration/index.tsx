import { Button, Col, FormProps, message } from "antd";
import { useForm } from "antd/es/form/Form";
import FormLayout from "components/formLayout";
import { publicUrl } from "config/path";
import formData from "pages/registration/formData";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistrationMutation } from "services/authService/authService";
import { UserFormData } from "types/user";
import style from "./registration.module.scss";

const Registration: FC = () => {
  const navigate = useNavigate();
  const [form] = useForm<UserFormData>();

  const [registration, { isLoading }] = useRegistrationMutation();

  const onFinish: FormProps<UserFormData>["onFinish"] = async (values) => {
    const { passwordConfirm, personalData, ...userData } = values;
    await registration(userData).then((res) => {
      if (!(res as any)?.error) {
        message.success("Поздравляем! Регистрация прошла успешно");
        navigate(publicUrl.Index.Login.url);
      }
    });
  };

  const onLogin = () => {
    navigate(publicUrl.Index.Login.url);
  };

  return (
    <FormLayout
      form={form}
      formData={formData({ form })}
      onFinish={onFinish}
      name={"registration-form"}
      className={style.wrapper}>
      <Col span={24} className={style.colCenter}>
        <Button htmlType={"submit"} type={"default"} className={style.button} loading={isLoading}>
          Регистрация
        </Button>
      </Col>
      <Col span={24} className={style.colCenter}>
        <div className={style.subButton}>
          Уже есть аккаунт?
          <Button type={"ghost"} onClick={onLogin} size={"small"}>
            Авторизация
          </Button>
        </div>
      </Col>
    </FormLayout>
  );
};

export default Registration;
