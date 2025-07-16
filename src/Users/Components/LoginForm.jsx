// src/Users/Components/LoginForm.jsx

import React from "react";
import Form from "../../Forms/Components/Form";
import Input from "../../Forms/Components/Input";
import { Box } from "@mui/material";
import theme from "../../Styles/theme";

export default function LoginForm({
  data,
  errors,
  onInputChange,
  onSubmit,
  onReset,
  validateForm,
  handleKeyPress,
}) {
  return (
    <Form
      title="Login"
      styles={{
        maxWidth: "450px",
        margin: "0 auto",
        padding: "24px",
        backgroundColor: theme.colors.background,
        borderRadius: "8px",
      }}
      onSubmit={onSubmit}
      onReset={onReset}
      validateForm={validateForm}
    >
      <Box sx={{ display: "grid", gap: 2 }}>
        <Input
          name="email"
          label="Email"
          type="email"
          error={errors.email}
          onChange={onInputChange}
          data={data}
          onKeyPress={handleKeyPress}
          fullWidth
        />
        <Input
          name="password"
          label="Password"
          type="password"
          error={errors.password}
          onChange={onInputChange}
          data={data}
          onKeyPress={handleKeyPress}
          fullWidth
        />
      </Box>
    </Form>
  );
}
