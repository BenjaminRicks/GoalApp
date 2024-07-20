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
    <View>
      <ListGroup
        items={goalData.subGoals}
        heading={goalData.title}
        onSelectItem={handleSelectGoal}
        renderItem={handleRenderGoal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    marginBottom: 10,
    color: "grey",
  },
  subGoals: {
    marginTop: 20,
  },
  subGoalsTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subGoalItem: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
  },
  subGoalTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subGoalText: {
    fontSize: 14,
  },
});

export default GoalPage;
