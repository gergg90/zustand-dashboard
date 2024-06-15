import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { Task, TasksStatus } from "../../interfaces";

interface TaskState {
  dragginTaskId?: string;
  tasks: Record<string, Task>;

  getTaskByStatus: (status: TasksStatus) => Task[];

  setDragginTaskId: (taskId: string) => void;
  removeDragginTaskId: () => void;
}

const storeAPI: StateCreator<TaskState> = (set, get) => ({
  dragginTaskId: undefined,
  tasks: {
    XYZ1: {
      id: "XYZ1",
      title: "title 1",
      status: "in-progress",
    },
    XYZ2: {
      id: "XYZ2",
      title: "title 2",
      status: "open",
    },
    XYZ3: {
      id: "XYZ3",
      title: "title 3",
      status: "open",
    },
    XYZ4: {
      id: "XYZ4",
      title: "title 4",
      status: "open",
    },
  },

  getTaskByStatus: (status: TasksStatus) => {
    const { tasks } = get();
    return Object.values(tasks).filter((task) => task.status === status);
  },

  setDragginTaskId: (taskId: string) => {
    set({ dragginTaskId: taskId });
  },
  removeDragginTaskId: () => {
    set({ dragginTaskId: undefined });
  },
});

export const useTaskStore = create<TaskState>()(devtools(storeAPI));
