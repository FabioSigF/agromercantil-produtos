import React, { useState } from "react";
import api from "../api";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { closeCreateProductModal } from "../redux/modal/slice";

interface CreateProductFormProps {
  onProductCreated: () => void;
}

const CreateProductForm: React.FC<CreateProductFormProps> = ({
  onProductCreated,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await api.post("products/create/", {
        name,
        price: Number(price),
      });

      console.log("Produto criado com sucesso:", response.data);

      // Limpa os campos
      setName("");
      setPrice("");

      // Atualiza produtos
      onProductCreated();

      // Fecha modal
      dispatch(closeCreateProductModal());
    } catch (error) {
      console.error("Erro ao criar o produto:", error);
      alert("Erro ao criar o produto. Por favor, tente novamente.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg w-full max-w-md"
    >
      <h2 className="text-xl font-bold mb-4">Adicionar Novo Produto</h2>
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
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Preço do produto"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Criar Produto
      </button>
    </form>
  );
};

export default CreateProductForm;
