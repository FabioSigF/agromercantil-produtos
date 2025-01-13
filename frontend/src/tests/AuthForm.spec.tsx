import '@testing-library/jest-dom';

import { render, screen } from "@testing-library/react";
import AuthForm from "../components/AuthForm";  // Caminho para o seu componente

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("AuthForm Component", () => {
  let mockNavigate: jest.Mock;

  beforeEach(() => {
    mockNavigate = jest.fn();
    jest.clearAllMocks();
  });

  test("should render login form correctly", () => {
    render(
        <AuthForm route="/login" method="login" />
    );

    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getAllByText("Login")).toHaveLength(2);
  });

  test("should render register form correctly", () => {
    render(
        <AuthForm route="/register" method="register" />
    );

    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  
  expect(screen.getAllByText("Register")).toHaveLength(2);
  });
  
});
