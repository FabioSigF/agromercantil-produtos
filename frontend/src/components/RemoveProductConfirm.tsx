import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api";
import { closeRemoveProductModal } from "../redux/modal/slice";
import { RootState } from "../redux/store";

interface RemoveProductConfirmProps {
  onProductRemoved: () => void;
}

const RemoveProductConfirm: React.FC<RemoveProductConfirmProps> = ({
  onProductRemoved,
}) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const productId = useSelector(
    (state: RootState) => state.modal.removeProductId
  );

  useEffect(() => {
    if (productId) {
      api
        .get(`products/${productId}/`)
        .then((res) => {
          const product = res.data;
          setName(product.name);
        })
        .catch((error) => {
          console.error("Erro ao buscar os dados do produto:", error);
        });
    }
  }, [productId]);

  const handleConfirm = async () => {
    try {
      await api.delete(`/products/delete/${productId}/`);

      // Atualiza produtos
      onProductRemoved();

      // Fecha modal
      dispatch(closeRemoveProductModal());
    } catch (error) {
      console.error("Erro ao remover o produto:", error);
      alert("Erro ao remover o produto. Por favor, tente novamente.");
    }
  };

  const handleCancel = () => {
    dispatch(closeRemoveProductModal());
  };

  return (
    <div className="bg-white p-6 rounded-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Confirmar Exclusão</h2>
      <p className="mb-6">
        Tem certeza de que deseja excluir o produto <strong>{name}</strong>? Esta ação não pode
        ser desfeita.
      </p>
      <div className="flex justify-end gap-4">
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
        >
          Cancelar
        </button>
        <button
          onClick={handleConfirm}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default RemoveProductConfirm;
