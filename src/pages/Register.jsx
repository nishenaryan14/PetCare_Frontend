import React, { Suspense } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LazyImage = React.lazy(() => import("../components/LazyImage"));

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        PawFul
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Register() {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Suspense fallback={<div>Loading...</div>}>
          <LazyImage
            src="https://media.istockphoto.com/id/1693489574/photo/shiba-inu-dog-walking.webp?b=1&s=170667a&w=0&k=20&c=IsJ6JvBAUozQmHFu5KY4K50jvax6yq5Z8C9veLk3qUU="
            alt="Shiba Inu Dog Walking"
          />
        </Suspense>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{ height: "100%", overflowY: "scroll" }}
        >
          <Box
            sx={{
              my: 3,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    const response = await axios.post(
                      // "http://192.168.38.17:8000/signup/",
                      "https://petcare-backend-eu7a.onrender.com/signup/",
                      {
                        name: values.name,
                        email: values.email,
                        password: values.password,
                      }
                    );
                    console.log("Registration successful:", response.data);
                    navigate("/login");
                  } catch (error) {
                    console.error("Registration error:", error);
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <Field
                      as={TextField}
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      autoComplete="name"
                      autoFocus
                      error={touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                    />
                    <Field
                      as={TextField}
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      error={touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                    <Field
                      as={TextField}
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      error={touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                    />
                    <Field
                      as={TextField}
                      margin="normal"
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      autoComplete="confirm-password"
                      error={
                        touched.confirmPassword && !!errors.confirmPassword
                      }
                      helperText={
                        touched.confirmPassword && errors.confirmPassword
                      }
                    />
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign Up
                    </Button>
                    <Grid container>
                      <Grid item>
                        <Link href="/login" variant="body2">
                          {"Already have an account? Sign in"}
                        </Link>
                      </Grid>
                    </Grid>
                    <Copyright sx={{ mt: 5 }} />
                  </Form>
                )}
              </Formik>
            </Suspense>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
