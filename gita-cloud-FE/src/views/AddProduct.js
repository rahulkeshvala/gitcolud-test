import React, { useEffect } from "react";
import { TextField, Button, Box, styled, Grid, Typography, FormControl, Select, MenuItem, InputLabel, FormHelperText, Container, Card } from "@mui/material";
import BACKGROUND from '../assets/backgroung_image.jpg'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "../redux/store";
import { useHistory, useParams } from "react-router";
import { addProduct, updateProduct } from "../redux/slices/products";

const MainContainer = styled(Box)({
  backgroundImage: `url("${BACKGROUND}")`,
  height: "100vh",
  backgroundSize: 'cover',
  "& .main-card": {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const validationSchema = Yup.object().shape({
  name: Yup.string().required('name is required'),
  description: Yup.string().required('description is required'),
  price: Yup.string().required('price is Required'),
  category: Yup.string().required('category is Required'),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const { id } = useParams();
  const { products } = useSelector((state) => state.products);

  const onSubmit = (values) => {
    const data = {
      name: values.name,
      price: values.price,
      description: values.description,
      category: values.category,
    }
    dispatch(addProduct(data, history));
  };

  const onupdate = (values) => {
    const data = {
      name: values.name,
      price: values.price,
      description: values.description,
      category: values.category,
    }
    dispatch(updateProduct(data, id, history));
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      price: '',
      description: '',
      category: ""
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      if (id) {
        onupdate(values)
      } else {
        onSubmit(values)
      }
    },
  });

  useEffect(() => {
    if (id) {
      let tmpdata = products.find((obj) => obj._id === id);
      formik.setFieldValue('name', tmpdata.name);
      formik.setFieldValue('price', tmpdata.price);
      formik.setFieldValue('category', tmpdata.category);
      formik.setFieldValue('description', tmpdata.description);
    }
    // eslint-disable-next-line
  }, [id]);

  const hasError = (fieldName) => formik.touched[fieldName] && Boolean(formik.errors[fieldName]);

  return (
    <MainContainer>
      <Box className="main-card">
        <Container maxWidth="sm">
          <Card sx={{ p: 2 }} elevation={0}>
            <Box component={"form"} onSubmit={formik.handleSubmit}>
              <Grid container spacing={3} justifyContent={"center"} sx={{ mb: 2 }}>
                <Grid item>
                  <Typography variant="h4">Add Product</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent={"center"}>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    fullWidth
                    error={hasError('name')}
                    helperText={
                      hasError('name') ? formik.errors.name : null
                    }
                    type="text"
                    label="Product Name"
                    name="name"
                    value={formik.values.name || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    error={hasError('price')}
                    helperText={
                      hasError('price') ? formik.errors.price : null
                    }
                    type="price"
                    label="Product Price"
                    name="price"
                    value={formik.values.price || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth error={hasError('category')}>
                    <InputLabel id="demo-simple-select-label">Product Category</InputLabel>
                    <Select
                      name="category"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formik.values.category}
                      error={hasError('category')}
                      label="Product Category"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <MenuItem value="">Please Select</MenuItem>
                      <MenuItem value="Fashion">Fashion</MenuItem>
                      <MenuItem value="Clothes">Clothes</MenuItem>
                      <MenuItem value="Shoes">Shoes</MenuItem>
                      <MenuItem value="Jwellary">Jwellary</MenuItem>
                    </Select>
                    <FormHelperText>{hasError('category') ? formik.errors.category : null}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    error={hasError('description')}
                    helperText={
                      hasError('description') ? formik.errors.description : null
                    }
                    type="text"
                    label="Description"
                    name="description"
                    value={formik.values.description || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>{id ? "Update" : "Add"}</Button>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Container>
      </Box>
    </MainContainer>
  );
};

export default AddProduct;
