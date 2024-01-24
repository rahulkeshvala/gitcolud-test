import React, { useEffect, useState } from "react";
import { Box, styled, Grid, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Button, Card, Container, TablePagination, CircularProgress } from "@mui/material";
import BACKGROUND from '../assets/backgroung_image.jpg'
import { useDispatch, useSelector } from "../redux/store";
import { deleteProduct, getAllProduct } from "../redux/slices/products";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from "react-router";
import DeleteModel from "./DeleteModel";

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


const ProductList = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const { products } = useSelector((state) => state);
  const { user } = useSelector((state) => state.user);
  const [rows, setRows] = useState([])
  const [active, setActive] = useState(false)
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  console.log(user, "user");

  useEffect(() => {
    setRows(products.products)
  }, [products.products]
  )
  useEffect(() => {
    if (user.role === "admin") {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [user.role])

  const onClickRedirect = () => {
    history.push("/product/add-product")
  }

  const onClickEdit = (id) => {
    history.push(`/product/edit-product/${id}`)
  }

  const handleChangePage = (event, page) => {
    setPage(page)
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  const onClose = () => {
    setOpen(false)
    setDeleteId(null)
  }

  const onOpen = (id) => {
    setOpen(true)
    setDeleteId(id)
  }

  const onDelete = async () => {
    const response = await dispatch(deleteProduct(deleteId));
    if (response.status === "success") {
      onClose()
      dispatch(getAllProduct());
    }
  }

  const tableData = () => {
    return (
      rows.length ?
        (rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
          <TableRow
            key={row._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row._id}
            </TableCell>
            <TableCell >{row.name}</TableCell>
            <TableCell >{row.category}</TableCell>
            <TableCell >{row.description}</TableCell>
            <TableCell >{row.price}</TableCell>
            {active && <TableCell>
              <IconButton onClick={() => onClickEdit(row._id)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onOpen(row._id)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>}
          </TableRow>
        )))
        :
        (<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell align="center" colSpan={active ? 6 : 5}>No Product</TableCell>
        </TableRow>)
    )
  }


  return (
    <MainContainer>
      <Box className="main-card">
        <Container>
          <Card sx={{ p: 2 }} elevation={0}>
            <Grid container spacing={3} justifyContent={"space-between"}>
              <Grid item>
                <Typography variant="h4">User List</Typography>
              </Grid>
              <Grid item>
                <Button startIcon={<AddIcon />} variant="contained" color="primary" onClick={() => onClickRedirect()}>Add Product</Button>
              </Grid>
              <Grid item xs={12}>
                <TableContainer component={Paper} elevation={0}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell >Name</TableCell>
                        <TableCell >Category</TableCell>
                        <TableCell >Description</TableCell>
                        <TableCell >Price</TableCell>
                        {active && <TableCell >Action</TableCell>}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {products.isLoading ? (
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell align="center" colSpan={active ? 6 : 5}><CircularProgress /></TableCell>
                        </TableRow>) :
                        (
                          tableData()
                        )
                      }
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableContainer>
              </Grid>
            </Grid>
            <DeleteModel open={open} title="Product" onClose={onClose} onClick={onDelete} />
          </Card>
        </Container>
      </Box>
    </MainContainer>
  );
};

export default ProductList;
