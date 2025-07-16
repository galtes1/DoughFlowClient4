
import React from "react";
import Form from "../../Forms/Components/Form";
import ROUTES from "../../Routes/routesModel";
import Input from "../../Forms/Components/Input";
import {
  Box,
  FormControlLabel,
  Checkbox,
  Typography
} from "@mui/material";
import AvatarSelector from "./AvatarSelector";
import theme from "../../Styles/theme"; 

const SignupForm = React.memo(({
  title,
  onSubmit,
  onReset,
  validateForm,
  errors,
  data,
  onInputChange,
  handleChangeCheckBox,
  selectedAvatar,
  onAvatarSelect,
}) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") onSubmit();
  };

  return (
    <Form
      title={title}
      onSubmit={onSubmit}
      onReset={onReset}
      errors={errors}
      validateForm={validateForm}
      styles={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "24px",
        backgroundColor: theme.colors.background,
        borderRadius: "8px",
      }}
      to={ROUTES.ROOT}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
        }}
      >
        <Input
          name="name"
          label="Name"
          error={errors.name}
          onChange={onInputChange}
          data={data}
          fullWidth
          onKeyPress={handleKeyPress}
        />
        <Input
          name="email"
          label="Email"
          type="email"
          error={errors.email}
          onChange={onInputChange}
          data={data}
          fullWidth
          onKeyPress={handleKeyPress}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          error={errors.password}
          onChange={onInputChange}
          data={data}
          fullWidth
          onKeyPress={handleKeyPress}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={data.isBusiness}
              onChange={handleChangeCheckBox}
              name="isBusiness"
              sx={{
                color: theme.colors.primary,
                "&.Mui-checked": { color: theme.colors.primary },
              }}
            />
          }
          label="Signup as business"
        />
      </Box>

      <Box sx={{ mt: 10, textAlign: "left" }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: theme.fonts.main,
            color: theme.colors.text,
            mb: 1,
          }}
        >
          Choose profile picture
        </Typography>
        <AvatarSelector
          selectedAvatar={selectedAvatar}
          onSelect={onAvatarSelect}
        />
      </Box>
    </Form>
  );
});

export default SignupForm;

