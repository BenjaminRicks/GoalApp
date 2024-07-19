import React, { useState, useEffect, ChangeEvent } from "react";
import { View, Text, TextInput, Button, Pressable } from "react-native";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { Goal } from "../models/goalModel";
import goalService from "../services/goalService";
import ListGroup from "@/components/ListGroup";
import DateTimePicker from "@react-native-community/datetimepicker";

const Index = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState<Omit<Goal, "id">>({
    title: "",
    text: "",
    startDate: new Date(),
    endDate: new Date(),
    subGoals: [],
  });

  const router = useRouter();

  useEffect(() => {
    goalService.getAllGoals().then(setGoals);
  }, []);

  const addGoal = () => {
    const goal = {
      id: Date.now().toString(),
      ...newGoal,
      subGoals: [],
    };
    goalService.createGoal(goal).then((createdGoal) => {
      setGoals((prevGoals) => [...prevGoals, createdGoal]);
      setNewGoal({
        title: "",
        text: "",
        startDate: new Date(),
        endDate: new Date(),
        subGoals: [],
      });
    });
  };

  const deleteGoal = (id: string) => {
    goalService.deleteGoal(id).then(() => {
      setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
    });
  };

  const handleInputChange = (name: string, value: any) => {
    setNewGoal((prevNewGoal) => ({
      ...prevNewGoal,
      [name]: value,
    }));
  };

  const handleDateChange = (
    event: any,
    selectedDate: Date | undefined,
    name: string
  ) => {
    if (selectedDate) {
      handleInputChange(name, selectedDate);
    }
  };

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
      <Text>Goals</Text>
      <TextInput
        placeholder="Title"
        value={newGoal.title}
        onChangeText={(text) => handleInputChange("title", text)}
      />
      <TextInput
        placeholder="Text"
        value={newGoal.text}
        onChangeText={(text) => handleInputChange("text", text)}
      />
      <DateTimePicker
        value={newGoal.startDate}
        mode="date"
        display="default"
        onChange={(event, date) => handleDateChange(event, date, "startDate")}
      />
      <DateTimePicker
        value={newGoal.endDate}
        mode="date"
        display="default"
        onChange={(event, date) => handleDateChange(event, date, "endDate")}
      />
      <Button title="Add Goal" onPress={addGoal} />
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
