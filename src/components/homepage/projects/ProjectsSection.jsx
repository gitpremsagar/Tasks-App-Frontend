"use client";
import { PROJECTS_ENDPOINT } from "@/configs/constants.js";
import { useEffect, useState } from "react";
import axios from "axios";
import Section from "@/components/ui/Section";
import { selectToken } from "@/redux/tokenSlice";
import { useSelector } from "react-redux";
import ProjectsCard from "@/components/homepage/projects/ProjectsCard";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { selectUser } from "@/redux/userSlice";
import { useRouter } from "next/navigation";

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(PROJECTS_ENDPOINT, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        setProjects(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching projects: ", error);
        setIsLoading(false);
      });
  }, []);

  function handleCreateNewProjectClick() {
    // dont create project if user is not an admin
    if (user.userType !== "admin") {
      alert("Only admins can create projects!");
      return;
    }

    // go to create project page
    router.push("/create-project");
  }

  return (
    <Section className="p-20">
      <h2 className="text-2xl font-bold mb-10">Projects</h2>
      {isLoading ? (
        <p>Loading projects...</p>
      ) : (
        <>
          
            <Button className="mx-auto" onClick={handleCreateNewProjectClick}>
              Create New Project
            </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <ProjectsCard
                key={project.projectId}
                project={project}
                setProjects={setProjects}
              />
            ))}
            <br />
          </div>
        </>
      )}
    </Section>
  );
}
