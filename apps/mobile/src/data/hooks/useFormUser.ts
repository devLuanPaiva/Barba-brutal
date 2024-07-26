import { useState } from "react";
import useUser from "./useUser";

export default function useFormUser() {
  const { login } = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", phone: "" });

  function validate() {
    let errors: any = {};

    if (!name) {
      errors.name = "Nome é obrigatório";
    }
    if (!email) {
      errors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "E-mail inválido";
    }
    if (!phone) {
      errors.phone = "Telefone é obrigatório";
    } else if (!/^\d{10,11}$/.test(phone)) {
      errors.phone = "Telefone deve ter 10 ou 11 dígitos";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function register() {
    if (validate()) {
      await login({ name, email, phone });
    }
  }

  return {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    errors,
    register,
  };
}
