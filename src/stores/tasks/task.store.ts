import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { Task } from "../../interfaces";

interface TaskState {
  tasks: Record<string, Task>;
}

const storeAPI: StateCreator<TaskState> = (set) => ({
  tasks: {
    XYZ1: {
      id: "1",
      title: "title 1",
      status: "in-progress",
    },
    XYZ2: {
      id: "2",
      title: "title 2",
      status: "open",
    },
    XYZ3: {
      id: "3",
      title: "title 3",
      status: "open",
    },
    XYZ4: {
      id: "4",
      title: "title 4",
      status: "done",
    },
  },
});

export const useTaskStore = create<TaskState>()(
  persist(storeAPI, {
    name: "tasks-storage",
  })
);
