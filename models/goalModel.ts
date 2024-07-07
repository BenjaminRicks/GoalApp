export interface Goal {
    id: string;
    title: string;
    text: string;
    startDate: Date;
    endDate: Date;
    subGoals: Goal[];
  }
