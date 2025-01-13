import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  editProductModalOpen: boolean;
  editProductId: number | null;
}

const initialState: ModalState = {
  editProductModalOpen: false,
  editProductId: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openEditProductModal(state, action: PayloadAction<number>) {
      state.editProductModalOpen = true;
      state.editProductId = action.payload;
    },
    closeEditProductModal(state) {
      state.editProductModalOpen = false;
      state.editProductId = null;
    },
  },
});

export const {
  openEditProductModal,
  closeEditProductModal,
} = modalSlice.actions;

export default modalSlice.reducer;
