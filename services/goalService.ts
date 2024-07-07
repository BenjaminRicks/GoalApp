// services/goalService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Goal } from "../models/goalModel";

const STORAGE_KEY = 'goals';

const goalService = {
  async createGoal(goal: Goal): Promise<Goal> {
    const goals: Goal[] = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY) || '[]');
    goals.push(goal);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
    return goal;
  },

  async getAllGoals(): Promise<Goal[]> {
    return JSON.parse(await AsyncStorage.getItem(STORAGE_KEY) || '[]');
  },

  async getGoalByID(id: string): Promise<Goal | undefined> {
    const goals: Goal[] = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY) || '[]');
    return goals.find(goal => goal.id === id);
  },

  async updateGoal(updatedGoal: Goal): Promise<Goal> {
    let goals: Goal[] = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY) || '[]');
    goals = goals.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
    return updatedGoal;
  },

  async deleteGoal(id: string): Promise<void> {
    let goals: Goal[] = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY) || '[]');
    goals = goals.filter(goal => goal.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }
};

export default goalService;
