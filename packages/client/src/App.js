import React, {useEffect, useMemo, useState} from 'react';
import {useQuery} from "react-query";
import {FormProvider, useForm} from "react-hook-form";
import * as yup from "yup";
import {Buffer} from 'buffer';
import { yupResolver } from "@hookform/resolvers/yup";
import {Avatar, Box, Button} from "@mui/material";
import {flexCenter, flexColumnCenter, size, wrapper} from "./styles/index.style";
import {createProduct, deleteProduct, getProducts, updateProduct} from "./api";
import {useDispatch, useSelector} from "react-redux";
import {resetState} from "./reducers/productReducer";
import {CoreModal} from "./components/CoreModal";
import {toArrayBuffer} from "./utils";
import {useFormValues} from "./hooks";

const schema = yup
  .object({
    name: yup.string().required(),
    type: yup.string().required(),
  })
  .required();

const App = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {data} = useQuery('products', getProducts);
  const dispatch = useDispatch();
  const productList = useSelector(state => state.product.list);
  const products = useMemo(() => data?.data?.data, [data]);
  const methods = useForm({
    defaultValues: {
      name: '',
      type: '',
      image: '',
    },
    resolver: yupResolver(schema),
  });

  const {
    reset,
    setValue,
  } = methods;

  useEffect(() => {
    dispatch(resetState(products))
  }, [dispatch, products]);

  const handleShowModal = () => setIsShowModal(true);
  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsShowModal(false);
    reset();
  };
  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    const data = await getProducts();
    dispatch(resetState(data?.data?.data));
    handleCloseModal();
  }
  const handleGetProductDetails = (vegInfo) => {
    setSelectedProduct(vegInfo);
    handleShowModal();
    setValue('name', vegInfo.name);
    setValue('type', vegInfo.type);
    setValue('image', vegInfo.image);
  }
  const handleUpdateProduct = async (vegInfo) => {
    const file = vegInfo.image[0] || toArrayBuffer(vegInfo.image.buffer.data)
    const formData = new FormData();
    formData.append("name", vegInfo.name);
    formData.append("type", vegInfo.type);
    formData.append("image", file);
    await updateProduct(selectedProduct.id, formData);
    const data = await getProducts();
    dispatch(resetState(data?.data?.data));
    handleCloseModal();
  };
  const handleCreateProduct = async (vegInfo) => {
    const formData = new FormData();
    formData.append("name", vegInfo.name);
    formData.append("type", vegInfo.type);
    formData.append("image", vegInfo.image[0]);
    await createProduct(formData);
    const data = await getProducts();
    dispatch(resetState(data?.data?.data));
    handleCloseModal();
  };
  const separateProductList = () => {
    const upArray = [];
    const downArray = [];
    productList.map((item, index) => {
      if (index % 2) {
        downArray.push(item);
      } else {
        upArray.push(item);
      }
    });

    return [upArray, downArray];
  }

  return (
    <Box sx={{...flexColumnCenter, height: '100vh'}} gap={1}>
      {!!productList.length && <Button variant="contained" onClick={handleShowModal}>Add product</Button>}
      <Box sx={wrapper} display='flex' flexDirection='column' justifyContent='space-between'>
        {productList?.length > 0
          ? separateProductList().map((array, index) => (
              <Box key={index} display='flex' flexDirection={index % 2 ? 'row-reverse' : 'row'} justifyContent='space-between'>{array.map(veg => {
                const base64String = new Buffer.from(veg.image.buffer, 'base64').toString('base64')
                return (
                  <Button
                    key={veg.id}
                    display='flex'
                    sx={{...size, borderRadius: '50%'}}
                    onClick={() => handleGetProductDetails(veg)}
                  >
                    <Avatar sx={size} alt="alt" src={`data:image/png;base64, ${base64String}`}/>
                  </Button>
                );
              })}</Box>
            ))
          : <Box sx={{...flexCenter, height: '100%'}}>
            <Button variant="contained" onClick={handleShowModal}>Add product</Button>
          </Box>}
      </Box>
      <FormProvider {...methods}>
        <CoreModal
          open={isShowModal}
          selectedProduct={selectedProduct}
          onSubmit={selectedProduct ? handleUpdateProduct : handleCreateProduct}
          handleClose={handleCloseModal}
          handleDelete={handleDeleteProduct}
        />
      </FormProvider>
    </Box>
  );
}

export default App;
