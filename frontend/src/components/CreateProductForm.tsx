import React, { useState } from "react";
import api from "../api";

const CreateProductForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | string>("");

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

    } catch (error) {
      console.error("Erro ao criar o produto:", error);
      alert("Erro ao criar o produto. Por favor, tente novamente.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-4 px-8"
    >
      <h2 className="font-bold mb-4 text-xl">Adicionar Novo Produto</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nome</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:primary"
          placeholder="Nome do produto"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 font-medium mb-2">Preço</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:primary"
          placeholder="Preço do produto"
        />
      </div>
      <button
        type="submit"
        className="bg-primary-dark text-white py-2 rounded-lg hover:bg-primary-dark"
      >
        Criar Produto
      </button>
    </form>
  );
};

export default CreateProductForm;
