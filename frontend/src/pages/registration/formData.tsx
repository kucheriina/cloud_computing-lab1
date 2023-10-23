import { FormInstance, Input } from "antd";
import { FormData } from "components/formLayout";
import React from "react";
import { UserFormData } from "types/user";
import formRules from "utils/formRules";

interface FormDataArgs<T extends object> {
  form: FormInstance<T>;
}

const formData = <T extends object>({ form }: FormDataArgs<T>): FormData<UserFormData> => [
  {
    key: "email",
    type: Input,
    typeProps: {
      placeholder: "Email",
    },
    formItemProps: {
      rules: [formRules.email(false), formRules.required()],
    },
  },
  {
    key: "password",
    type: Input.Password,
    typeProps: {
      placeholder: "Пароль",
    },
    formItemProps: {
      rules: [formRules.password()],
    },
  },
  {
    key: "passwordConfirm",
    type: Input.Password,
    typeProps: {
      placeholder: "Подтверждение пароля",
    },
    formItemProps: {
      rules: [formRules.passwordConfirm(form), formRules.required()],
    },
  },
];

export default formData;
