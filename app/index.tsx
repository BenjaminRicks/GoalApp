import React from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Goal } from "../models/goalModel";
import ListGroup from "@/components/ListGroup";
import { useGoals } from "@/contexts/GoalContext";

const Index = () => {
  const { goals } = useGoals();

  const router = useRouter();

  const handleSelectGoal = (goal: Goal) => {
    console.log("Pushed");
    router.push({
      pathname: "/goalPage",
      params: { goal: JSON.stringify(goal) },
    });
  };

  const handleRenderGoal = (goal: Goal) => {
    return (
      <View>
        <Text>{goal.title}</Text>
      </View>
    );
  };

  return (
    <View>
      <ListGroup
        items={goals}
        heading="Goals"
        onSelectItem={handleSelectGoal}
        renderItem={handleRenderGoal}
      />
    </View>
  );
};

export default Index;
