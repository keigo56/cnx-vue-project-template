export interface ScheduleData {
    date: string;
    time: {
      start: string;
      end: string;
      duration: number;
    };
    meta: {
      title: string;
      timeSchedule: string;
      requestorName: string;
      description: string;
    };
  }