import { createSlice } from '@reduxjs/toolkit';
import {orderBy} from "lodash";

const initialState = {
  list: []
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetState: (state, action) => {
      if (action.payload) {
        state.list = orderBy(action.payload, ['createdAt'], ['asc']).map(item => ({...item, image: JSON.parse(item.image)}))
      }
    },
  },
})

export const {
  resetState,
} = productSlice.actions

export default productSlice.reducer
