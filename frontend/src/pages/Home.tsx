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
  closeEditProductModal,
} from "../redux/modal/slice";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const [products, setProducts] = useState([]);
  const {
    editProductModalOpen,
  } = useSelector((state: RootState) => state.modal);
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
      <h1 className="text-2xl font-bold mb-6 p-8">
        Commodities Agrícolas - AgroMercantil
      </h1>
      <CreateProductForm />
      <ProductsTable products={products} />

      <Modal
        isOpen={editProductModalOpen}
        onClose={() => dispatch(closeEditProductModal())}
      >
        <EditProductForm onProductUpdated={getProducts} />
      </Modal>
    </div>
  );
}

export default Home;
