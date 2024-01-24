import { Box, Button, Dialog, DialogContent, Grid, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'

const DeleteModel = (props) => {
    const { title, open, onClose, onClick } = props;
    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            open={open}
        >
            <DialogContent sx={{
                position: "relative"
            }}>

                <Box sx={{
                    position: 'absolute',
                    top: 5,
                    right: 5
                }}>
                    <IconButton>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box sx={{ my: 3 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography>{title} Delete</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Are you sure want to delete this {title}.</Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Button variant='contained' color='primary' fullWidth onClick={() => onClose()}>Cancel Delete</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant='contained' color='error' fullWidth onClick={() => onClick()}>Delete {title}</Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteModel