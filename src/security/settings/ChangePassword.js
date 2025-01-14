import React from "react";
import { Form, Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import passwordValidationSchema from "./passwordValidationSchema";
import { changePassword } from "store/slice/change-password";
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    },
    validationSchema: passwordValidationSchema,
    onSubmit: (values) => {
      const { oldPassword, newPassword, confirmPassword } = values;
      dispatch(changePassword({ oldPassword, newPassword, confirmPassword }))
        .unwrap()
        .then(() => {
              navigate('/');

        })
        .catch((error) => {
          console.error("Error changing password:", error);
        });
    }
  });

  return (
    <div>
      <div
        style={{
          padding: "1.55rem",
          background: "#fff",
          borderBottom: "1px solid #F0F0F0"
        }}
      >
        <p
          style={{
            fontSize: "15px",
            color: "#1890ff"
          }}
        >
          <LockOutlined /> Change Password
        </p>
      </div>
      <Form
        name="change-password-form"
        onFinish={formik.handleSubmit}
        layout="vertical"
        style={{
          padding: "1rem"
        }}
      >
        <Form.Item
          label="Current Password"
          name="oldPassword"
          validateStatus={formik.errors.oldPassword && formik.touched.oldPassword ? "error" : ""}
          help={formik.errors.oldPassword && formik.touched.oldPassword && formik.errors.oldPassword}
        >
          <Input.Password {...formik.getFieldProps("oldPassword")} />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="newPassword"
          validateStatus={formik.errors.newPassword && formik.touched.newPassword ? "error" : ""}
          help={formik.errors.newPassword && formik.touched.newPassword && formik.errors.newPassword}
        >
          <Input.Password {...formik.getFieldProps("newPassword")} />
        </Form.Item>

        <Form.Item
          label="Confirm New Password"
          name="confirmPassword"
          validateStatus={formik.errors.confirmPassword && formik.touched.confirmPassword ? "error" : ""}
          help={formik.errors.confirmPassword && formik.touched.confirmPassword && formik.errors.confirmPassword}
        >
          <Input.Password {...formik.getFieldProps("confirmPassword")} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
