import { useState } from "react";
import useUser from "./useUser";

export default function useFormUser() {
  const { login, register } = useUser();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  function validate() {
    let errors: any = {};

    if (!name) {
      errors.name = "Nome é obrigatório";
    }
    if (!password) {
      errors.password = "Senha é obrigatória";
    }
    if (!email) {
      errors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "E-mail inválido";
    }
    if (!phone) {
      errors.phone = "Telefone é obrigatório";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function registerUser() {
    if (validate()) {
      await register({ name, email, phone, password });
    }
  }

  async function loginUser() {
    await login({ email, password });
  }

  return {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    errors,
    registerUser,
    loginUser,
    password,
    setPassword,
  };
}
