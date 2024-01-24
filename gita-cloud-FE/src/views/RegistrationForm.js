import React, { useEffect, useState } from "react";
import { TextField, Button, Box, styled, Dialog, DialogContent, Grid, Typography, InputAdornment, IconButton } from "@mui/material";
import BACKGROUND from '../assets/backgroung_image.jpg'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "../redux/store";
import { useHistory } from "react-router";
import { register } from "../redux/slices/user";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const MainContainer = styled(Box)({
  backgroundImage: `url("${BACKGROUND}")`,
  height: "100vh",
  backgroundSize: 'cover',
});

const validationSchema = Yup.object().shape({
  name: Yup.string().required('name is required'),
  email: Yup.string().email('Invalid email address').required('email is Required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('password is Required'),
});

const RegistrationForm = () => {
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
      name: values.name,
      email: values.email,
      password: values.password,
    }
    dispatch(register(data, history));
  };

  const formik = useFormik({
    initialValues: {
      name: "",
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
    history.push("/login")
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
                <Typography variant="h4">Sign Up Form</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  error={hasError('name')}
                  helperText={
                    hasError('name') ? formik.errors.name : null
                  }
                  type="text"
                  label="Name"
                  name="name"
                  value={formik.values.name || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
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
              <Grid item xs={4}>
                <Button type="submit" variant="contained" color="primary" fullWidth>Sign Up</Button>
              </Grid>
              <Grid item xs={4}>
                <Button type="button" variant="contained" color="primary" fullWidth onClick={() => onClickRedirect()}>Login</Button>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </MainContainer>
  );
};

export default RegistrationForm;
