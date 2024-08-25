import { render, screen, fireEvent } from "@testing-library/react";
import UserForm from "../../../../apps/frontend/src/components/user/UserForm";
import useUser from "../../../../apps/frontend/src/data/hooks/useUser";

// Mock do hook useUser
jest.mock("@frontend/data/hooks/useUser");
const mockedUseUser = useUser as jest.Mock;

// Descreva o teste
describe("UserForm - Register User", () => {
  const mockRegister = jest.fn();

  beforeEach(() => {
    // Configura o retorno do hook mockado
    mockedUseUser.mockReturnValue({
      user: null,
      register: mockRegister,
      login: jest.fn(),
    });
  });

  it("deve criar um novo usuário", async () => {
    // Renderiza o componente UserForm
    render(<UserForm />);

    // Alterar o modo para "register"
    fireEvent.click(screen.getByText("Ainda não tem conta? Cadastre-se!"));

    // Preencher os campos do formulário
    fireEvent.change(screen.getByPlaceholderText("Nome"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Telefone"), {
      target: { value: "1234567890" },
    });

    // Submeter o formulário
    fireEvent.click(screen.getByText("Cadastrar"));

    // Verificar se a função de registro foi chamada com os dados corretos
    expect(mockRegister).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      password: "password123",
    });
  });
});
