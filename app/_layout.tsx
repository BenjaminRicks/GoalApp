import React from "react";
import { Stack } from "expo-router";
import MenuButton from "@/components/MenuButton";
import AddNewGoalScreen from "@/components/AddNewGoalScreen";
import { GoalProvider } from "@/contexts/GoalContext";

export default function RootLayout() {
  return (
    <GoalProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerRight: () => (
              <MenuButton
                icon="+"
                renderMenu={({ closeMenu }) => {
                  console.log("Pressed");
                  return <AddNewGoalScreen closeMenu={closeMenu} />;
                }}
              />
            ),
          }}
        />
      </Stack>
    </GoalProvider>
  );
}
