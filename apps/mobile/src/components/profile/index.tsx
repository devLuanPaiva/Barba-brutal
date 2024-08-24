import { PhoneUtils } from "@barba/core";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import React from "react";
import useUser from "@/src/data/hooks/useUser";

export default function Profile({ navigation }: any) {
  const { user, logout } = useUser();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/avatar.png")}
        style={styles.avatar}
      />
      <Text style={styles.highlight}>Fala, {user?.name}!</Text>
      <Text style={styles.text}>Email: {user?.email.toLowerCase()}</Text>
      <Text style={styles.text}>
        Phone: {PhoneUtils.format(user?.phone!)}
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          logout();       
        }}
      >
        <Text style={styles.buttonText}>Sair</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: "45%",
    height: "45%",
    borderRadius: 9999,
    marginRight: 12,
  },
  highlight: {
    fontSize: 28,
    fontWeight: "600",
    color: "#fff",
    margin: 5,
  },
  text: {
    marginTop: 2,
    fontSize: 18,
    fontWeight: "400",
    color: "#A9A9A9",
  },
  button: {
    margin: 30,
    width: "35%",
    height: 45,
    backgroundColor: "#EF4444",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
