import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import useUser from "../data/hooks/useUser";
import useFormUser from "../data/hooks/useFormUser";
import { useEffect, useState } from "react";
import { PhoneUtils } from "@barba/core";
import { Ionicons } from "@expo/vector-icons";

export default function Register({ navigation }: any) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [mode, setMode] = useState<'access' | 'register'>('access');
  const { user } = useUser();
  const { name, setName, email, setEmail, phone, setPhone, errors, registerUser, loginUser, password, setPassword } =
    useFormUser();

  useEffect(() => {
    if (user) {
      navigation?.replace("Main");
    }
  }, [user]);
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require("../../assets/inicio/fundo.png")}
        style={styles.imagemDeFundo}
      >
        <View style={styles.conteudo}>
          <Image
            source={require("../../assets/inicio/logo-brutal.png")}
            style={styles.logo}
          />
          <Text style={styles.titulo}>🤘 DO CLASSICO AO ROCK 🤘</Text>
          <Text style={styles.descricao}>
            Cabelo afiado, barba de lenhador e mãos de motoqueiro, tudo ao som
            de rock pesado!
          </Text>
          <View style={styles.formulario}>
            {mode === 'register' && (
              <View style={styles.boxInput}>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                  style={[styles.input, errors.name ? styles.inputError : null]}
                  placeholder="Digite seu nome"
                  placeholderTextColor="#666"
                  value={name}
                  onChangeText={setName}
                />
                {errors.name ? (
                  <Text style={styles.errorText}>{errors.name}</Text>
                ) : null}
              </View>
            )}
            <View style={styles.boxInput}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={[styles.input, errors.email ? styles.inputError : null]}
                placeholder="Digite seu e-mail"
                placeholderTextColor="#666"
                value={email.toLowerCase()}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              {errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
            </View>

            <View style={styles.boxInput}>
              <Text style={styles.label}>Senha</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, errors.password ? styles.inputError : null]}
                  placeholder="Digite sua senha"
                  placeholderTextColor="#666"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                />
                <Pressable
                  style={styles.eyeButton}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Ionicons
                    name={isPasswordVisible ? 'eye-off' : 'eye'}
                    size={24}
                    color="#f3f3f3"
                  />
                </Pressable>
              </View>
              {errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}
            </View>
            {mode === 'register' && (
              <View style={styles.boxInput}>
                <Text style={styles.label}>Telefone</Text>
                <TextInput
                  style={[styles.input, errors.phone ? styles.inputError : null]}
                  placeholder="Digite seu telefone"
                  placeholderTextColor="#666"
                  value={PhoneUtils.format(phone)}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
                {errors.phone ? (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                ) : null}
              </View>
            )}
          </View>
          <Pressable style={styles.button} onPress={mode === 'access' ? loginUser : registerUser}>
            <Text style={styles.buttonText}>{mode === 'access' ? 'Entrar' : 'Cadastrar'}</Text>
          </Pressable>

          <Pressable onPress={() => setMode(mode === 'access' ? 'register' : 'access')}>
            <Text style={styles.textButton}>
              {mode === 'access' ? 'Ainda não tem conta? Cadastre-se!' : 'Já tem conta? Entre na plataforma!'}
            </Text>
          </Pressable>

        </View>
      </ImageBackground>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxInput: {
    marginBottom: 15,
    width: "100%",
  },
  label: {
    color: "#fff",
    alignSelf: "flex-start",
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    width: "100%",
    minWidth: 280,
    height: 40,
    backgroundColor: "#1e1e1e",
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "#fff",
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  errorText: {
    color: "red",

  },
  button: {
    width: "40%",
    height: 40,
    backgroundColor: "#22c55e",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  textButton: {
    color: "#f1f1f1",
    fontSize: 16,
    marginTop: 10,
    alignSelf: "center",
  },
  imagemDeFundo: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  formulario: {
    width: "40%",
    paddingTop: 40,
    columnGap: 10
  },
  logo: {
    marginTop: 20,
    marginBottom: 20,
  },
  conteudo: {
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  descricao: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  eyeButton: {
    marginLeft: -40,
    paddingHorizontal: 10,
  },
});
