import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.ts";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants.ts";
import React from "react";

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center justify-center m-[50px auto] p-5 rounded-md shadow-md m-w-[400px]">
      <h1 className="bg-black">{name}</h1>
      <input
        type="text"
        className="form-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        className="form-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {loading && <div>Loading...</div>}
      <button className="form-button" type="submit">
        {name}
      </button>
    </form>
  );
};

export default AuthForm;
