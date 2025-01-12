import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  createProductModalOpen: boolean;
  editProductModalOpen: boolean;
  editProductId: number | null;
  removeProductModalOpen: boolean;
  removeProductId: number | null;
}

const initialState: ModalState = {
  createProductModalOpen: false,
  editProductModalOpen: false,
  editProductId: null,
  removeProductModalOpen: false,
  removeProductId: null
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openCreateProductModal(state) {
      state.createProductModalOpen = true;
    },
    closeCreateProductModal(state) {
      state.createProductModalOpen = false;
    },
    openEditProductModal(state, action: PayloadAction<number>) {
      state.editProductModalOpen = true;
      state.editProductId = action.payload;
    },
    closeEditProductModal(state) {
      state.editProductModalOpen = false;
      state.editProductId = null;
    },
    openRemoveProductModal(state, action: PayloadAction<number>) {
      state.removeProductModalOpen = true;
      state.removeProductId = action.payload;
    },
    closeRemoveProductModal(state) {
      state.removeProductModalOpen = false;
      state.removeProductId = null;
    },
  },
});

export const {
  openCreateProductModal,
  closeCreateProductModal,
  openEditProductModal,
  closeEditProductModal,
  openRemoveProductModal,
  closeRemoveProductModal
} = modalSlice.actions;

export default modalSlice.reducer;
