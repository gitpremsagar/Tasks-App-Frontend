import RedBorderButton from "@/components/ui/RedBorderButton";
import BlueBorderButton from "@/components/ui/BlueBorderButton";
import React from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { PROJECTS_ENDPOINT } from "@/configs/constants";
import { selectToken } from "@/redux/tokenSlice";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/userSlice";
import Link from "next/link";

// projectId int(11) AI PK
// projectName varchar(255)
// projectDescription varchar(255)
// createdAt datetime
// updatedAt datetime

export default function ProjectsCard({ project, setProjects }) {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  async function handleViewTasks(projectId) {
    console.log("View Tasks", projectId);
  }

  function handleDeleteProject(projectId) {
    // dont delete project if user is not an admin
    if (user.userType !== "admin") {
      alert("Only admins can delete projects!");
      return;
    }

    // delete project
    axios
      .delete(`${PROJECTS_ENDPOINT}/${projectId}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(() => {
        setProjects((prevProjects) =>
          prevProjects.filter((p) => p.projectId !== projectId)
        );
      })
      .catch((error) => {
        console.error("Error deleting project: ", error);
      });
  }
  const { projectId, projectName, projectDescription, createdAt, updatedAt } =
    project;
  return (
    <div className="border border-gray-300 p-5 rounded-lg shadow-lg my-10">
      <h3 className="text-xl font-bold">{projectName}</h3>
      <p>{projectDescription}</p>
      <div className="mt-5">
        <p>Created: {createdAt}</p>
        <p>Updated: {updatedAt}</p>
        <p>Project ID: {projectId}</p>

        <div className=" flex justify-between items-center my-2">
          <Link href={`/tasks-by-project/${projectId}`}>
            <BlueBorderButton>View Tasks</BlueBorderButton>
          </Link>

          <RedBorderButton
            onClick={() => handleDeleteProject(projectId)}
            className="text-red-600"
          >
            <FaTrash />
          </RedBorderButton>
        </div>
      </div>
    </div>
  );
}
