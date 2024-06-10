import React from 'react';
import {Box, Button, Modal, TextField} from "@mui/material";
import {
  flexCenter,
  imageContainer,
  modal,
  previewImageSize,
  uploadIcon,
  VisuallyHiddenInput
} from "../styles/index.style";
import {Controller, useFormContext} from "react-hook-form";
import {CloudUpload} from "@mui/icons-material";
import {CoreChildModal} from "./CoreChildModal";
import {useFormValues} from "../hooks";
import {isEqual, omit} from "lodash";
import {Buffer} from "buffer";

export const CoreModal = ({
  open,
  selectedProduct,
  handleClose,
  handleDelete,
  onSubmit,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext();
  const formValues = useFormValues();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        sx={modal}
        display="flex"
        flexDirection="column"
        gap={2}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <Box display="flex" gap={2}>
          <Box>
            <Button
              sx={{
                ...flexCenter,
                ...imageContainer,
              }}
              component="label"
              variant="contained"
              startIcon={selectedProduct
                ? <Box component="img" sx={previewImageSize} alt="alt" src={`data:image/png;base64, ${new Buffer.from(selectedProduct.image.buffer, 'base64').toString('base64')}`}/>
                : <CloudUpload style={uploadIcon}/>}
            >
              <VisuallyHiddenInput
                type="file"
                error={!!errors.image}
                name="image"
                label="Image"
                {...register('image')}
              />
            </Button>
          </Box>
          <Box display="flex" flexDirection="column" gap={2}>
            <Controller
              control={control}
              name="name"
              render={({field: { onChange, value }}) => (
                <TextField
                  error={!!errors.name}
                  name="name"
                  label="Name"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="type"
              render={({field: { onChange, value }}) => (
                <TextField
                  error={!!errors.type}
                  name="type"
                  label="Type"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Box>
        </Box>
        <Box sx={flexCenter} gap={1}>
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          {selectedProduct && <Button variant="outlined" color="error" onClick={() => handleDelete(selectedProduct.id)}>Delete</Button>}
          {selectedProduct && <CoreChildModal selectedProduct={selectedProduct}/>}
          <Button variant="contained" type="submit" disabled={isEqual(formValues, omit(selectedProduct, ['id', 'createdAt', 'updatedAt']))}>Save changes</Button>
        </Box>
      </Box>
    </Modal>
  );
};
