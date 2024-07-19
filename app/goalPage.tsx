import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Goal } from "../models/goalModel";
import ListGroup from "@/components/ListGroup";

const GoalPage = () => {
  const { goal } = useLocalSearchParams();
  const goalData: Goal = JSON.parse(goal as string);

  const router = useRouter();

  const handleSelectGoal = (goal: Goal) => {
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
    <ListGroup
      items={goalData.subGoals}
      heading={goalData.title}
      onSelectItem={handleSelectGoal}
      renderItem={handleRenderGoal}
    />
  );
};

export default GoalPage;
