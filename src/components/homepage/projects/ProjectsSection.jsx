"use client";
import { PROJECTS_ENDPOINT } from "@/configs/constants.js";
import { useEffect, useState } from "react";
import axios from "axios";
import Section from "@/components/ui/Section";
import { selectToken } from "@/redux/tokenSlice";
import { useSelector } from "react-redux";

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = useSelector(selectToken);

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

  return (
    <Section className="p-20">
      <h2 className="text-2xl font-bold mb-10">Projects</h2>
      {isLoading ? (
        <p>Loading projects...</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project.projectId} className="mb-5">
              <h3 className="text-xl font-bold">{project.projectName}</h3>
              <p>{project.projectDescription}</p>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
