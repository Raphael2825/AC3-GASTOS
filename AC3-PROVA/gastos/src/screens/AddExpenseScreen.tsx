import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "AddExpense"
> & {
  addExpense: (description: string, value: number) => void;
};

export default function AddExpenseScreen({
  navigation,
  addExpense,
}: Props) {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    const numericValue = Number(value);

    const onlyNumbersInDescription = /^\d+$/.test(description.trim());

    if (description.trim() === "") {
      setError("A descrição é obrigatória.");
      return;
    }

    if (onlyNumbersInDescription) {
      setError("A descrição não pode conter apenas números.");
      return;
    }

    if (value.trim() === "" || isNaN(numericValue)) {
      setError("Digite um valor válido.");
      return;
    }

    if (numericValue <= 0) {
      setError("O valor deve ser maior que zero.");
      return;
    }

    addExpense(description, numericValue);

    setDescription("");
    setValue("");
    setError("");

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Mercado"
        value={description}
        onChangeText={(text) => {
          setDescription(text);
          setError("");
        }}
      />

      <Text style={styles.label}>Valor</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: 50"
        keyboardType="numeric"
        value={value}
        onChangeText={(text) => {
          setValue(text);
          setError("");
        }}
      />

      {error !== "" && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  label: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },

  error: {
    color: "red",
    marginBottom: 15,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});