import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateProductForm from "../components/CreateProductForm";
import api from "../api";
import "@testing-library/jest-dom";
// Mockando a API
jest.mock("../api");

describe("CreateProductForm", () => {

  it("não deve permitir a criação sem nome e preço", async () => {
    render(<CreateProductForm />);

    const submitButton = screen.getByRole("button", { name: /criar produto/i });

    fireEvent.click(submitButton);

    // Verifica se a API não foi chamada
    expect(api.post).not.toHaveBeenCalled();
  });

  it("deve chamar a função de criação de produto com dados válidos", async () => {
    const responseData = { data: { id: 1, name: "Produto Teste", price: 100 } };

    (api.post as jest.Mock).mockResolvedValueOnce(responseData);

    render(<CreateProductForm />);

    // Preenche os campos
    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: "Produto Teste" } });
    fireEvent.change(screen.getByLabelText(/preço/i), { target: { value: "100" } });

    const submitButton = screen.getByRole("button", { name: /criar produto/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      // Verifica se a API foi chamada com os dados corretos
      expect(api.post).toHaveBeenCalledWith("products/create/", {
        name: "Produto Teste",
        price: 100,
      });

      // Verifica se os campos foram limpos
      expect((screen.getByLabelText(/nome/i) as HTMLInputElement).value).toBe("");
      expect((screen.getByLabelText(/preço/i) as HTMLInputElement).value).toBe("");
    });
  });

});
