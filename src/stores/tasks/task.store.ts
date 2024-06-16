import { v4 as uuidv4 } from "uuid";
import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { Task, TasksStatus } from "../../interfaces";

interface TaskState {
  dragginTaskId?: string;
  tasks: Record<string, Task>;

  getTaskByStatus: (status: TasksStatus) => Task[];
  addTask: (title: string, status: TasksStatus) => void;

  setDragginTaskId: (taskId: string) => void;
  removeDragginTaskId: () => void;

  changeTaskStatus: (taskId: string, status: TasksStatus) => void;

  onTaskDrop: (status: TasksStatus) => void;
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
    XYZ5: {
      id: "XYZ5",
      title: "title 5",
      status: "done",
    },
  },

  getTaskByStatus: (status: TasksStatus) => {
    const { tasks } = get();
    return Object.values(tasks).filter((task) => task.status === status);
  },

  addTask: (title: string, status: TasksStatus) => {
    const newTask = {
      id: uuidv4(),
      title,
      status,
    };

    set((state) => ({
      tasks: {
        ...state.tasks,
        [newTask.id]: newTask,
      },
    }));
  },

  setDragginTaskId: (taskId: string) => {
    set({ dragginTaskId: taskId });
  },

  removeDragginTaskId: () => {
    set({ dragginTaskId: undefined });
  },

  changeTaskStatus: (taskId: string, status: TasksStatus) => {
    const task = get().tasks[taskId];
    task.status = status;

    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: task,
      },
    }));
  },

  onTaskDrop: (status: TasksStatus) => {
    const taskid = get().dragginTaskId;
    if (!taskid) return;
    get().changeTaskStatus(taskid, status);
    get().removeDragginTaskId();
  },
});

export const useTaskStore = create<TaskState>()(devtools(storeAPI));
