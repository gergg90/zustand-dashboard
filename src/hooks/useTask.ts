import { useState } from "react";
import Swal from "sweetalert2";
import { TasksStatus } from "../interfaces";
import { useTaskStore } from "../stores";

interface Option {
  status: TasksStatus;
}

export const useTask = ({ status }: Option) => {
  const isDraggin = useTaskStore((state) => !!state.dragginTaskId);
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
  const addTask = useTaskStore((state) => state.addTask);

  const [onDragOver, setOnDragOver] = useState(false);

  //! handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
  };

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onTaskDrop(status);
    setOnDragOver(false);
  };

  //! newTask
  const handleAddTask = async () => {
    const res = await Swal.fire({
      title: "Nuevo titulo",
      input: "text",
      inputLabel: "Nombre de la tarea",
      inputPlaceholder: "...tarea",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Debe ingresar el nombre de una tarea";
        }
      },
    });

    addTask(res.value, status);
  };

  return {
    isDraggin,
    onTaskDrop,
    addTask,
    onDragOver,
    handleDragLeave,
    handleAddTask,
    handleDragOver,
    handleOnDrop,
  };
};
