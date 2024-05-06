import React from "react";
import TaskItems from "./TaskItems";
import { FaTrash, FaEdit } from "react-icons/fa";
import RedBorderButton from "@/components/ui/RedBorderButton";
import BlueBorderButton from "@/components/ui/BlueBorderButton";
import { TASKS_ENDPOINT } from "@/configs/constants.js";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectToken } from "@/redux/tokenSlice";
import Link from "next/link";

export default function TasksCard({ task, setTasks, projectId }) {
  const token = useSelector(selectToken);
  const {
    taskName,
    taskDescription,
    spendTime,
    priority,
    assignedTo,
    status,
    projectName,
    createdBy,
    updatedBy,
  } = task;

  function handleDeleteTask(taskId) {
    // console.log("Delete task", taskId);
    const userResponse = confirm("Are you sure you want to delete this task?");
    if (!userResponse) {
      return;
    }

    axios
      .delete(`${TASKS_ENDPOINT}/${taskId}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        console.log("Task deleted successfully", response.data);
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.taskId !== taskId)
        );
      })
      .catch((error) => {
        console.error("Error deleting task", error);
      });
  }

  function handleEditTask(taskId) {
    console.log("Edit task", taskId);
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-5 border border-blue-500">
      <div className="flex justify-between">
        <h3 className="text-violet-700 mb-2 uppercase cursor-auto">Task</h3>
        <div>
          <Link href={`/edit-task/${projectId}/${task.taskId}`}>
            <BlueBorderButton
              className="text-blue-600 mr-2"
              onClick={() => handleEditTask(task.taskId)}
            >
              <FaEdit />
            </BlueBorderButton>
          </Link>
          <RedBorderButton
            className="text-red-600"
            onClick={() => handleDeleteTask(task.taskId)}
          >
            <FaTrash />
          </RedBorderButton>
        </div>
      </div>

      <TaskItems itemName="Project Name" itemValue={projectName} />
      <TaskItems itemName="Task Name" itemValue={taskName} />
      <TaskItems itemName="Task Description" itemValue={taskDescription} />
      <TaskItems itemName="Spend Time" itemValue={spendTime} />
      <TaskItems itemName="Priority" itemValue={priority} />
      <TaskItems itemName="Assigned To" itemValue={assignedTo} />
      <TaskItems itemName="Status" itemValue={status} />
      <TaskItems itemName="Created By" itemValue={createdBy} />
      <TaskItems itemName="Updated By" itemValue={updatedBy} />
    </div>
  );
}
