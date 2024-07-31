import {
    createSlice,
    createAsyncThunk,
    createAction
} from "@reduxjs/toolkit";
import orderService from "../order/orderService";

export const getAllOrder = createAsyncThunk(
    "order/get-Order",
    async (thunkAPI) => {
        try {
            return await orderService.getOrders();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const getACoupon = createAsyncThunk(
  "coupon/get-coupon",
  async (id, thunkAPI) => {
    try {
      return await orderService.getCoupon(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const updateAOrder = createAsyncThunk(
  "orders/update-oredr",
  async (order, thunkAPI) => {
    try {
      return await orderService.updateOrder(order);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
    orders: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrder.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllOrder.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.orders = action.payload;
        })
        .addCase(getAllOrder.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(getACoupon.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getACoupon.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.couponName = action.payload[0].name;
          state.couponDiscount = action.payload[0].discount;
          state.couponExpiry = action.payload[0].expiry;
        })
        .addCase(getACoupon.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(updateAOrder.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateAOrder.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.updatedStatus = action.payload
        })
        .addCase(updateAOrder.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
      .addCase(resetState, () => initialState);
  },
});

export default orderSlice.reducer;