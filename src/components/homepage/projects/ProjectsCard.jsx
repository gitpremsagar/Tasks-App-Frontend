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
import GreenBorderButton from "@/components/ui/GreenBorderButton";

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

    const confirmDelete = confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmDelete) {
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

  // format date
  let date = new Date(createdAt);
  const formatedCreatedAt = date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  date = new Date(updatedAt);
  const formatedUpdatedAt = date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="border border-green-500 p-5 rounded-lg shadow-lg my-10 flex flex-col justify-evenly">
      <header>
        <h2 className="text-orange-600 mb-2 uppercase cursor-auto">Project</h2>
        <h3 className="text-xl font-bold">{projectName}</h3>
        <p>{projectDescription}</p>
      </header>
      <main className="mt-5">
        <p>Created: {formatedCreatedAt}</p>
        <p>Updated: {formatedUpdatedAt}</p>
        <p>Project ID: {projectId}</p>
      </main>
      <footer className=" flex justify-between items-center my-2">
        <Link href={`/tasks-by-project/${projectId}`}>
          <GreenBorderButton>View Tasks</GreenBorderButton>
        </Link>

        <RedBorderButton
          onClick={() => handleDeleteProject(projectId)}
          className="text-red-600"
        >
          <FaTrash />
        </RedBorderButton>
      </footer>
    </article>
  );
}
