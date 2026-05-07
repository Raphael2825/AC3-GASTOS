import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";

import HomeScreen from "./src/screens/HomeScreen";
import AddExpenseScreen from "./src/screens/AddExpenseScreen";

export type Expense = {
  id: string;
  description: string;
  value: number;
};

export type RootStackParamList = {
  Home: undefined;
  AddExpense: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (description: string, value: number) => {
    const newExpense: Expense = {
      id: Math.random().toString(),
      description,
      value,
    };

    setExpenses((prev) => [...prev, newExpense]);
  };

  const removeExpense = (id: string) => {
    setExpenses((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const total = expenses.reduce(
    (acc, item) => acc + item.value,
    0
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen
              {...props}
              expenses={expenses}
              total={total}
              removeExpense={removeExpense}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="AddExpense">
          {(props) => (
            <AddExpenseScreen
              {...props}
              addExpense={addExpense}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}