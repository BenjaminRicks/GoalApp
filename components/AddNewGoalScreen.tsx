import { Goal } from "@/models/goalModel";
import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useGoals } from "@/contexts/GoalContext";

interface AddNewGoalScreenProps {
  closeMenu: () => void;
}

const AddNewGoalScreen: React.FC<AddNewGoalScreenProps> = ({ closeMenu }) => {
  const { addGoal } = useGoals();
  const [newGoal, setNewGoal] = useState<Omit<Goal, "id">>({
    title: "",
    text: "",
    startDate: new Date(),
    endDate: new Date(),
    subGoals: [],
  });

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

  const handleAddGoal = () => {
    addGoal(newGoal);
    setNewGoal({
      title: "",
      text: "",
      startDate: new Date(),
      endDate: new Date(),
      subGoals: [],
    });
    closeMenu();
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
      <Button title="Add Goal" onPress={handleAddGoal} />
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default AddNewGoalScreen;
