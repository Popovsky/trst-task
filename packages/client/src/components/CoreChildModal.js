import React, {useMemo, useState} from 'react';
import {useSelector} from "react-redux";
import {Avatar, Box, Button, Modal} from "@mui/material";
import {KeyboardArrowDown, KeyboardArrowUp} from "@mui/icons-material";
import {modal, size} from "../styles/index.style";

export const CoreChildModal = ({
  selectedProduct,
}) => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const productList = useSelector(state => state.product.list);
  const selectedProductIndex = productList.findIndex((item) => item.id === selectedProduct.id);
  const nextNeighbors = useMemo(() => productList.slice(selectedProductIndex), [productList, selectedProductIndex]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleMoveUp = () => {
    nextNeighbors.splice(currentIndex, 1);
    setCurrentIndex(currentIndex - 1);
    nextNeighbors.splice(currentIndex - 1, 0, selectedProduct);
  };
  const handleMoveDown = () => {
    nextNeighbors.splice(currentIndex, 1);
    setCurrentIndex(currentIndex + 1);
    nextNeighbors.splice(currentIndex + 1, 0, selectedProduct);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>Show neighbors</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box display='flex' justifyContent='space-between' sx={{...modal, width: 200}}>
          <Box display='flex' flexDirection='column'>
            <Button variant="outlined" onClick={handleMoveUp} disabled={currentIndex === 0}><KeyboardArrowUp/></Button>
            <Button variant="outlined" onClick={handleMoveDown} disabled={currentIndex >= nextNeighbors.length - 1}><KeyboardArrowDown/></Button>
            <Button variant="outlined" onClick={handleClose}>Close</Button>
          </Box>
          <Box display='flex' flexDirection='column'>
            {nextNeighbors.map(item => (
              <Avatar
                key={item.id}
                sx={selectedProduct.id === item.id ? {...size, border: '2px solid red'} : size}
                alt="alt"
                src={`data:image/png;base64, ${item.image}`}
              />
            ))}
          </Box>
        </Box>
      </Modal>
    </>
  );
};
