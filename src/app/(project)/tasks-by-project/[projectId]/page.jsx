"use client";
import { useSelector, useDispatch } from "react-redux";
import { selectToken, setToken } from "@/redux/tokenSlice";
import { setUser, selectUser } from "@/redux/userSlice";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import axios from "axios";
import { TASKS_ENDPOINT } from "@/configs/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RedBorderButton from "@/components/ui/RedBorderButton";
import TasksCard from "@/components/homepage/tasks/TasksCard";

export default function TasksByProjectId({ params }) {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const router = useRouter();

  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      return;
    }
    axios
      .get(`${TASKS_ENDPOINT}/project-id/${params.projectId}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        setTasks(response.data);
        // console.log("Tasks response:", response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks: ", error);
        setIsLoading(false);
      });
  }, [token]);

  function handleCreateNewTaskClick() {
    // dont create task if user is not an admin
    if (user.userType !== "admin") {
      alert("Only admins can create tasks!");
      return;
    }

    // go to create task page
    router.push("/create-task");
  }

  return (
    <div className="max-w-7xl mx-auto p-20 min-h-screen">
      <h2 className="text-2xl font-bold mb-10">Tasks</h2>
      {isLoading ? (
        <p>Loading tasks...</p>
      ) : (
        <>
          <Link href={`/`}>
            <RedBorderButton className="mb-5">Back to Projects</RedBorderButton>
          </Link>
          <br />
          <Link href={`/create-task/${params.projectId}`}>
            <Button>Create New Task</Button>
          </Link>
          <div className="grid grid-cols-3 gap-4 mt-10">
            {tasks.length === 0 && (
              <div className="p-10 col-span-3">
                <p className="text-center">
                  No tasks found. Click Create New Task button to create new
                  tasks.
                </p>
              </div>
            )}
            {tasks.map((task) => (
              <TasksCard key={task.taskId} task={task} setTasks={setTasks} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
