import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  openCreateProductModal,
  openEditProductModal,
  openRemoveProductModal,
} from "../redux/modal/slice";
import { Product } from "../types/product";
// React Window - Performance optimization
import { FixedSizeList } from "react-window";
import api from "../api";

const ProductsTable: React.FC<{ products: Product[] }> = ({ products }) => {
  const dispatch: AppDispatch = useDispatch();

  const handleEdit = (id: number) => {
    dispatch(openEditProductModal(id));
  };

  const handleRemove = async (id: number) => {
    try {
      await api.delete(`/products/delete/${id}/`);
    } catch (error) {
      console.error("Erro ao remover o produto:", error);
      alert("Erro ao remover o produto. Por favor, tente novamente.");
    }
  };

  // Renderiza cada linha da tabela
  const renderRow = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const product = products[index];
    return (
      <div
        style={style}
        className="flex flex-row items-center justify-between border px-4 py-2 min-w-full"
      >
        <div className="w-full sm:w-1/3 py-1 text-left break-words">
          {product.name}
        </div>
        <div className="w-full sm:w-1/3 py-1 text-left">
          R$ {product.price.toFixed(2)}
        </div>
        <div className="w-full sm:w-1/3 flex gap-2 justify-center">
          <button
            onClick={() => handleEdit(product.id)}
            className="mb-2 sm:mb-0 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
          >
            Editar
          </button>
          <button
            onClick={() => handleRemove(product.id)}
            data-testid={`remove-button-${product.id}`}
            className="mb-2 sm:mb-0 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Remover
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-6">Lista de Produtos</h1>
      <div className="overflow-x-hidden">
        <div className="min-w-[540px] border border-gray-300 rounded-lg">
          <div className="bg-gray-100 flex">
            <div className="w-1/3 border px-4 py-2 text-left">Nome</div>
            <div className="w-1/3 border px-4 py-2 text-left">Preço</div>
            <div className="w-1/3 border px-4 py-2 text-center">Ações</div>
          </div>
          <div className="w-full h-[50vh] overflow-hidden">
            <FixedSizeList
              height={400}
              itemCount={products.length}
              itemSize={56}
              width="100%"
            >
              {renderRow}
            </FixedSizeList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
