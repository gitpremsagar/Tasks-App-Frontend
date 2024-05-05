"use client";
import { TASKS_ENDPOINT } from "@/configs/constants";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Section from "@/components/ui/Section";
import { selectToken } from "@/redux/tokenSlice";
import { useSelector } from "react-redux";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import Link from "next/link";
import RedBorderButton from "@/components/ui/RedBorderButton";
import { PROJECTS_ENDPOINT } from "@/configs/constants";
import { useRouter } from "next/navigation";

// tasks table detail
// Table: tasks
// Columns:
// projectName varchar(255)
// projectId int(11)
// taskName varchar(255)
// taskDescription varchar(255)
// spendTime varchar(255)
// priority varchar(255)
// assignedTo varchar(255)
// status varchar(255)
// createdBy varchar(255)
// updatedBy varchar(255)
// createdAt datetime
// updatedAt datetime

const CreateTask = ({ params }) => {
  const router = useRouter();
  const [projectData, setProjectData] = useState([]);
  const [isLoadingProjectData, setIsLoadingProjectData] = useState(true);

  const [taskData, setTaskData] = useState({
    projectId: params.projectId,
    taskName: "",
    taskDescription: "",
    spendTime: "",
    priority: "",
    assignedTo: "",
    status: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [createdSuccessfully, setCreatedSuccessfully] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector(selectToken);

  const taskNameRef = useRef();
  const taskDescriptionRef = useRef();
  const spendTimeRef = useRef();
  const priorityRef = useRef();
  const assignedToRef = useRef();
  const statusRef = useRef();

  const handleTaskDataChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
        console.log("Project details: ", response.data);
        setIsLoadingProjectData(false);
        setProjectData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching project details: ", error);
        setIsLoadingProjectData(false);
      });
  }, [token]);

  // create task
  const handleSubmit = (e) => {
    e.preventDefault();

    // validate task data
    if (
      !taskData.taskName ||
      !taskData.taskDescription ||
      !taskData.spendTime ||
      !taskData.priority ||
      !taskData.assignedTo ||
      !taskData.status
    ) {
      setError("All fields are required");
      alert("Please fill all fields.");
      return;
    }

    setIsLoading(true);
    axios
      .post(`${TASKS_ENDPOINT}`, taskData, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        console.log("Task created successfully", response.data);
        setCreatedSuccessfully(true);
        setIsLoading(false);
        router.push(`/tasks-by-project/${params.projectId}`);
      })
      .catch((error) => {
        console.error("Error creating task: ", error);
        setError("Error creating task");
        setIsLoading(false);
      });
  };

  return (
    <Section>
      <h2 className="text-2xl font-bold mb-10">Create Task</h2>
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
      {createdSuccessfully && <p>Task created successfully</p>}
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          name="taskName"
          label="Task Name"
          value={taskData.taskName}
          onChange={handleTaskDataChange}
          inputRef={taskNameRef}
        />
        <InputField
          type="text"
          name="taskDescription"
          label="Task Description"
          value={taskData.taskDescription}
          onChange={handleTaskDataChange}
          inputRef={taskDescriptionRef}
        />
        <InputField
          type="number"
          name="spendTime"
          label="Spend Time in number of days"
          value={taskData.spendTime}
          onChange={handleTaskDataChange}
          inputRef={spendTimeRef}
        />
        {/* TODO: Change to select */}
        <InputField
          type="text"
          name="priority"
          label="Priority"
          value={taskData.priority}
          onChange={handleTaskDataChange}
          inputRef={priorityRef}
        />
        {/* TODO: fetch user name and show in dropdown */}
        <InputField
          type="text"
          name="assignedTo"
          label="Assigne To"
          value={taskData.assignedTo}
          onChange={handleTaskDataChange}
          inputRef={assignedToRef}
        />
        {/* TODO: Change to select */}
        <InputField
          type="text"
          name="status"
          label="Status"
          value={taskData.status}
          onChange={handleTaskDataChange}
          inputRef={statusRef}
        />

        <Button type="submit" disabled={isLoading}>
          Create Task
        </Button>
      </form>
      <br />
      <Link href={`/tasks-by-project/${params.projectId}`}>
        <RedBorderButton>Go back Tasks List</RedBorderButton>
      </Link>
    </Section>
  );
};

export default CreateTask;
