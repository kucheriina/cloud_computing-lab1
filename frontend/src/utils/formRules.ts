import { FormInstance } from "antd";
import { Rule, RuleObject } from "antd/lib/form";

const required = (message: string | undefined = "Обязательное поле") => ({ required: true, message });
const requiredBool = (message: string | undefined = "Обязательное поле") => ({
  validator: async (_: RuleObject, checked: boolean) => (!checked ? Promise.reject(new Error(message)) : undefined),
});

const inputNumberValidation = (min: number | undefined = 0) => ({ min });

const isInteger = (message: string = "Число должно быть целочисленным") => ({
  validator: async (_: RuleObject, number: string) =>
    number && !Number.isInteger(number) ? Promise.reject(new Error(message)) : undefined,
});

const email = (required: boolean = true, message: string | undefined = "Email не удовлетворяет стандарту"): Rule => ({
  type: "email",
  message,
  required,
});

export const password = (length: number = 8): Rule => ({
  validator(_, value) {
    if (value.length >= length) {
      return Promise.resolve();
    }

    return Promise.reject(
      new Error(`Пароль должен содержать не менее ${length} ${length === 1 ? "символа" : "символов"}`)
    );
  },
});

export const passwordConfirm = <T extends object>(form: FormInstance<T>, field: string = "password"): Rule => ({
  validator(_, value) {
    if (!value || form.getFieldValue(field) === value) {
      return Promise.resolve();
    }

    return Promise.reject(new Error("Пароли не совпадают"));
  },
});

const formRules = { required, requiredBool, inputNumberValidation, isInteger, email, password, passwordConfirm };
export default formRules;
