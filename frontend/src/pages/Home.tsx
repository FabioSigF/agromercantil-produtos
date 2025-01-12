import React, { useEffect, useState } from "react";
//Api
import api from "../api";

//Components
import ProductsTable from "../components/ProductsTable";
import Modal from "../components/Modal";
import CreateProductForm from "../components/CreateProductForm";
import EditProductForm from "../components/EditProductForm";

//Redux
import {
  closeCreateProductModal,
  closeEditProductModal,
  closeRemoveProductModal
} from "../redux/modal/slice";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import RemoveProductConfirm from "../components/RemoveProductConfirm";

function Home() {
  const [products, setProducts] = useState([]);
  const { createProductModalOpen, editProductModalOpen, removeProductModalOpen } =
  useSelector((state: RootState) => state.modal);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    api
      .get("/products/")
      .then((response) => response.data)
      .then((data) => setProducts(data))
      .catch((error) => alert(error));
  };

  return (
    <div>
      <ProductsTable products={products} />

      <Modal
        isOpen={createProductModalOpen}
        onClose={() => dispatch(closeCreateProductModal())}
      >
        <CreateProductForm onProductCreated={getProducts} />
      </Modal>
      <Modal
        isOpen={editProductModalOpen}
        onClose={() => dispatch(closeEditProductModal())}
      >
        <EditProductForm onProductUpdated={getProducts} />
      </Modal>
      <Modal
        isOpen={removeProductModalOpen}
        onClose={() => dispatch(closeRemoveProductModal())} >
          <RemoveProductConfirm onProductRemoved={getProducts}/>
      </Modal>
    </div>
  );
}

export default Home;
