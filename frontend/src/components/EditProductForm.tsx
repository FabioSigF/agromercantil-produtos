import React, { useEffect, useState } from "react";
import { Product } from "../types/product";
import api from "../api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { closeEditProductModal } from "../redux/modal/slice";

interface EditProductFormProps {
  onProductUpdated: () => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({
  onProductUpdated,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const dispatch: AppDispatch = useDispatch();

  const productId = useSelector(
    (state: RootState) => state.modal.editProductId
  );

  useEffect(() => {
    if (productId) {
      api
        .get(`products/${productId}/`)
        .then((res) => {
          const product = res.data;
          setName(product.name);
          setPrice(product.price);
          console.log("produtos editados");
        })
        .catch((error) => {
          console.error("Erro ao buscar os dados do produto:", error);
        });
    }
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!name || !price) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
  
    try {
      const response = await api.put(`products/update/${productId}/`, {
        name,
        price: Number(price),
      });
  
      console.log("Produto atualizado com sucesso:", response.data);
  
      // Reseta campos
      setName("");
      setPrice(0);
  
      // Atualiza produtos
      onProductUpdated();
  
      // Fecha modal
      dispatch(closeEditProductModal());
    } catch (error) {
      console.error("Erro ao atualizar o produto:", error);
      alert("Erro ao atualizar o produto. Por favor, tente novamente.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg w-full max-w-md"
    >
      <h2 className="text-xl font-bold mb-4">Editar Produto</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Nome</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nome do produto"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Preço</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Preço do produto"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-green-700"
      >
        Editar Produto
      </button>
    </form>
  );
};

export default EditProductForm;
