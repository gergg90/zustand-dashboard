export interface Task {
  id: string;
  title: string;
  status: TasksStatus;
}

export type TasksStatus = "open" | "in-progress" | "done";
