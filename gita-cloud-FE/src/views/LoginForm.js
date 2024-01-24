import React, { useEffect, useState } from "react";
import { TextField, Button, Box, styled, Dialog, DialogContent, Grid, Typography, Divider, InputAdornment, IconButton } from "@mui/material";
import BACKGROUND from '../assets/backgroung_image.jpg'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "../redux/store";
import { useHistory } from "react-router";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { login } from "../redux/slices/user";


const MainContainer = styled(Box)({
  backgroundImage: `url("${BACKGROUND}")`,
  height: "100vh",
  backgroundSize: 'cover',
});

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('email is Required'),
  password: Yup.string().min(7, 'Password must be at least 7 characters').required('password is Required'),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);


  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };



  useEffect(() => {
    localStorage.removeItem("token")
  }, [])



  const onSubmit = (values) => {
    const data = {
      email: values.email,
      password: values.password,
    }
    dispatch(login(data, history));
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      onSubmit(values)
    },
  });

  const hasError = (fieldName) => formik.touched[fieldName] && Boolean(formik.errors[fieldName]);

  const onClickRedirect = () => {
    history.push("/register")
  }

  return (
    <MainContainer>
      <Dialog open={true} maxWidth={"sm"} fullWidth
        PaperProps={{
          style: { borderRadius: 10 }
        }}
        hideBackdrop
      >
        <DialogContent>
          <Box component={"form"} onSubmit={formik.handleSubmit}>
            <Grid container spacing={3} justifyContent={"center"}>
              <Grid item>
                <Typography variant="h4">Login Form</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  error={hasError('email')}
                  helperText={
                    hasError('email') ? formik.errors.email : null
                  }
                  type="email"
                  label="Email"
                  name="email"
                  value={formik.values.email || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  error={hasError('password')}
                  helperText={
                    hasError('password') ? formik.errors.password : null
                  }
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formik.values.password || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2, mb: 2 }}>
              <Grid container spacing={3} justifyContent={"center"}>
                <Grid item xs={6}>
                  <Divider>OR</Divider>
                </Grid>
              </Grid>
            </Box>
            <Grid container spacing={3} justifyContent={"center"}>
              <Grid item xs={6}>
                <Button type="button" variant="contained" color="primary" fullWidth onClick={() => onClickRedirect()}>sign Up</Button>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </MainContainer>
  );
};

export default LoginForm;
