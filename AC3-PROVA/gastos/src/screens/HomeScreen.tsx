import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";

import { useState } from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import {
  Expense,
  RootStackParamList,
} from "../../App";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Home"
> & {
  expenses: Expense[];
  total: number;
  removeExpense: (id: string) => void;
};

export default function HomeScreen({
  navigation,
  expenses,
  total,
  removeExpense,
}: Props) {
  const [hover, setHover] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.total}>
        Total gasto: R$ {total.toFixed(2)}
      </Text>

      {/* BOTÃO COM HOVER CORRETO */}
      <Pressable
        onPress={() =>
          navigation.navigate("AddExpense")
        }
        onHoverIn={() => setHover(true)}
        onHoverOut={() => setHover(false)}
        style={[
          styles.addButton,
          hover && styles.addButtonHover,
        ]}
      >
        <Text style={styles.buttonText}>
          + Adicionar Gasto
        </Text>
      </Pressable>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Nenhum gasto cadastrado.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.description}>
                {item.description}
              </Text>

              <Text style={styles.value}>
                R$ {item.value.toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() =>
                removeExpense(item.id)
              }
            >
              <Text style={styles.buttonText}>
                Excluir
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  total: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
},

  addButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },

  
  addButtonHover: {
    backgroundColor: "#45a049",
    transform: [{ scale: 1.03 }],
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  description: {
    fontSize: 18,
    fontWeight: "bold",
  },

  value: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },

  deleteButton: {
    backgroundColor: "#E53935",
    padding: 10,
    borderRadius: 8,
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#777",
  },
});