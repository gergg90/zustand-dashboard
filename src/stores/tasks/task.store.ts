import { v4 as uuidv4 } from "uuid";
import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Task, TasksStatus } from "../../interfaces";

interface TaskState {
  dragginTaskId?: string;
  tasks: Record<string, Task>;

  getTaskByStatus: (status: TasksStatus) => Task[];
  addTask: (title: string, status: TasksStatus) => void;
  totalTask: () => number;

  setDragginTaskId: (taskId: string) => void;
  removeDragginTaskId: () => void;

  changeTaskStatus: (taskId: string, status: TasksStatus) => void;

  onTaskDrop: (status: TasksStatus) => void;
}

const storeAPI: StateCreator<TaskState, [["zustand/immer", never], ...[]]> = (
  set,
  get
) => ({
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

    set((state) => {
      state.tasks[newTask.id] = newTask;
    });

    //? function produce npm i immer
    // set(
    //   produce((state: TaskState) => {
    //     state.tasks[newTask.id] = newTask;
    //   })
    // );

    //? spread operator
    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [newTask.id]: newTask,
    //   },
    // }));
  },

  totalTask: () => {
    return Object.keys(get().tasks).length;
  },

  setDragginTaskId: (taskId: string) => {
    set({ dragginTaskId: taskId });
  },

  removeDragginTaskId: () => {
    set({ dragginTaskId: undefined });
  },

  changeTaskStatus: (taskId: string, status: TasksStatus) => {
    //? modo spreadoperator
    // const task = get().tasks[taskId];
    // task.status = status;

    set((state) => {
      const task = state.tasks[taskId];
      if (task) {
        task.status = status;
      }
    });

    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [taskId]: task,
    //   },
    // }));
  },

  onTaskDrop: (status: TasksStatus) => {
    const taskid = get().dragginTaskId;
    if (!taskid) return;
    get().changeTaskStatus(taskid, status);
    get().removeDragginTaskId();
  },
});

export const useTaskStore = create<TaskState>()(
  devtools(
    persist(immer(storeAPI), {
      name: "task-storage",
    })
  )
);
