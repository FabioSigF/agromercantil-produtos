import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  openCreateProductModal,
  openEditProductModal,
  openRemoveProductModal,
} from "../redux/modal/slice";

const ProductsTable = ({ products }) => {
  const dispatch: AppDispatch = useDispatch();

  const handleAddProduct = () => {
    dispatch(openCreateProductModal());
  };

  const handleEdit = (id: number) => {
    dispatch(openEditProductModal(id));
  };

  const handleRemove = (id: number) => {
    dispatch(openRemoveProductModal(id));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Lista de Produtos - Commodities Agrícolas
      </h1>
      <button
        onClick={handleAddProduct}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
      >
        Adicionar Produto
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Nome</th>
              <th className="border px-4 py-2 text-left">Preço</th>
              <th className="border px-4 py-2 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="odd:bg-white even:bg-gray-50">
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">
                  R$ {product.price.toFixed(2)}
                </td>
                <td className="border px-4 py-2 text-center flex flex-col sm:flex-row items-center gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="px-3 py-1  bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;
