import { Input } from "antd";
import { FormData } from "components/formLayout";
import React from "react";
import { AuthUserRequest } from "types/user";
import formRules from "utils/formRules";

const formData: FormData<AuthUserRequest> = [
  {
    key: "email",
    type: Input,
    typeProps: {
      placeholder: "Email",
    },
    formItemProps: {
      rules: [formRules.email()],
    },
  },
  {
    key: "password",
    type: Input.Password,
    typeProps: {
      placeholder: "Пароль",
    },
  },
];

export default formData;
