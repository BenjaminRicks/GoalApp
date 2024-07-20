import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Goal } from "@/models/goalModel";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface GoalContextProps {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, "id">) => void;
}

const GoalContext = createContext<GoalContextProps | undefined>(undefined);

export const useGoals = () => {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error("useGoals must be used within a GoalProvider");
  }
  return context;
};

export const GoalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    const loadGoals = async () => {
      try {
        const storedGoals = await AsyncStorage.getItem("goals");
        if (storedGoals) {
          setGoals(JSON.parse(storedGoals));
        }
      } catch (error) {
        console.error("Failed to load goals", error);
      }
    };

    loadGoals();
  }, []);

  useEffect(() => {
    const saveGoals = async () => {
      try {
        await AsyncStorage.setItem("goals", JSON.stringify(goals));
      } catch (error) {
        console.error("Failed to save goals", error);
      }
    };

    saveGoals();
  }, [goals]);

  const addGoal = (newGoal: Omit<Goal, "id">) => {
    const goal = {
      id: Date.now().toString(),
      ...newGoal,
      subGoals: [],
    };
    setGoals((prevGoals) => [...prevGoals, goal]);
  };

  return (
    <GoalContext.Provider value={{ goals, addGoal }}>
      {children}
    </GoalContext.Provider>
  );
};
