import { Col, ColProps, Form, FormInstance, FormItemProps, FormProps, Row, RowProps } from "antd";
import { ColumnType } from "antd/es/table";
import { ColumnGroupType } from "antd/es/table/interface";
import React, { ComponentType, ReactNode } from "react";

export type FormElement<T extends object> = (ColumnGroupType<T> | ColumnType<T>) & {
  key: keyof T;
  colProps?: ColProps;
  type?: ComponentType;
  typeProps?: object;
  formItemProps?: FormItemProps;
  order?: number;
};

export type FormData<T extends object> = FormElement<T>[];

interface FormLayoutProps<T extends object> extends FormProps<T> {
  form?: FormInstance<T>;
  formData?: FormData<T>;
  rowProps?: RowProps;
  children?: ReactNode | ReactNode[];
}

const FormLayout = <T extends object>({ formData, rowProps, children, form, ...props }: FormLayoutProps<T>) => {
  return (
    <Form form={form} {...props}>
      <Row gutter={[60, 6]} {...rowProps}>
        {formData
          ?.filter((item) => !!item?.type)
          .sort((a, b) => Number(a.order) - Number(b.order))
          .map(({ type, typeProps, formItemProps, colProps = { span: 24 }, key }) => {
            const Component = type ? type : () => <></>;

            return (
              <Col key={key} {...colProps}>
                <Form.Item name={key} {...formItemProps}>
                  <Component {...typeProps} />
                </Form.Item>
              </Col>
            );
          })}

        {children}
      </Row>
    </Form>
  );
};

export default FormLayout;
