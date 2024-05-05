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
import { PROJECTS_ENDPOINT } from "@/configs/constants";

export default function TasksByProjectId({ params }) {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const router = useRouter();

  const [projectData, setProjectData] = useState([]);
  const [isLoadingProjectData, setIsLoadingProjectData] = useState(true);

  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // fetch tasks by project id
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

  //get project details from api
  useEffect(() => {
    if (!token) {
      return;
    }
    axios
      .get(`${PROJECTS_ENDPOINT}/${params.projectId}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        // console.log("Project details: ", response.data);
        setIsLoadingProjectData(false);
        setProjectData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching project details: ", error);
        setIsLoadingProjectData(false);
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
      {isLoadingProjectData ? (
        <p>Loading Project Details...</p>
      ) : (
        <>
          <h3 className="text-xl font-semibold mb-5">
            <span className="font-bold text-blue-500"> Project Name: </span>
            {projectData.projectName}
          </h3>
          <h4 className="text-xl font-semibold mb-5">
            <span className="font-bold text-blue-500">
              Project Description:{" "}
            </span>
            {projectData.projectDescription}
          </h4>
        </>
      )}

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
          <br />
          <h2 className="text-2xl font-bold mt-10 uppercase text-violet-600">
            Tasks
          </h2>
          <hr />
          <div className="grid grid-cols-3 gap-4 mt-10">
            {tasks.length === 0 && (
              <div className="p-10 col-span-3">
                <p className="text-center">
                  No tasks found for this project. Click "Create New Task"
                  button to create new tasks.
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
