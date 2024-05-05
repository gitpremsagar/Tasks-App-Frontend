"use client";
import { TASKS_ENDPOINT } from "@/configs/constants";
import { useEffect, useState } from "react";
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
import SelectElement from "@/components/ui/SelectElement";
import SelectTeamMember from "@/components/homepage/tasks/SelectTeamMember";

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

  const handleTaskDataChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //   log task data
  //   useEffect(() => {
  //     console.log("taskData", taskData);
  //   }, [taskData]);

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
        />
        <InputField
          type="text"
          name="taskDescription"
          label="Task Description"
          value={taskData.taskDescription}
          onChange={handleTaskDataChange}
        />
        <InputField
          type="number"
          name="spendTime"
          label="Spend Time in number of days"
          value={taskData.spendTime}
          onChange={handleTaskDataChange}
        />

        {/* Select Priority */}
        <SelectElement
          label="Priority"
          options={[
            {
              value: "",
              label: "- Select -",
            },
            {
              value: "Low",
              label: "Low",
            },
            {
              value: "Medium",
              label: "Medium",
            },
            {
              value: "High",
              label: "High",
            },
          ]}
          onChange={handleTaskDataChange}
          name={"priority"}
        />

        {/* Select Team Member */}
        <SelectTeamMember onChange={handleTaskDataChange} name={"assignedTo"} />

        {/* Select Status */}
        <SelectElement
          label="Status"
          options={[
            {
              value: "",
              label: "- Select -",
            },
            {
              value: "Pending",
              label: "Pending",
            },
            {
              value: "In Progress",
              label: "In Progress",
            },
            {
              value: "Completed",
              label: "Completed",
            },
          ]}
          onChange={handleTaskDataChange}
          name={"status"}
        />

        <br />
        <Button type="submit" disabled={isLoading}>
          Create Task
        </Button>
      </form>
      <br />
      <Link href={`/tasks-by-project/${params.projectId}`}>
        <RedBorderButton>Go back to Tasks List</RedBorderButton>
      </Link>
    </Section>
  );
};

export default CreateTask;
