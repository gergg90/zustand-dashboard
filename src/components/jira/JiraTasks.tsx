import classNames from "classnames";
import React, { useState } from "react";
import {
  IoCheckmarkCircleOutline,
  IoEllipsisHorizontalOutline,
} from "react-icons/io5";
import { Task, TasksStatus } from "../../interfaces";
import { useTaskStore } from "../../stores";
import { SingleTask } from "./SingleTask";

interface Props {
  title: string;
  tasks: Task[];
  value: TasksStatus;
}

export const JiraTasks = ({ title, tasks, value }: Props) => {
  const isDraggin = useTaskStore((state) => !!state.dragginTaskId);
  const changeTaskProgress = useTaskStore((state) => state.changeTaskProgress);
  const dragginTaskId = useTaskStore((state) => state.dragginTaskId);

  const [onDragOver, setOnDragOver] = useState(false);

  console.log(isDraggin);
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
    setOnDragOver(false);
    changeTaskProgress(dragginTaskId!, value);
  };

  return (
    <div
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleOnDrop}
      className={classNames(
        "!text-black relative flex flex-col rounded-[20px] border-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]",
        {
          "border-blue-500 border-dotted": isDraggin,
          "border-green-500 border-dotted": onDragOver,
        }
      )}
    >
      {/* Task Header */}
      <div className="relative flex flex-row justify-between">
        <div className="flex items-center justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
              <IoCheckmarkCircleOutline style={{ fontSize: "50px" }} />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{title}</h4>
        </div>

        <button>
          <IoEllipsisHorizontalOutline />
        </button>
      </div>

      {/* Task Items */}

      <div className="h-full w-full">
        {tasks.map((task) => (
          <SingleTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
