import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useDispatch } from "react-redux";
import ProductsTable from "../components/ProductsTable";
import "@testing-library/jest-dom";
import api from "../api";

// Mock react-redux useDispatch
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

// Mock react-window components
jest.mock("react-window", () => ({
  FixedSizeList: jest.fn(({ children, itemCount, itemSize, width, height }) => (
    <div data-testid="FixedSizeList" style={{ width, height }}>
      {Array.from({ length: itemCount }).map((_, index) => (
        <div key={index} style={{ height: itemSize }}>
          {children({ index, style: {} })}
        </div>
      ))}
    </div>
  )),
}));

describe("ProductsTable", () => {
  const products = [
    { id: 1, name: "Produto 1", price: 10.0 },
    { id: 2, name: "Produto 2", price: 20.0 },
  ];

  let dispatch: jest.Mock;

  beforeEach(() => {
    dispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    
    // Mocka delete api
    jest.spyOn(api, "delete").mockResolvedValueOnce({});
  });

  it("deve renderizar a tabela e exibir os produtos corretamente", async () => {
    render(<ProductsTable products={products} />);

    await waitFor(() =>
      expect(screen.getByText("Produto 1")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText("R$ 10.00")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText("Produto 2")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText("R$ 20.00")).toBeInTheDocument()
    );
  });

  it("deve remover um produto da lista ao clicar no botão de remover", async () => {

    render(<ProductsTable products={products} />);

    expect(screen.getByText("Produto 1")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("remove-button-1"));

    await waitFor(() => {
      expect(api.delete).toHaveBeenCalledWith("/products/delete/1/");
    });

    expect(screen.queryByText("Produto 1")).not.toBeInTheDocument();
    expect(screen.getByText("Produto 2")).toBeInTheDocument();
  });
});
