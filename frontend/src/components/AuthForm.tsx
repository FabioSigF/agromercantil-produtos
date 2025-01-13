import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import React from "react";
import LoadingIndicator from "./LoadingIndicator";

interface AuthFormProps {
  route: string;
  method: "login" | "register";
}

const AuthForm: React.FC<AuthFormProps> = ({ route, method }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 items-center justify-center max-w-[400px] mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <h1 className="text-2xl font-bold mb-6">{name}</h1>
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {loading && <LoadingIndicator />}
      <button
        className="w-full py-2 mt-4 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
        type="submit"
      >
        {name}
      </button>
      {method === "login" ? (
        <p className="pt-8">
          Não possui uma conta?{" "}
          <Link to="/register" className="font-bold text-primary">
            Registre-se
          </Link>
        </p>
      ) : (
        <p className="pt-8">
          Já possui uma conta?{" "}
          <Link to="/login" className="font-bold text-primary">
            Login
          </Link>
        </p>
      )}
    </form>
  );
};

export default AuthForm;
